/**
 * Created by eatong on 17-12-12.
 */
import React from 'react';
import Link from 'next/link';


const Footer = props => {
  return (
    <footer className="footer">
      <div className="columns">
        <div className="column is-one-third">
          <div>关于我</div>
          <div><Link href='/about'><a>关于</a></Link></div>
          <div><Link href='/log'><a>网站日志</a></Link></div>
          <div><Link href='/demo'><a>demo演示页</a></Link></div>
          <div>
            <a href='http://www.yunzhizhuang.com'>当前工作</a>
          </div>
        </div>
        <div className="column is-one-third">
          <div>个人项目</div>
          <div><a href="https://github.com/eaTong/electron-mobx-member">electron-mobx-member</a></div>
          <div><a href="https://github.com/eaTong/electron-mobx">electron-mobx</a></div>
          <div><a href="https://github.com/eaTong/document">document</a></div>
          <div><a href="https://github.com/eaTong/next-mobx-starter">next-mobx-starter</a></div>
        </div>
        <div className="column is-one-third">
          <div>联系</div>
          <div><a href='mailto:eatongchou@gmail.com'>eatongchou@gmail.com</a></div>
        </div>

      </div>
      <div className="columns">
        <div className="column has-text-centered">
          <span>eaTong个人站</span>
          <a href="http://www.miitbeian.gov.cn">滇ICP备 17010764</a>
        </div>
      </div>
    </footer>
  )
};
Footer.propsType = {};

export default Footer;
