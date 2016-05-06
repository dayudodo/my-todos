import React from 'react';
import { Meteor } from 'meteor/meteor';
//加入render是把React里面的render给覆盖了么？
import { render } from 'react-dom';
// import {React} from 'react';
 
import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.jsx';
 
//启动之后就开始render,此方法来自于react-dom
Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});