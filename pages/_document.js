/**
 * Created by eatong on 17-11-24.
 */
import React from 'react';
import {Notice} from '../components'
import Document, {Head, Main, NextScript} from 'next/document';
import globalStyle from '../styles/global.sass'
import wysiwyg from 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import mdStyle from '../styles/md-editor.scss';


export default class MyDocument extends Document {
  render() {
    return (
      <html lang="zh-cn">
      {process.env.NODE_ENV === 'production'
        ? (
          <Head>
            <meta name="google-site-verification" content="z4Kn_T2poQSwFQ-i5wVMX_SHKUtfO72wwALHTe-3R6s"/>
            <link
              rel="stylesheet"
              type="text/css"
              href={`/app.css?${this.props.__NEXT_DATA__.buildStats['app.js'].hash}`}
            />
            <link rel="shortcut icon" href="/static/favicon.ico"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            <meta name="description" content="eaTong个人站; personal website for eaTong"/>
            <meta name="renderer" content="webkit|ie-stand|ie-comp"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
            <meta name="sogou_site_verification" content="oxL8uSjZnC"/>
            <meta name="360-site-verification" content="91411126c4c707dd73e4bb4543c3d6c0"/>

            <script src="//msite.baidu.com/sdk/c.js?appid=1586633791440102"></script>
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
