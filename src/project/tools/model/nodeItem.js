class NodeItem {
    constructor(item, parent, index) {
        // 父类节点
        this.parent = parent;
        // 排序值
        this.index = index;
        // 显示的名字
        this.name = item.name;
        // 路径节点名字
        this.nodeNmae = item.nodeNmae;
        // 对应的页面
        this.component = item.component;
        // 子控件
        this.childern = [];
        if (item.childern) {
            for (var i = 0; i < item.childern.length; i++) {
                var ch = item.childern[i];
                var node = new NodeItem(ch, this, i);
                this.childern.push(node);
            }
        }
    }

    newMaps() {
        if (this.parent) {
            return [
                ...this.parent.newMaps(),
                this.nodeNmae
            ];
        } else {
            return [
                this.nodeNmae
            ];
        }
    }

    objNode() {
        var childern = [];
        for (var i = 0; i < this.childern.length; i++) {
            var t = this.childern[i];
            childern.push(t.objNode());
        }

        if (this.parent) {
            var maps = this.newMaps();
            return {
                "name": this.name,
                "nodeNmae": this.nodeNmae,
                "maps": maps,
                "component": this.component,
                "childern": childern
            }
        } else {
            return childern;
        }
    }

    getNodeItemByPath(path) {
        var copyPath = [...path];
        if (copyPath.length == 0) {
            return this;
        }

        if (this.childern.length > 0) {
            var t = this.childern[copyPath[0]];
            if (t) {
                copyPath.shift();
                return t.getNodeItemByPath(copyPath);
            } else {
                return undefined;
            }
        } else {
            return this;
        }
    }

    insertNode(item) {
        var node = new NodeItem(item, this, this.childern.length);
        this.childern.push(node);
        return node;
    }

    deleteNodeSelf() {
        if (this.parent) {
            this.parent.childern.splice(this.index,1);
        }
    }
}

exports.NodeItem = NodeItem;
