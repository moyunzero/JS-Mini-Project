# 密码校验器

一个简洁优雅的密码强度校验工具，帮助用户创建符合安全标准的密码。

## 功能特点

- 实时密码强度检测
- 清晰的视觉反馈
- 密码显示/隐藏切换
- 响应式设计，适配各种设备

## 密码要求

密码必须满足以下所有条件：
1. 长度至少8个字符
2. 至少包含1个大写字母
3. 至少包含1个小写字母
4. 至少包含1个数字
5. 至少包含1个特殊字符

## 技术实现

- 前端技术：HTML5 + CSS3 + JavaScript
- 字体：使用 Google Fonts 的 Noto Serif SC
- 设计风格：简约现代，突出重点
- 交互设计：即时反馈，清晰的视觉提示

## 项目结构

```plaintext
PasswordValidation/
│
├── index.html      # 主页面
├── style.css       # 样式表
├── script.js       # 交互逻辑
├── images/         # 图标资源
│   ├── check.png   # 验证通过图标
│   ├── close.png   # 验证失败图标
│   ├── hide.png    # 密码隐藏图标
│   └── show-eye.png# 密码显示图标
└── README.md       # 项目说明文档
```

## 样式特点

- 使用柔和的蓝色（#53b4d5）作为主题色
- 圆角设计提升视觉体验
- 清晰的文字层级
- 优雅的阴影效果
- 流畅的交互动画

## 使用说明

1. 在输入框中输入待验证的密码
2. 系统会实时检查密码是否符合各项要求
3. 符合要求的项目会显示绿色对勾
4. 不符合要求的项目会显示红色叉号
5. 点击眼睛图标可以切换密码显示/隐藏状态

## 后续优化建议

1. 添加密码强度评分机制
2. 实现密码生成功能
3. 增加更多自定义校验规则
4. 支持多语言切换
5. 添加密码复杂度可视化展示
