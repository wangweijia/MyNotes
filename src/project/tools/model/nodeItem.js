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
}

exports.NodeItem = NodeItem;
