var {MyTools} = require('./tools.js');

class NewCompenentRoutes {
    constructor() {
        this.myTools = new MyTools();
    }

    newImport(item) {
        var path = "../"
        item.maps.map((file, index)=>{
            path += file+"/";
        })
        var importStr = `import ${item.component} from '${path}${item.component}';`;
        return importStr;
    }

    getAllImport(items) {
        var importStrs = [];
        items.map((item, index)=>{
            var importStr = this.newImport(item);
            importStrs.push(importStr);
            if (item.childern.length > 0) {
                var childernImportStrs = this.getAllImport(item.childern);
                importStrs = [...importStrs, ...childernImportStrs];
            }
        })

        return importStrs;
    }

    // 包裹字符串
    bracketStr(left, str, right) {
        return `${left}${str}${right}`;
    }

    routeToString(route, level) {
        var jsonStr = '';

        var maps = '';
        for (var i = 1; i < route.maps.length; i++) {
            maps += '/'+route.maps[i];
        }
        var haveChildern = route.childern.length>0?'true':'false';

        var childern = '';
        for (var i = 0; i < route.childern.length; i++) {
            childern += this.routeToString(route.childern[i], level+1) + ',\n';
        }

        jsonStr += `name:"${route.name}",\n`;
        jsonStr += `path:"${maps}",\n`;
        jsonStr += `component:${route.component},\n`;
        jsonStr += `level:${level},\n`;
        jsonStr += "exact:true,\n";
        jsonStr += `haveChildern:${haveChildern},\n`;
        jsonStr += `childern:[${childern}]`

        return this.bracketStr('{\n', jsonStr, '\n}');
    }

    allRouteToString(routes) {
        var str = '';
        for (var i = 0; i < routes.length; i++) {
            str += this.routeToString(routes[i], 0) + ',';
        }

        return `export const myRoutes = [${str}]`;
    }

    create() {
        var jsonFile = './src/notes.json';
        var jsFile = '../src/ComponentRoutes.js';

        this.myTools.clearFile(jsFile);

        var j = this.myTools.readJson(jsonFile);
        var t = this.getAllImport(j);
        this.myTools.writeFileWithArray(jsFile, t);

        var s = this.allRouteToString(j);
        this.myTools.writeFileLine(jsFile, s);
    }
}

exports.NewCompenentRoutes = NewCompenentRoutes;

// var jsonFile = './src/notes.json';
// var jsFile = '../src/ComponentRoutes.js';
//
// var n = new NewCompenentRoutes();
// n.myTools.clearFile(jsFile);
//
// var j = n.myTools.readJson(jsonFile);
// var t = n.getAllImport(j);
// n.myTools.writeFileWithArray(jsFile, t);
//
// var s = n.allRouteToString(j);
// n.myTools.writeFileLine(jsFile, s);
