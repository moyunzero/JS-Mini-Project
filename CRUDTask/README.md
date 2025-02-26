# ToDo List 待办事项应用

## 项目简介

这是一个简洁优雅的待办事项（ToDo List）Web应用，使用纯HTML、CSS和JavaScript开发，无需任何外部依赖。该应用支持任务的创建、读取、更新、删除（CRUD）等基本功能，并具有美观的动画效果和响应式设计。

## 功能特点

- ✨ 创建新任务
- 📝 编辑已有任务
- ✅ 标记任务完成（双击任务）
- 🗑️ 删除任务
- 💾 本地数据持久化存储
- 🎯 实时输入验证
- 🎨 流畅的动画效果
- 📱 响应式设计，支持移动端

## 技术栈

- HTML5
- CSS3
- 原生JavaScript
- LocalStorage（本地存储）

## 项目结构

```plaintext
todo-list/
│
├── index.html          # 主HTML文件
├── style.css           # 样式表
├── script.js           # JavaScript逻辑
│
├── images/             # 图标和图片资源
│   ├── add.svg
│   ├── delete.svg
│   ├── edit.svg
│   ├── refresh.svg
│   └── icons8-task.gif
│
└── README.md           # 项目说明文档
```

## 安装和使用

1. 克隆仓库到本地：

   ```bash
   git clone https://github.com/your-username/todo-list.git
   ```

2. 进入项目目录：

   ```bash
   cd todo-list
   ```

3. 使用浏览器打开 `index.html` 文件即可运行应用。

## 主要功能说明

### 创建任务

- 在输入框中输入任务内容。
- 点击添加按钮或按回车键添加新任务。

### 编辑任务

- 点击任务旁的编辑图标进入编辑模式。
- 在输入框中修改任务内容。
- 点击更新按钮或按回车键保存修改。

### 完成任务

- 双击任务将其标记为已完成（添加删除线）。

### 删除任务

- 点击任务旁的删除图标删除任务。
- 删除前会有确认提示。

### 数据持久化

- 使用 LocalStorage 保存任务数据，刷新页面后数据不会丢失。

## 代码亮点

1. **模块化设计**：功能被划分为多个独立的函数，提高了代码的可读性和可维护性。
2. **动画效果**：使用CSS动画实现了任务添加和删除的平滑过渡效果。
3. **响应式布局**：通过媒体查询实现了移动端的适配。
4. **输入验证**：实时验证用户输入，防止添加空白或重复的任务。
5. **错误处理**：对LocalStorage操作进行了异常捕获，增强了应用的稳定性。

## 未来改进计划

- [ ] 添加任务分类功能
- [ ] 实现任务排序功能
- [ ] 添加任务提醒功能
- [ ] 实现数据同步（可选择云存储）
- [ ] 添加暗黑模式

## 贡献指南

欢迎对项目进行贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 将您的更改推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 许可证

本项目采用 MIT 许可证。查看 [LICENSE](LICENSE) 文件了解更多信息。
