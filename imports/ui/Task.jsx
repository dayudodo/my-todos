import React,{Component, PropTypes} from 'react';

//this.props?看来是继承自PropTypes了，还不太明白干什么的。
export default class Task extends Component{
	render() {
		return(
		<li>{this.props.task.text}</li>
		);
	}
}

//propTypes干什么用？
Task.propTypes={
	task: PropTypes.object.isRequired,
}

