# 验证码生成器

## 项目简介

这是一个简单而实用的验证码生成器网页应用，用于模拟网站常见的验证码功能。该应用能够自动生成随机验证码，并验证用户输入是否正确，帮助网站防止机器人自动提交表单。

## 功能特点

- **随机验证码生成**：每次刷新页面或点击刷新按钮时，自动生成包含数字和字母（大小写混合）的随机验证码
- **用户输入验证**：用户可以在输入框中输入验证码，并通过点击验证按钮检查输入是否正确
- **即时反馈**：验证结果会立即显示，成功显示绿色提示，失败显示红色提示
- **响应式设计**：适配不同屏幕尺寸的设备，提供良好的用户体验

## 项目结构

```
ReCaptchaCode/
│
├── index.html          # 页面结构
├── style.css           # 页面样式
├── script.js           # 功能实现
└── images/             # 图标资源
    ├── refresh.png     # 刷新按钮图标
    └── check.png       # 验证按钮图标
```

## 技术实现

### HTML (index.html)

页面结构包含：
- 标题区域
- 验证码显示区域（自动生成的验证码）
- 刷新按钮（用于重新生成验证码）
- 用户输入区域（用于输入验证码）
- 验证按钮（用于检查输入是否正确）
- 结果提示区域（显示验证成功或失败）

### CSS (style.css)

- 使用Poppins字体提升视觉效果
- 蓝色背景配合白色卡片式容器，视觉效果清新
- 响应式布局，确保在不同设备上都能良好显示
- 精心设计的输入框和按钮样式，提升用户体验

### JavaScript (script.js)

- **generateCaptcha()函数**：生成随机验证码
  - 使用Math.random()和toString(36)方法生成包含数字和小写字母的随机字符串
  - 随机选择1-3个字母转换为大写，增加验证码复杂度
  - 在页面加载时自动调用，生成初始验证码
  
- **checkCaptcha()函数**：验证用户输入
  - 比较用户输入与生成的验证码是否完全匹配
  - 根据验证结果显示相应的成功或失败提示

## 使用方法

1. 打开index.html文件，页面会自动生成一个随机验证码
2. 在输入框中输入您看到的验证码（注意大小写）
3. 点击验证按钮（✓图标）检查输入是否正确
4. 如需重新生成验证码，点击刷新按钮（↻图标）
5. 验证结果会显示在输入框下方

## 扩展与优化方向

- 增加验证码难度，如添加干扰线、背景噪点等
- 添加声音验证码功能，支持听觉辅助
- 实现验证码过期机制，增强安全性
- 添加更多样式选项，适应不同网站风格
- 集成到后端验证系统，实现真正的安全验证

## 浏览器兼容性

该应用兼容所有现代浏览器，包括但不限于：
- Chrome
- Firefox
- Safari
- Edge

## 许可证

MIT许可证 