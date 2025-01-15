// 获取DOM元素
const todoText = document.getElementById('todoText');        // 输入框元素
const listItems = document.getElementById('list-items');     // 任务列表容器
const addUpdateClick = document.getElementById('AddUpdateClick');  // 添加/更新按钮

// 为输入框添加回车键监听事件
todoText.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){  // 当用户按下回车键时
        addUpdateClick.click(); // 触发添加/更新按钮的点击事件
    }
});

// 创建新的待办事项
function CreateToDoData(){
    // 输入验证：确保输入框不为空
    if(todoText.value === ''){
        alert('请输入任务');
        todoText.focus();
        return false;
    }
    
    // 创建新的列表项元素
    let li = document.createElement('li');

    // 构建待办事项的HTML结构
    const todoItems =`
        <div 
            ondblclick="CompleteToDoItem(this)"  // 双击标记完成
        >
            ${todoText.value}  // 插入任务文本
        </div>
        <div>
            <img 
                src="/CRUDTask/images/edit.svg" 
                alt="edit" 
                class="edit todo-controls"
                onclick="UpdateToDoItems(this)"  // 点击编辑任务
            >
            <img 
                src="/CRUDTask/images/delete.svg" 
                alt="delete" 
                class="delete todo-controls"
                onclick="DeleteToDoItems(this)"  // 点击删除任务
            >
        </div>
    `;

    // 将HTML结构添加到列表项中
    li.innerHTML = todoItems;
    // 将列表项添加到任务列表容器
    listItems.appendChild(li);
    // 清空输入框并重新获得焦点
    todoText.value = '';
    todoText.focus();
}

// 完成待办事项（添加删除线）
function CompleteToDoItem(item){
    // 检查任务是否已经被标记为完成
    if(item.parentElement.querySelector('div').style.textDecoration === ''){
        // 添加删除线来标记任务完成
        item.parentElement.querySelector('div').style.textDecoration = 'line-through';
    }
}

// 更新待办事项
function UpdateToDoItems(item){
    // 检查任务是否未完成（没有删除线）
    if(item.parentElement.parentElement.querySelector('div').style.textDecoration === ''){
        // 将任务文本填充到输入框中
        todoText.value = item.parentElement.parentElement.querySelector('div').innerText;
        // 修改添加按钮的点击事件为更新事件
        addUpdateClick.setAttribute('onclick','UpdateOnSelectionItems()');
        // 更改按钮图标为刷新图标
        addUpdateClick.setAttribute('src','/CRUDTask/images/refresh.svg');
    }
}

// 删除待办事项
function DeleteToDoItems(item){
    // 获取要删除的任务文本并打印到控制台
    console.log('删除',item.parentElement.parentElement.querySelector('div').innerText);
    // TODO: 实现实际的删除功能
}