import Recommend from '../notes/recommend/Recommend';
import Interview from '../notes/interview/Interview';
import Com1513001629 from '../notes/interview/1513001629/Com1513001629';
import Com1513002367 from '../notes/interview/1513002367/Com1513002367';
import Com1513235259 from '../notes/interview/1513235259/Com1513235259';
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
{
name:"view的点击事件传递",
path:"/interview/1513002367",
component:Com1513002367,
level:1,
exact:true,
haveChildern:false,
childern:[]
},
{
name:"block的3种类型",
path:"/interview/1513235259",
component:Com1513235259,
level:1,
exact:true,
haveChildern:false,
childern:[]
},
]
},]
