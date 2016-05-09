//注意大小写，使用snippet的时候后面变成了React, 于是出错了，但是meteor也没有报错。
//是的，但是chrome报错了，如此，运用已经有的工具，meteor就比rails要方便了。
//原来，组件在每个文件里面都需要import, 比如PropTypes在Taks.jsx中已经载入一次，在这儿还是要载入
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

//这个，没有载入也不报错，Tasks根本就是个空么, 和Task.jsx里面一样，也只是为了
//载入Tasks这个实例类，其它的并没有使用。
import { Tasks } from  '../api/tasks.js';
//这又要载入一个任务UI
// import Task from './Task.jsx';
//原来导入的时候还能改名字，在jsx里面叫Task, 出来了就可以用新名称了，可以不用一致
import Task from './Task.jsx';
import AccountsWrapper from './AccountsWrapper.jsx';


// Meteor.subscribe('tasks');
// export default class App extends Component{
	//上面的export default看来是提供给其它类使用了
	//如此这儿的类只供这个文件内使用？
class App extends Component{
	constructor(props){
		super(props);
		this.state={
			hideCompleted: false,
		};
	}
	handleSubmit(event){
		event.preventDefault();
		//原来这个Refs还不能乱起名称，得用复数，而在render中使用单数，这坑，还好我是自己打的。
		//相比blaze, 这种办法可也真是够复杂，不过facebook弄出来的玩意儿，还是有道理吧
		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
		//以下的办法只适用于有insecure的时候，一切都是安全的！
		// Tasks.insert({
		// 	text,
		// 	createdAt: new Date(),
		// 	owner: Meteor.userId(),
		// 	username: Meteor.user().username,
		// });
		Meteor.call('tasks.insert', text);

		ReactDOM.findDOMNode(this.refs.textInput).value='';
	}
	toggleHideCompleted(){
		this.setState({
			hideCompleted: !this.state.hideCompleted,
		})
	}

//标签Task其实是来自于Task.jsx中(这是自定义标签喽喽)
//剩下的这个task={item}是把iterator中的参数传递给Newone标签，生成新的标签
// <Newone key={item._id} task={item}/>中的key是为react服务的，是唯一的
	renderTasks(){
			// return this.getTasks().map((item)=>(
			// 上面的getTasks其实已经没用了，从props中获取。
			let filteredTasks=this.props.tasks;
			if (this.state.hideCompleted) {
				filteredTasks= filteredTasks.filter(task=>!task.checked);
				//可以自己定义，后面应该是个方法体，只是参数是task? 果然一句话写法方便多了！
				// 这也是学习了Meta programming之后才有的启发！因为太像labmda了，包括C#也是类似的写法
				// filteredTasks= filteredTasks.filter(task=>/ok/.test(task.text));
			};
			return filteredTasks.map((item)=>{
				const currentUserId= this.props.currentUser && this.props.currentUser._id;
				const showPrivateButton= item.owner === currentUserId;
				return(
					<Task
						key={item._id}
						task={item}
						showPrivateButton={showPrivateButton}
					/>
				);
			});
	}
	render(){
		return(
			<div class="container">
				<header>
					<h1>Todo列表 ({this.props.incompleteCount})</h1>
					<label className="hide-completed">
						过滤已经完成的
						<input 
							type="checkbox"
							readOnly
							checked={this.state.hideCompleted}
							onClick={this.toggleHideCompleted.bind(this)}
						/>
					</label>
					<AccountsWrapper />

					<form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
					  <input
					    type="text"
					    ref="textInput"
					    placeholder="键入增加新的任务"
					  />
					</form>
	
				</header>
				<ul>
					{this.renderTasks()}
				</ul>
			</div>
	);
  }
}

App.propTypes = {
  tasks: 			PropTypes.array.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
  incompleteCount: 	PropTypes.number.isRequired,
  currentUser: 		PropTypes.object,
};
 
 //需要在container里面才能加载数据？并且这玩意儿还会引起react数据变化！
 //这样todos的总数就会自动在界面中更新了，因为数据变化了！你界面里面要展现的就是这个变化的数据，所以这比jQuery
 //手动去改变值要方便的多！
export default createContainer(() => {
	//还不太明白为啥要在这儿订阅？试了下，放在最前面也是可行的，代码没有问题。
	Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({},{sort:{createdAt: -1} }).fetch(),
    incompleteCount: Tasks.find({checked:{$ne:true} }).count(),
    currentUser: Meteor.user(),
  };
}, App);
//这样的话就能够使用this.props.tasks了！
//一开始没有数据，是因为在Server程序中没有运行mongo程序