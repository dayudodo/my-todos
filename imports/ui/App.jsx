//注意大小写，使用snippet的时候后面变成了React, 于是出错了，但是meteor也没有报错。
//是的，但是chrome报错了，如此，运用已经有的工具，meteor就比rails要方便了。
import React,{Component} from 'react';

//这又要载入一个任务UI
import Task from './Task.jsx';

export default class App extends Component{
//好理解，因为
	getTasks(){
		return [
			{_id:1,text:"task1"},
			{_id:2,text:"task2"},
			{_id:3,text:"task3"},
		];
	}
//标签Task其实是来自于Task.jsx中，另外，剩下的这个task={task}是个啥意思？
	renderTasks(){
			return this.getTasks().map((task)=>(
				<Task key={task._id} task={task}/>
			))
	}
	render(){
		return(
			<div class="container">
				<header>
					<h1>Todo列表</h1>
				</header>
				<ul>
					{this.renderTasks()}
				</ul>
			</div>
			)
	}
}
