/**
 * Created by eatong on 17-11-10.
 */
import React, {Component} from 'react'
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ajax from '../util/ajaxUtil';

export default class RichEditor extends Component {
  state = {mounted: false, editorState: EditorState.createEmpty(),};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({mounted: true});
    const contentBlock = htmlToDraft(this.props.value || '<div></div>');
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({editorState});
    }
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
    this.props.onChange && this.props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  async onUploadImage(file) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      ajax({
        url: '/api/image/upload',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(({success, data}) => {
        resolve({data: {link: `/static/upload/img/${data}`}});
      });
    });
  }

  render() {
    const toolbar = {
      image: {
        urlEnabled: true,
        uploadEnabled: true,
        alignmentEnabled: true,
        uploadCallback: this.onUploadImage.bind(this),
        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
        alt: {present: false, mandatory: false},
        defaultSize: {
          height: 'auto',
          width: 'auto',
        },
      }
    };
    return (
      <div>
        {this.state.mounted && (
          <Editor toolbar={toolbar}
                  editorState={this.state.editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange.bind(this)}
          />)}
      </div>
    )
  }
}
