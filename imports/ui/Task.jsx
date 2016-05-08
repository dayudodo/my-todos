import React,{Component, PropTypes} from 'react';
import { Tasks } from '../api/tasks.js'; //这个文件也需要mongo读取了？
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames'; //批号类名，好东西。

//this.props?看来是继承自PropTypes了，还不太明白干什么的。
//传递过来的参数其实就是task, 里面包括了text, _id, 尽情使用。
export default class Task extends Component{
	//这儿吧感觉行为与文档分离真是方便，文档没问题，只需要修改你的行为即可！
	toggleChecked(){
		// Tasks.update(this.props.task._id,{
		// 	$set:{checked: !this.props.task.checked},
		// });
		Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
	}
	deleteThisTask(){
		//删除了数据，界面就会自动变化了，精力集中于数据！
		// Tasks.remove(this.props.task._id);
		Meteor.call('tasks.remove', this.props.task._id);
	}
	togglePrivate(){
		Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
	}
	render() {
		//界面外观，因为数据是最新的，所以不用担心其它问题。
		const taskClassName = classnames({
			checked: this.props.task.checked,
			private: this.props.task.private,
		})
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
				{ this.props.showPrivateButton ? (
					<button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
					 { this.props.task.private ? 'Private' : 'Public'}
					</button>
					) : ''
				}
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

