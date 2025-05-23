# 圈数计时器 (Laps Stopwatch)

一个美观、功能完善的计时器应用，支持计时、暂停、重置和记录圈数功能。

## 功能特点

- **精确计时**：显示时、分、秒和毫秒（精确到百分之一秒）
- **圈数记录**：在计时过程中记录多个时间点
- **直观界面**：现代化UI设计，操作简单直观
- **响应式按钮**：带有视觉反馈的交互式按钮
- **圈数历史**：以列表形式显示所有记录的圈数时间

## 使用方法

1. **开始计时**：点击绿色的"开始"按钮
2. **记录圈数**：计时过程中，点击蓝色的"圈"按钮记录当前时间
3. **暂停计时**：点击红色的"停止"按钮
4. **继续计时**：暂停后，点击绿色的"开始"按钮继续
5. **重置计时器**：点击橙色的"重置"按钮，清空所有计时和圈数记录

## 技术实现

### HTML结构

- 使用语义化HTML构建界面
- 采用简洁的DOM结构，便于样式和脚本控制
- 使用`defer`属性确保DOM加载完成后再执行JavaScript

### CSS样式

- 使用Flexbox布局实现居中和对齐
- 应用渐变背景和阴影效果增强视觉体验
- 圆形按钮设计，符合现代UI趋势
- 添加交互动画提升用户体验
- 使用等宽字体确保时间显示对齐

### JavaScript功能

- 使用`setInterval`实现精确计时
- 动态DOM操作创建和管理圈数记录
- 状态管理确保按钮和功能在不同状态下的正确行为
- 时间格式化确保两位数显示

## 项目结构

```text
LapsStopWatch/
├── index.html    # HTML结构和界面元素
├── style.css     # 样式和视觉效果
├── script.js     # 计时和交互逻辑
└── README.md     # 项目说明文档
```

## 未来改进方向

- 添加数据持久化，保存历史记录
- 增加导出功能，支持CSV或JSON格式
- 添加深色模式支持
- 实现响应式设计，适配移动设备
- 添加声音反馈
- 支持自定义主题颜色

## 许可证

本项目采用MIT许可证。详见LICENSE文件。