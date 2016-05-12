//原来在imports里面的文件都不会被载入，tutorials里面有说明么？
import { Tasks } from '../imports/api/tasks.js';
  
if (Tasks.find().count()=== 0) {
	console.log("tasks is zero");
	Tasks.insert({"text":"homework", "createdAt":new Date(),"username":"ange","private":false} );
	Tasks.insert({"text":"cooking", "createdAt":new Date(),"username":"ange","private":false} );
	Tasks.insert({"text":"cleaning", "createdAt":new Date(),"username":"ange","private":false} );
	Tasks.insert({"text":"talk to your wife", "createdAt":new Date(),"username":"ange","private":false} );

};