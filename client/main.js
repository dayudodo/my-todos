import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import App from '../imports/ui/App.jsx';
 
//启动之后就开始render,此方法来自于react-dom
Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});