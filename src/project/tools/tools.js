var fs = require('fs');

class MyTools {
    constructor() {

    }

    readFile(file) {
        return fs.readFileSync(file, 'utf-8');
    }

    readJson(file) {
        var result = JSON.parse(this.readFile(file));
        return result;
    }

    clearFile(file) {
        fs.writeFile(file, '', (error)=>{
            if (error) {
                console.log("write error");
                console.log(error);
            }
        })
    }

    writeJsonFile(file, json) {
        fs.writeFileSync(file, JSON.stringify(json));
    }

    writeFile(file, data) {
        fs.appendFile(file, data, (error)=>{
            if (error) {
                console.log("write error");
                console.log(error);
            }
        })
    }

    writeFileLine(file, data) {
        this.writeFile(file, data + '\n');
    }

    writeFileWithArray(file, array) {
        for (var i = 0; i < array.length; i++) {
            this.writeFileLine(file, array[i]);
        }
    }
}

exports.MyTools = MyTools;
