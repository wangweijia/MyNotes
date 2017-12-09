var {NodeItem} = require('./model/nodeItem.js');
var {MyTools} = require('./tools.js');

class NewNote {
    constructor() {
        this.myTools = new MyTools();
        this.tempFile = './src/ComponentTemplate.js';
        this.notes = this.myTools.readJson('./src/notes.json');

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
        var newComponent = filePath + fileName;

        var tempCompontent = this.myTools.readFile(this.tempFile);
        tempCompontent = tempCompontent.replace('tCLASSNAMEt',info.component);
        tempCompontent = tempCompontent.replace('tCLASSCONTENTt',info.name + ':' + info.note);

        this.myTools.clearFile(newComponent);
        this.myTools.writeFile(newComponent, tempCompontent);
    }

    getNodeByNodes(nodes) {
        var temp = this.notes;
        for (var j = 0; j < nodes.length; j++) {
            var node = nodes[j];
            for (var i = 0; i < temp.length; i++) {
                console.log("i:" + i);

                if (temp[i].nodeIndex == node) {
                    if (j == nodes.length - 1) {
                        temp = temp[i].childern;
                    }
                    break;
                }
            }
        }
        return temp;
    }
}

var n = new NewNote();
var c = n.notesObj.objNode();

n.myTools.writeJsonFile('./src/notes.json', c);
