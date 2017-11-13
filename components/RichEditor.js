/**
 * Created by eatong on 17-11-10.
 */
import React, {Component} from 'react'
import {Editor} from 'react-draft-wysiwyg';
// import axios from 'axios';
import ajax from '../util/ajaxUtil';
import stylesheet from 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichEditor extends Component {
  state = {mounted: false};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({mounted: true});
  }

  async onUploadImage(file) {
    console.log(123, file);
    const formData = new FormData();
    formData.append('file', file);
    return await ajax({url: '/api/image/upload', data: formData, headers: {'Content-Type': 'multipart/form-data'}});
    /*return new Promise(
      (resolve, reject) => {
        const result = ajax({api: '/api/image/upload', data: {file: file}});
        console.log(result);

      }
    );*/
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
        {this.state.mounted && (<Editor toolbar={toolbar}/>)}
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
      </div>
    )
  }
}
