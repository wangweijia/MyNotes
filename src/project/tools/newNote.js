var inquirer = require('inquirer');
var {
    NodeItem
} = require('./model/nodeItem.js');
var {
    MyTools
} = require('./tools.js');
var {
    NewComponentRoutes
} = require('./newComponentRoutes.js');

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
            "maps": ["notes"],
            "component": undefined,
            "childern": this.notes
        }
        this.notesObj = new NodeItem(obj, undefined, 0);
    }

    createNewComponent(info) {
        var fileName = info.component + '.js';
        var filePath = '../';
        info.maps.map((item, index) => {
            filePath += item + '/';
        })

        this.myTools.newDir(filePath);

        var newComponent = filePath + fileName;

        var tempCompontent = this.myTools.readFile(this.tempFile);
        tempCompontent = tempCompontent.replace('tCLASSNAMEt', info.component);
        tempCompontent = tempCompontent.replace('tCLASSCONTENTt', info.name + ':' + info.note);

        this.myTools.clearFile(newComponent);
        this.myTools.writeFile(newComponent, tempCompontent);
    }

    create(info, path) {
        var i = this.notesObj.getNodeItemByPath(path);
        var n = i.insertNode(info);
        var newJson = this.notesObj.objNode();

        this.myTools.writeJsonFile(this.jsonFile, newJson);

        this.createNewComponent(n.objNode());

        var newComponentRoutes = new NewComponentRoutes();
        newComponentRoutes.create();
    }

    delete(path) {}

    edit(path) {}

    questionWithPath(path) {
        var node = this.notesObj.getNodeItemByPath(path);

        var qi1Choices = [];
        for (var i = 0; i < node.childern.length; i++) {
            var item = `${i})${node.childern[i].nodeNmae}`;
            qi1Choices.push(item);
        }

        var qi1 = {
            type: 'list',
            name: 'path',
            message: 'note path?',
            choices: qi1Choices,
            filter: (val) => {
                var index = val.split(')')[0];
                return [
                    ...path,
                    index
                ];
            }
        }

        inquirer.prompt([qi1]).then(answers => {
            this.questionNextStep(answers.path);
        });
    }

    questionNextStep(path) {
        var node = this.notesObj.getNodeItemByPath(path);

        var qi2Choices = ['create', 'delete', 'edit', 'no'];
        if (path.length > 1) {
            qi2Choices = [
                'back', ...qi2Choices
            ];
        }
        if (node.childern.length > 0) {
            qi2Choices = [
                'next', ...qi2Choices
            ];
        }

        var qi2 = {
            type: 'list',
            name: 'do',
            message: 'How to deal with?',
            choices: qi2Choices
        }

        inquirer.prompt([qi2]).then(answers => {
            switch (answers.do ) {
                    case 'next' : {
                        this.questionWithPath(path);
                    }
                    break;
                    case 'back' : {
                        path.pop();
                        path.pop();
                        this.questionWithPath(path);
                    }
                    break;
                    case 'create' : {
                        this.questionInfo(path)
                    }
                    break;
                    case 'delete' : {}
                    break;
                    case 'edit' : {}
                    break;
                    case 'no' : {
                        path.pop();
                        this.questionWithPath(path);
                    }
                    break;
                    default : {}
                }
            });
        }

        questionInfo(path) {
            var choices = [
                {
                    type: 'input',
                    name: 'name',
                    message: "What's your show name"
                }, {
                    type: 'input',
                    name: 'nodeNmae',
                    message: "What's your nodeNmae name"
                }, {
                    type: 'input',
                    name: 'component',
                    message: "What's your component name"
                }
            ];
            inquirer.prompt(choices).then(answers => {
                this.create(answers, path);
            });
        }
    }

    // exports.NewNote = NewNote;

    var n = new NewNote();
    n.questionWithPath([]);
