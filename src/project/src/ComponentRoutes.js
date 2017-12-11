import Recommend from '../notes/recommend/Recommend';
import Interview from '../notes/interview/Interview';
export const myRoutes = [{
name:"介绍",
path:"/recommend",
component:Recommend,
level:0,
exact:true,
haveChildern:false,
childern:[]
},{
name:"面试问题汇总",
path:"/interview",
component:Interview,
level:0,
exact:true,
haveChildern:false,
childern:[]
},]
