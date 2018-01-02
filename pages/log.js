/**
 * Created by eatong on 17-12-12.
 */
import React, {Component} from 'react';
import {Page, Footer,Title} from '~components';
import Link from 'next/link';

class Log extends Component {

  render() {
    const {} = this.props;
    return (
      <div className="hero">
        <div className="hero-head">
            <Title>网站日志</Title>
          <div className="container">
            <nav className="breadcrumb">
              <ul className="column">
                <li><Link href="/"><a>首页</a></Link></li>
                <li className="is-active"><a aria-current="page">网站日志</a></li>
              </ul>
            </nav>

          </div>
        </div>
        <div className="hero-body">
          <div className="container">
            <div className="timeline">
              <div className="timeline-header">
                <span className="tag is-medium ">current</span>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker"/>
                <div className="timeline-content">
                  <p className="heading">2017-11-18</p>
                  <p>粗糙版网站正式上线，利用 <code>react-draft-wysiwyg</code>做可视化编辑器，基本博客搭建完成。</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"/>
                <div className="timeline-content">
                  <p className="heading">2017-12-08</p>
                  <p>添加访问日志记录，掌握访问。</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"/>
                <div className="timeline-content">
                  <p className="heading">2017-12-12</p>
                  <p>增加 <code>markdown</code> 编辑器，程序员写文档神器！</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"/>
                <div className="timeline-content">
                  <p className="heading">2017-12-27</p>
                  <p>文档增加发布节点，未确定博客完成之前，不予发布到首页。</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"/>
                <div className="timeline-content">
                  <p className="heading">2017-12-30</p>
                  <p>根据SEO规则优化页面路由。</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"/>
                <div className="timeline-content">
                  <p className="heading">2018-01-02</p>
                  <p>发布博客的时候自动更新sitemap。</p>
                </div>
              </div>

              <div className="timeline-header">
                <span className="tag is-medium is-primary">Next</span>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker"/>
                <div className="timeline-content">
                  <p>增加自动分词 ，写完日志后根据日志的词出现频次自动分析关键词。</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"/>
                <div className="timeline-content">
                  <p>增加博客系列，用以将文档归类，然后根据分类展示文章。</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"/>
                <div className="timeline-content">
                  <p>优化首页布局，调整首页展示方式。</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"/>
                <div className="timeline-content">
                  <p>增加评论系统，收集文章评论。</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"/>
                <div className="timeline-content">
                  <p>优化代码块展示，目前的展示太low</p>
                </div>
              </div>


            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

Log.propTypes = {};
export default Page(Log);
