import Recommend from '../notes/recommend/Recommend';
import Com1513001629 from '../notes/interview/1513001629/Com1513001629';
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
haveChildern:true,
childern:[{
name:"ios loadview viewdidload",
path:"/interview/1513001629",
component:Com1513001629,
level:1,
exact:true,
haveChildern:false,
childern:[]
},
]
},]
