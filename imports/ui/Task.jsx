import React,{Component, PropTypes} from 'react';
import { Tasks } from '../api/tasks.js'; //这个文件也需要mongo读取了？

//this.props?看来是继承自PropTypes了，还不太明白干什么的。
//传递过来的参数其实就是task, 里面包括了text, _id, 尽情使用。
export default class Task extends Component{
	toggleChecked(){
		Tasks.update(this.props.task._id,{
			//database has not the checked field? no, have! find carefully.
			$set:{checked: !this.props.task.checked},
		});
	}
	deleteThisTask(){
		Tasks.remove(this.props.task._id);
	}
	render() {
		//界面外观，因为数据是最新的，所以不用担心其它问题。
		const taskClassName = this.props.task.checked? 'checked:' : '';
		return(
			<li className={taskClassName}>
				<button className="delete" onClick={this.deleteThisTask.bind(this)}>
					&times;
				</button>

				<input
					type="checkbox"
					readOnly
					checked={this.props.task.checked}
					onClick={this.toggleChecked.bind(this)}
				/>
		        <span className="text">
		          <strong>{this.props.task.username}</strong>: {this.props.task.text}
		        </span>
			</li>
		);
	}
}

//propTypes干什么用？
Task.propTypes={
	task: PropTypes.object.isRequired, //means it can't be number or something
}

