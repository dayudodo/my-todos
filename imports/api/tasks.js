//两句话解决问题，从mongo里面读取collection: tasks
import { Mongo } from 'meteor/mongo';
 
export const Tasks = new Mongo.Collection('tasks');