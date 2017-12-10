import Test1 from '../notes/test1/Test1';
import WwjXx from '../notes/test1/xx/WwjXx';
import Test2 from '../notes/test2/Test2';
import Test2_1 from '../notes/test2/test2_1/Test2_1';
import Test6_1 from '../notes/test2/test2_1/test6_1/Test6_1';
import Test3 from '../notes/test3/Test3';
import Test3_1 from '../notes/test3/test3_1/Test3_1';
export const myRoutes = [{
name:"test1",
path:"/test1",
component:Test1,
level:0,
exact:true,
haveChildern:true,
childern:[{
name:"wwjlovexx",
path:"/test1/xx",
component:WwjXx,
level:1,
exact:true,
haveChildern:false,
childern:[]
},
]
},{
name:"test2",
path:"/test2",
component:Test2,
level:0,
exact:true,
haveChildern:true,
childern:[{
name:"test2_1",
path:"/test2/test2_1",
component:Test2_1,
level:1,
exact:true,
haveChildern:true,
childern:[{
name:"test6_1",
path:"/test2/test2_1/test6_1",
component:Test6_1,
level:2,
exact:true,
haveChildern:false,
childern:[]
},
]
},
]
},{
name:"test3",
path:"/test3",
component:Test3,
level:0,
exact:true,
haveChildern:true,
childern:[{
name:"test3_1",
path:"/test3/test3_1",
component:Test3_1,
level:1,
exact:true,
haveChildern:false,
childern:[]
},
]
},]
