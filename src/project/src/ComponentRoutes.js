import Home from '../notes/home/Home';
import Recommend from '../notes/home/recommend/Recommend';
export const myRoutes = [{
name:"MyNotes",
path:"/home",
component:Home,
level:0,
exact:true,
haveChildern:true,
childern:[{
name:"介绍",
path:"/home/recommend",
component:Recommend,
level:1,
exact:true,
haveChildern:false,
childern:[]
},
]
},]
