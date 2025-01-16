// 获取DOM元素
const todoText = document.getElementById('todoText');        // 输入框元素
const listItems = document.getElementById('list-items');     // 任务列表容器
const addUpdateClick = document.getElementById('AddUpdateClick');  // 添加/更新按钮
const alertMessage = document.getElementById('AlertMessage');  // 提示信息
let updateText;
let todoData = JSON.parse(localStorage.getItem('todoData')) || [];

// 为输入框添加回车键监听事件
todoText.addEventListener('keypress', function(event){
    SetAlertMessage('');
    if(event.key === 'Enter'){  // 当用户按下回车键时
        addUpdateClick.click(); // 触发添加/更新按钮的点击事件
    }
});

// 初始化待办事项列表
initializeToDoList();

function initializeToDoList() {
    // 清空现有列表
    listItems.innerHTML = '';
    // 读取并显示待办事项
    ReadToDoItems();
}

function ReadToDoItems(){
    if(!todoData || !todoData.length) return;
    
    todoData.forEach(item => {
        // 创建新的列表项元素
        let li = document.createElement('li');

        // 根据任务状态设置样式
        const textDecoration = item.status ? 'line-through' : '';
        
        // 构建待办事项的HTML结构
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

        // 将HTML结构添加到列表项中
        li.innerHTML = todoItems;
        // 将列表项添加到任务列表容器
        listItems.appendChild(li);
    });
}

// 创建新的待办事项
function CreateToDoData(){
    // 输入验证：确保输入框不为空
    if(todoText.value === ''){
        SetAlertMessage('请输入任务');
        todoText.focus();
        return;
    }
    
    // 创建新的列表项元素
    let li = document.createElement('li');

    // 构建待办事项的HTML结构
    const todoItems =`
        <div 
            ondblclick="CompleteToDoItem(this)" 
        >
            ${todoText.value} 
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
   
    // 如果todoData为空，则初始化todoData
    if(!todoData){
        todoData = [];
    }

    // 将新创建的待办事项添加到todoData数组中
    let dataItem = {
        item: todoText.value,
        status: false
    };
    todoData.push(dataItem);

    // 将todoData数组保存到localStorage中
    localStorage.setItem('todoData',JSON.stringify(todoData));

    // 清空输入框并重新获得焦点
    todoText.value = '';
}

// 完成待办事项（添加删除线）
function CompleteToDoItem(item){
    // 检查任务是否已经被标记为完成
    if(item.parentElement.querySelector('div').style.textDecoration === ''){
        // 添加删除线来标记任务完成
        item.parentElement.querySelector('div').style.textDecoration = 'line-through';
        // 隐藏编辑按钮
        const editButton = item.parentElement.querySelector('.edit');
        if(editButton) {
            editButton.style.display = 'none';
        }
    }
    // 将完成状态更新到todoData数组中
    todoData.forEach(element => {
        if(item.innerText.trim() === element.item){
            element.status = true;
        }
    });
    localStorage.setItem('todoData',JSON.stringify(todoData));
}

function UpdateOnSelectionItems(){
    // 保存旧的文本内容
    const oldText = updateText.innerText.trim();
    
    // 更新 DOM 显示
    updateText.innerHTML = todoText.value;
    
    // 更新 localStorage 中的数据
    todoData = todoData.map(element => {
        if(element.item === oldText){
            return { ...element, item: todoText.value };
        }
        return element;
    });
    
    // 保存到 localStorage
    localStorage.setItem('todoData', JSON.stringify(todoData));
    
    // 重置界面状态
    addUpdateClick.setAttribute('onclick','CreateToDoData()');
    addUpdateClick.setAttribute('src','./images/add.svg');
    todoText.value = '';
    todoText.focus();
}


// 更新待办事项
function UpdateToDoItems(item){
    if(item.parentElement.parentElement.querySelector('div').style.textDecoration === ''){
        todoText.value = item.parentElement.parentElement.querySelector('div').innerText;
        addUpdateClick.setAttribute('onclick','UpdateOnSelectionItems()');
        addUpdateClick.setAttribute('src','./images/refresh.svg');
        updateText = item.parentElement.parentElement.querySelector('div');
    }
}

// 删除待办事项
function DeleteToDoItems(item){
    let deleteItem = item.parentElement.parentElement.querySelector('div').innerText;
    if(confirm(`确定要删除任务: ${deleteItem} 吗?`)){
        const li = item.parentElement.parentElement;
        
        // 1. 先添加删除动画类
        li.classList.add('deleted-item');
        
        // 2. 等待动画完成后再实际删除元素
        li.addEventListener('animationend', () => {
            li.remove();
            // 更新数据
            todoData = todoData.filter(element => element.item !== deleteItem);
            localStorage.setItem('todoData', JSON.stringify(todoData));
        });
    } 
}
function SetAlertMessage(message){
    alertMessage.removeAttribute('class');
    alertMessage.innerText = message;
    setTimeout(() => {
        alertMessage.classList.add('toggleMe');
    }, 1000);
}