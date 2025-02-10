// 监听键盘事件，实现 Ctrl + S 保存功能
document.addEventListener("keydown", (e)=>{
    if(e.ctrlKey && e.key == "s"){
        e.preventDefault(); // 阻止浏览器默认的保存行为
        SaveNoteData(); // 调用保存笔记数据的函数
    }
})

// 获取容器元素
const Container = document.getElementById("container");
// 声明全局变量，用于存储选中的文本和范围
let selectedText = "";
let rangeAT = "";
// 从localStorage获取笔记数据，如果没有则初始化为空数组
let noteData = localStorage.getItem("noteData") || [];

// 页面加载时读取已保存的笔记数据
readNoteData();
function readNoteData(){
    try {
        // 获取并解析数据
        const savedData = localStorage.getItem("noteData");
        if (!savedData) {
            noteData = [];
            return;
        }
        
        noteData = JSON.parse(savedData);
        
        // 检查数据有效性
        if (!Array.isArray(noteData)) {
            noteData = [];
            return;
        }

        // 遍历笔记数据，为每条笔记创建对应的DOM元素
        noteData.forEach((note) => {
            if (note.value && typeof note.value === 'string') {
                CreateNewNote(note.value);
            }
        });
    } catch (error) {
        console.error('读取笔记数据失败:', error);
        noteData = [];
    }
}

// 创建新笔记的函数
function CreateNewNote(e){
    // 创建笔记容器
    let div = document.createElement("div");
    div.classList.add("note-row")

    // 定义笔记的HTML结构
    // 包含：可编辑的笔记区域和控制按钮区域（文本样式、删除功能）
    let newNoteHTML = `
        <div class="note-row">
            <div 
                class="note-editor" 
                contenteditable="true" 
                data-note-id="${Date.now()}"
                onmouseup="getSelectedText()"
                >${e}</div>
            <div class="note-controls">
                <div onclick="getSelectedStyle('capitalize')" class="capitalize">Aa</div>
                <div onclick="getSelectedStyle('bold')" class="bold">B</div>
                <div onclick="getSelectedStyle('italic')" class="italic">I</div>
                <div onclick="getSelectedStyle('underline')" class="underline">U</div>
                <div onclick="getSelectedStyle('lineThrough')" class="lineThrough">ab</div>
                <hr />
                <img src="images/delete.png" alt="delete" class="delete-btn" onclick="DeleteNote(this)">
            </div>
        </div>`;
    div.innerHTML = newNoteHTML;
    Container.appendChild(div);

    // 为所有笔记编辑器添加回车事件监听
    // 实现按下回车时插入换行符而不是默认的div
    const noteEditorData = document.querySelectorAll(".note-editor");
    noteEditorData.forEach((note) => {
        note.addEventListener("keypress", (e)=>{
            if(e.key == "Enter"){
                document.execCommand("insertHTML", false, "<br />");
                return false;
            }
        })
    })
} 

// 保存笔记数据到localStorage
function SaveNoteData(){
    // 清空现有数据
    noteData = [];
    
    // 获取所有笔记内容并保存
    const noteEditorData = document.querySelectorAll(".note-editor");
    noteEditorData.forEach((note) => {
        // 1. 检查内容是否为空（排除只有空格或换行的情况）
        const content = note.innerHTML.trim();
        if(content && content !== "<br>" && content !== "<br/>") {
            noteData.push({
                id: note.dataset.noteId,  // 添加笔记ID
                value: content,           // 保存笔记内容
                lastModified: Date.now()  // 添加最后修改时间
            });
        }
    });

    // 将数据转换为JSON字符串存储
    localStorage.setItem("noteData", JSON.stringify(noteData));
}

// 获取用户选中的文本
function getSelectedText(){
    selectedText = window.getSelection().toString(); // 获取选中的文本内容
    rangeAT = window.getSelection().getRangeAt(0); // 获取选中区域的Range对象
}

// 为选中的文本应用样式
function getSelectedStyle(e){
    if(selectedText){
        // 创建span元素并添加对应的样式类
        let div = document.createElement("span")
        div.classList.add(e);
        div.innerText = selectedText;
        // 删除原有内容并插入新的带样式的内容
        rangeAT.deleteContents();
        rangeAT.insertNode(div);
    }
}

// 删除笔记
function DeleteNote(e){
    // 弹出确认对话框
    let conform = confirm("Are you sure you want to delete this note?");
    if(conform){
        // 删除对应的笔记元素并保存更新后的数据
        e.parentElement.parentElement.remove();
        SaveNoteData();
    }
}