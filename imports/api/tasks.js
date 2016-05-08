//两句话解决问题，从mongo里面读取collection: tasks
import { Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
//提供给server, client共同使用！这种办法就是易非法则么。
export const Tasks = new Mongo.Collection('tasks');

//因为代码为被client引用，所以需要加上判断，这些共用代码就会有这些问题。
if (Meteor.isServer) {
	Meteor.publish('tasks', ()=>{
		return Tasks.find({
			$or: [
				{private: {$ne: true}},
				{owner: this.userId},
			]
		});
	})
};

Meteor.methods({
	'tasks.insert'(text){
		check(text, String);

		if (! this.userId) {
			throw new Meteor.Error('not authorized');
		}

		Tasks.insert({
			text,
			createdAt: new Date(),
			owner: this.userId,
			username: Meteor.users.findOne(this.userId).username,
		});
	},
	'tasks.remove'(taskId){
		const task = Tasks.findOne(taskId);
		if (task.private && task.owner !== this.userId) {
		  // If the task is private, make sure only the owner can delete it
		  throw new Meteor.Error('not-authorized');
		}
	},
	'tasks.setChecked'(taskId,setChecked){
		const task = Tasks.findOne(taskId);
		if (task.private && task.owner !== this.userId) {
		  // If the task is private, make sure only the owner can check it off
		  throw new Meteor.Error('not-authorized');
		}
	},
	'tasks.setPrivate'(taskId, setToPrivate){
		check(taskId, String);
		check(setToPrivate, Boolean);

		const task = Tasks.findOne(taskId);
		if (task.owner!== this.userId) {
			throw new Meteor.Error('not authorized');
		};
		Tasks.update(taskId, {$set:{private: setToPrivate} });
	},


});