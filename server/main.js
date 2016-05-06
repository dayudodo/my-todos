import { Meteor } from 'meteor/meteor';
//原来服务器要载入一下，才能提供给客户端使用，事实上里面的程序是与客户端共享的，所以才在api目录中！！
import '../imports/api/tasks.js';

Meteor.startup(() => {
  // code to run on server at startup
});
