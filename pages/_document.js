/**
 * Created by eatong on 17-11-24.
 */
import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';
import globalStyle from '../styles/global.sass'
import wysiwyg from 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import mdStyle from '../styles/md-editor.scss';


export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
      {process.env.NODE_ENV === 'production'
        ? (
          <Head>
            <link
              rel="stylesheet"
              type="text/css"
              href={`/app.css?${this.props.__NEXT_DATA__.buildStats['app.js'].hash}`}
            />
            <link rel="shortcut icon" href="/static/favicon.ico"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            <meta name="description" content="周夷东个人站 personal website for eaTong"/>
            <meta name="renderer" content="webkit|ie-stand|ie-comp"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
          </Head>
        ) : (
          <Head>
            <link rel="shortcut icon" href="/static/favicon.ico"/>
            <style global dangerouslySetInnerHTML={{__html: globalStyle}}/>
            <style global dangerouslySetInnerHTML={{__html: wysiwyg}}/>
            <style global dangerouslySetInnerHTML={{__html: mdStyle}}/>
          </Head>
        )}
      <Head>

      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
      </html>
    );
  }
}
