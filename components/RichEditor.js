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
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      ajax({
        url: '/api/image/upload',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(({success, data}) => {
        console.log(success, data);
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
        {this.state.mounted && (<Editor toolbar={toolbar}/>)}
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
      </div>
    )
  }
}
