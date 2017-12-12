/**
 * Created by eatong on 17-12-12.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

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

  render() {
    return (
      <div className={`mde-container ${this.props.containerClass || ""}`}>
        <textarea onChange={this.onChangeText.bind(this)}
                  value={this.state.value}
                  className={`mde-textarea ${this.props.editorClass || ""}`}/>
        <ReactMarkdown source={this.state.value} className={`mde-viewer ${this.props.viewerClass || ""}`}/>
      </div>
    );
  }
}

MdEditor.propTypes = {
  containerClass: PropTypes.string,
  viewerClass: PropTypes.string,
  editorClass: PropTypes.string,
};
export default MdEditor;
