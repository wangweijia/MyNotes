var {NodeItem} = require('./model/nodeItem.js');
var {MyTools} = require('./tools.js');

class NewNote {
    constructor() {
        this.jsonFile = './src/notes.json';
        this.myTools = new MyTools();
        this.tempFile = './src/ComponentTemplate.js';
        this.notes = this.myTools.readJson(this.jsonFile);

        this.initNotesObj()
    }

    initNotesObj() {
        var obj = {
            "name": "notes",
            "nodeNmae": "notes",
            "maps": [
                "notes",
            ],
            "component": undefined,
            "childern": this.notes
        }
        this.notesObj = new NodeItem(obj, undefined, 0);
    }

    createNewComponent(info) {
        var fileName = info.component + '.js';
        var filePath = '../';
        info.maps.map((item, index)=>{
            filePath += item + '/';
        })

        this.myTools.newDir(filePath);

        var newComponent = filePath + fileName;

        var tempCompontent = this.myTools.readFile(this.tempFile);
        tempCompontent = tempCompontent.replace('tCLASSNAMEt',info.component);
        tempCompontent = tempCompontent.replace('tCLASSCONTENTt',info.name + ':' + info.note);

        this.myTools.clearFile(newComponent);
        this.myTools.writeFile(newComponent, tempCompontent);
    }

    createNewRouteJson(info, path) {
        var i = this.notesObj.getNodeItemByPath(path);
        var n = i.insertNode(info);
        var newJson = this.notesObj.objNode();

        this.myTools.writeJsonFile(this.jsonFile, newJson);

        this.createNewComponent(n.objNode());
    }
}

var n = new NewNote();

n.createNewRouteJson({
    "name": "test6_1",
    "nodeNmae": "test6_1",
    "component": "Test3_1",
}, [1, 0]);
