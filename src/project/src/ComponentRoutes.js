import Home from '../notes/home/Home.js';

export const myRoutes = [
    {
        name: "MyNotes",
        path: "/myNotes",
        component: Home,
        level: 0,
        exact: true,
        haveChildern: false,
        childern: [
        ]
    }
]
