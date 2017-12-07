class NewNote {
    constructor() {
        var {MyTools} = require('./tools.js');
        this.myTools = new MyTools();
        this.tempFile = './src/ComponentTemplate.js';

        this.notes = this.myTools.readJson('./src/notes.json');
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

var d = {
    name: "my test node",
    maps: ["notes", "test1"],
    component: "MyTest",
    note: "aaaa test  aaaaa test"
}

var nodes = [2,3];

var n = new NewNote();
// n.createNewComponent(d);
var t = n.getNodeByNodes(nodes);
console.log(t);
