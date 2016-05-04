//注意大小写，使用snippet的时候后面变成了React, 于是出错了，但是meteor也没有报错。
//是的，但是chrome报错了，如此，运用已经有的工具，meteor就比rails要方便了。
import React,{Component} from 'React';

//这又要载入一个任务UI
//import Task from './Task.jsx';

export default class App extends Component{
	render(){
		return(
			<div class="container">
				<header>
					<h1>Todo列表</h1>
				</header>
				<ul>
					{}
				</ul>
				<h1>相信我，没错的。</h1>
			</div>
			)
	}
}
