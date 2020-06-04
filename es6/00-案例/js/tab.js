// let that;
class Tab {
    constructor(id) {
        // 获取元素
        // that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        // li的父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        // section 父元素
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    init() {
        this.updateNode();
        // init 初始化操作让相关的元素绑定事件
        this.add.onclick = this.addTab.bind(this.add,this);
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i],this);
            this.remove[i].onclick = this.removeTab.bind(this.remove[i],this);
            // 双击事件：ondblclick
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;

        }
    }
    // 因为我们动态添加元素 需要从新获取对应的元素
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');

    }
    // 1. 切换功能
    toggleTab(that) {
        // console.log(this.index);
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    // 清除所有li 和section 的类
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
//    2、具有添加功能
    addTab(that) {
        that.clearClass();
        // (1) 创建li元素和section元素
        const random = Math.random();
        const li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        const section = '<section class="conactive">测试 ' + random + '</section>';
        // (2) 把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();
    }
//    3、具有删除功能
    removeTab(that,e){
        e.stopPropagation();//阻止冒泡 防止触发li的切换点击事件
       let index =this.parentNode.index;
        console.log(index)
        //根据索引号删除对应的li和section remove()方法可以直接删除指定的元素
        that.lis[index].remove()
        that.sections[index].remove()
        that.init();
    //    当我们删除的不是选中状态的li 的时候，原来的选中状态li保持不变
        if (document.querySelector('.liactive')) return;
    //    当我们删除了选中状态的这个li的时候，让它的前一个li处于选定状态
        index--;
        // 手动调用点击事件，不需要鼠标触发
        // 如果前面的条件为真，则调用后面的方法，为假则不触发
        that.lis[index]&&that.lis[index].click()
    }
//    4、具有修改功能
    editTab(){
        // 将外面的文字赋值给文本框内的文字
        let str=this.innerHTML;
       // 双击禁止点击文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // 双击添加文本框
        this.innerHTML = '<input type="text" />'
        let input = this.children[0]
        input.value=str;
        input.select();//文本框里面的文字处于选定状态
        // 当鼠标离开文本框，就把文本框内的值给span
        input.onblur=function () {
            this.parentNode.innerHTML=this.value;
        }
        // 按下回车也可以吧文本框里面的值给span  e：对象
        input.onkeyup = function (e) {
            if (e.keyCode === 13 ){
                // 手动调用表单失去焦点事件 不需要鼠标离开操作
                this.blur();
            }
        }


    }
}
 new Tab('#tab');

// 学到13这个位置