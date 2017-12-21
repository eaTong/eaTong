/**
 * Created by eatong on 17-12-12.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import ajax from "../util/ajaxUtil";

const pic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAQAAADSfl42AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfhDBQMBw6qpA3qAAABhUlEQVQoz43SvWuTURTH8c/TJAhqWxGhDoKURKTO/gFCXeqkk7QFi1jjUB1EcPNlcnXwT3BycBE3oSC4Ozi1NoFIFqkmxLQhr891eNKQ2DT2XLhw7j1fzvmdcyKf5MSOa8F+2ryLSjrHAqZkNdJiJXmliaGxjozItE2pNNqKChORU675omZaLDUFoonAnE0fFV0Qkur+bwuuYMaNRPEoMj7bjq/44bM0kmuohauuevwPUrYqp+y72eRh25Zc//OmPW3PjyxxVkV9GLmuoqUqtj5U4hlvrB1GLmHRT8ETS6qCu/2g094KmpZHkW1zluwKfRW31LU8wkkfBGV/NOSHkW82/Ba8HBSzomvPU+8EBees6am748QB0tIRvB4Rel9PEBTNgA2xmuUE2RLEXh2azz0Noa8hwgNtdb0kS9eLsS1d11SzMvDzWkKCFFw+Yg4PBVW3h/zmQccWpGXGHJ4JKhZlZKScVVGP7Mja1R2bJbIvi65fAiLnNSLvzU/c4x6iwfr2NP4C9K6R6i3N4XAAAAAASUVORK5CYII=';

class MdEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  componentWillMount() {
    this.state.value = this.props.value;
  }

  onChangeText(event) {
    this.setState({value: event.target.value});
    this.props.onChange && this.props.onChange(event.target.value);
  }

  pickImage() {
    pickImage((img) => {
      this.setState({value: `${this.state.value} ![img](/static/upload/img/${img})`});

    })
  }

  render() {
    return (
      <div className={`mde-container ${this.props.containerClass || ""}`}>
        <div className="toolbar">
          <div className="tools">
            <img src={pic} alt="" onClick={this.pickImage.bind(this)}/>
          </div>
          <div className="count">{`字数统计：${(this.state.value || '').length}`}</div>
        </div>
        <textarea onChange={this.onChangeText.bind(this)}
                  value={this.state.value}
                  className={`mde-textarea ${this.props.editorClass || ""}`}/>
        <ReactMarkdown source={this.state.value} className={`mde-viewer ${this.props.viewerClass || ""}`}/>
      </div>
    );
  }
}

async function pickImage(callback) {
  let uploader = document.getElementById('md-uploader');
  if (uploader) {
    uploader.click();
  } else {
    uploader = document.createElement('input');
    uploader.type = 'file';
    uploader.id = 'md-uploader';
    uploader.style.display = 'none';
    document.body.appendChild(uploader);
    uploader.click();
  }
  uploader.onchange = async function () {
    const formData = new FormData();
    formData.append('file', uploader.files[0]);
    const {success, data} = await ajax({
      url: '/api/image/upload',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'}
    });
    callback && callback(data);

  }
  /*;*/
}

MdEditor.propTypes = {
  containerClass: PropTypes.string,
  viewerClass: PropTypes.string,
  editorClass: PropTypes.string,
};
export default MdEditor;
