/**
 * Created by eatong on 17-11-24.
 */
import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';
import globalStyle from '../styles/global.sass'
import wysiwyg from 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


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
          </Head>
        ) : (
          <Head>
            <style global dangerouslySetInnerHTML={{__html: globalStyle}}/>
            <style global dangerouslySetInnerHTML={{__html: wysiwyg}}/>
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