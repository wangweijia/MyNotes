var inquirer = require('inquirer');
var moment = require('moment');
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

        // this.myTools.newDir(filePath);
        this.myTools.newDirIfNotExists(filePath, ()=>{
            var newComponent = filePath + fileName;

            var tempCompontent = this.myTools.readFile(this.tempFile);
            tempCompontent = tempCompontent.replace('tCLASSNAMEt', info.component);
            tempCompontent = tempCompontent.replace('tCLASSCONTENTt', info.name + ':' + info.note);

            this.myTools.clearFile(newComponent);
            this.myTools.writeFile(newComponent, tempCompontent);
        })
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
        var separator = new inquirer.Separator();
        var message = 'what next do?\ncurrent path:';

        var pathMpas = node.newMaps();
        for (var i = 0; i < pathMpas.length; i++) {
            message += '->(' + pathMpas[i] + ')';
        }

        var qi1Choices = ['edit', separator];
        if (node.parent) {
            qi1Choices = ['back', ...qi1Choices];
        }

        for (var i = 0; i < node.childern.length; i++) {
            var item = `${i})${node.childern[i].nodeNmae}`;
            qi1Choices.push(item);
        }

        var qi1 = {
            type: 'list',
            name: 'path',
            message: message,
            choices: qi1Choices,
            filter: (val) => {
                var sp = val.split(")");
                var newPath = {};
                if (sp.length > 1) {
                    newPath.command = 'next';
                    var index = val.split(')')[0];
                    newPath.path = [ ...path, index];
                } else {
                    newPath.command = val;
                    newPath.path = path;
                }
                return newPath;
            }
        }

        inquirer.prompt([qi1]).then(answers => {
            switch (answers.path.command) {
                case 'next': {
                    this.questionWithPath(answers.path.path);
                }
                    break;
                case 'edit': {
                    this.questionNextStep(answers.path.path);
                }

                    break;
                case 'back': {
                    path.pop();
                    this.questionWithPath(path);
                }

                    break;
                default:

            }

        });
    }

    questionNextStep(path) {
        var node = this.notesObj.getNodeItemByPath(path);
        var separator = new inquirer.Separator();

        var qi2Choices = ['new', 'edit', separator, 'cancel'];
        if (node.parent) {
            qi2Choices.splice(2, 0, 'delete')
        }

        var qi2 = {
            type: 'list',
            name: 'do',
            message: 'How to deal with?',
            choices: qi2Choices
        }

        inquirer.prompt([qi2]).then(answers => {
            switch (answers.do ) {
                    case 'new' : {
                        this.questionInfo(path)
                    }
                    break;
                    case 'delete' : {}
                    break;
                    case 'edit' : {}
                    break;
                    case 'cancel' : {
                        this.questionWithPath(path);
                    }
                    break;
                    default : {}
                }
            });
        }

        questionInfo(path) {
            var time = moment().unix();
            var defaultComponent = `Com${time}`;
            var choices = [
                {
                    type: 'input',
                    name: 'name',
                    message: "What's your show name?"
                }, {
                    type: 'input',
                    name: 'nodeNmae',
                    message: "What's your nodeNmae name?(default:create time)",
                    default: time
                }, {
                    type: 'input',
                    name: 'component',
                    message: "What's your component name?",
                    default: defaultComponent
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
