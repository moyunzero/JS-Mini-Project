// 获取关键DOM元素
const todoText = document.getElementById('todoText');        // 任务输入框
const listItems = document.getElementById('list-items');     // 任务列表容器
const addUpdateClick = document.getElementById('AddUpdateClick');  // 添加/更新按钮
const alertMessage = document.getElementById('AlertMessage');  // 提示消息显示区域

// 用于存储待更新的任务文本元素
let updateText;

// 从localStorage获取待办事项数据，如果没有则初始化为空数组
let todoData = JSON.parse(localStorage.getItem('todoData')) || [];

// 为输入框添加回车键事件监听
todoText.addEventListener('keypress', function(event){
    SetAlertMessage(''); // 清除任何现有提示消息
    if(event.key === 'Enter'){  // 当用户按下回车键时
        addUpdateClick.click(); // 触发添加/更新按钮的点击事件
    }
});

// 页面加载时初始化待办事项列表
initializeToDoList();

// 初始化函数
function initializeToDoList() {
    listItems.innerHTML = ''; // 清空现有列表
    ReadToDoItems(); // 读取并显示待办事项
}

// 读取并显示所有待办事项
function ReadToDoItems(){
    if(!todoData || !todoData.length) return;
    
    todoData.forEach(item => {
        // 创建新的列表项
        let li = document.createElement('li');
        
        // 根据任务完成状态设置删除线样式
        const textDecoration = item.status ? 'line-through' : '';
        
        // 构建任务项的HTML结构
        const todoItems =`
            <div 
                ondblclick="CompleteToDoItem(this)"
                style="text-decoration: ${textDecoration}" 
            >
                ${item.item} 
            </div>
            <div>
                ${!item.status ? `
                    <img 
                        src="./images/edit.svg" 
                        alt="edit" 
                        class="edit todo-controls"
                        onclick="UpdateToDoItems(this)" 
                    >
                ` : ''}
                <img 
                    src="./images/delete.svg" 
                    alt="delete" 
                    class="delete todo-controls"
                    onclick="DeleteToDoItems(this)"  
                >
            </div>
        `;

        li.innerHTML = todoItems;
        listItems.appendChild(li);
    });
}

// 创建新的待办事项
function CreateToDoData(){
    const taskText = todoText.value.trim();
    
    if(taskText === ''){
        SetAlertMessage('请输入任务');
        todoText.focus();
        return;
    }
    
    if(todoData.some(item => item.item === taskText)) {
        SetAlertMessage('该任务已存在');
        todoText.focus();
        return;
    }
    
    addNewTask(taskText);
    saveToLocalStorage();
    clearInput();
}

// 完成待办事项（添加删除线）
function CompleteToDoItem(item){
    if(item.style.textDecoration === ''){
        // 添加删除线来标记任务完成
        item.style.textDecoration = 'line-through';
        
        // 隐藏编辑按钮
        const editButton = item.parentElement.querySelector('.edit');
        if(editButton) {
            editButton.style.display = 'none';
        }

        // 更新数据
        const taskText = item.innerText.trim();
        todoData = todoData.map(element => {
            if(element.item === taskText) {
                return { ...element, status: true };
            }
            return element;
        });

        // 保存更新
        saveToLocalStorage();
    }
}

// 更新已选择的任务项
function UpdateOnSelectionItems(){
    const newText = todoText.value.trim();
    const oldText = updateText.innerText.trim();
    
    // 检查新文本是否为空
    if(newText === '') {
        SetAlertMessage('任务内容不能为空');
        todoText.focus();
        return;
    }
    
    // 检查是否与其他任务重复
    if(todoData.some(item => item.item === newText && item.item !== oldText)) {
        SetAlertMessage('该任务已存在');
        todoText.focus();
        return;
    }
    
    // 更新DOM
    updateText.innerHTML = newText;
    
    // 更新数据
    todoData = todoData.map(element => {
        if(element.item === oldText){
            return { ...element, item: newText };
        }
        return element;
    });
    
    // 保存更新
    saveToLocalStorage();
    
    // 重置界面
    resetInterface();
}

// 进入任务编辑模式
function UpdateToDoItems(item){
    const parentDiv = item.closest('div').parentElement;
    const taskDiv = parentDiv.querySelector('div');
    
    if(taskDiv.style.textDecoration === ''){
        todoText.value = taskDiv.innerText;
        // 切换按钮为更新模式
        addUpdateClick.setAttribute('onclick','UpdateOnSelectionItems()');
        addUpdateClick.setAttribute('src','./images/refresh.svg');
        // 保存要更新的文本元素引用
        updateText = taskDiv;
    }
}

// 删除任务项
function DeleteToDoItems(item){
    // 获取要删除的任务文本
    let deleteItem = item.parentElement.parentElement.querySelector('div').innerText;
    // 弹出确认对话框
    if(confirm(`确定要删除任务: ${deleteItem} 吗?`)){
        const li = item.parentElement.parentElement;
        
        // 添加删除动画类
        li.classList.add('deleted-item');
        
        // 等待动画完成后执行实际删除操作
        li.addEventListener('animationend', () => {
            // 从DOM中移除元素
            li.remove();
            // 更新存储的数据
            todoData = todoData.filter(element => element.item !== deleteItem);
            localStorage.setItem('todoData', JSON.stringify(todoData));
        });
    } 
}

// 显示提示消息
function SetAlertMessage(message){
    // 移除之前的动画类
    alertMessage.removeAttribute('class');
    // 设置新的提示消息
    alertMessage.innerText = message;
    // 延迟添加渐隐动画类
    setTimeout(() => {
        alertMessage.classList.add('toggleMe');
    }, 1000);
}

// 应该添加try-catch处理localStorage操作可能的异常
function saveToLocalStorage() {
    try {
        localStorage.setItem('todoData', JSON.stringify(todoData));
    } catch (e) {
        console.error('保存到localStorage失败:', e);
        SetAlertMessage('保存失败，请检查浏览器存储空间');
    }
}

// 清理输入框函数
function clearInput() {
    todoText.value = '';
    todoText.focus();
}

// 添加新任务函数
function addNewTask(taskText) {
    // 创建新的列表项元素
    let li = document.createElement('li');

    // 构建任务项的HTML结构
    const todoItems = `
        <div 
            ondblclick="CompleteToDoItem(this)" 
        >
            ${taskText} 
        </div>
        <div>
            <img 
                src="./images/edit.svg" 
                alt="edit" 
                class="edit todo-controls"
                onclick="UpdateToDoItems(this)" 
            >
            <img 
                src="./images/delete.svg" 
                alt="delete" 
                class="delete todo-controls"
                onclick="DeleteToDoItems(this)"  
            >
        </div>
    `;

    // 将HTML结构添加到列表项中
    li.innerHTML = todoItems;
    
    // 将列表项添加到任务列表容器
    listItems.appendChild(li);

    // 将新任务添加到todoData数组
    todoData.push({
        item: taskText,
        status: false
    });
}

// 添加界面重置函数
function resetInterface() {
    addUpdateClick.setAttribute('onclick', 'CreateToDoData()');
    addUpdateClick.setAttribute('src', './images/add.svg');
    clearInput();
}