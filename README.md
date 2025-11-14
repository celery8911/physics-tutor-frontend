# 物理解题助手 - 前端

一个基于 React + TypeScript + Tailwind CSS 的物理解题助手聊天界面。

## 功能特性

- 💬 实时聊天界面
- 📝 支持文本输入物理题目
- 📷 支持上传物理题目图片
- 🤖 AI 智能解答，包含答案、考点和详细解析
- 🎨 现代化 UI 设计，响应式布局

## 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Vite** - 构建工具
- **Axios** - HTTP 客户端
- **Lucide React** - 图标库

## 快速开始

### 1. 安装依赖

\`\`\`bash
npm install
\`\`\`

### 2. 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

应用将在 http://localhost:3000 启动

### 3. 确保后端服务运行

前端通过代理连接到后端 API（默认 http://localhost:4111）

## 项目结构

\`\`\`
src/
├── components/          # React 组件
│   ├── ChatInterface.tsx    # 主聊天界面
│   ├── MessageBubble.tsx    # 消息气泡组件
│   └── MessageInput.tsx     # 消息输入组件
├── services/           # API 服务
│   └── api.ts          # API 调用封装
├── types.ts            # TypeScript 类型定义
├── App.tsx             # 应用入口组件
├── main.tsx            # 应用入口文件
└── index.css           # 全局样式
\`\`\`

## 构建生产版本

\`\`\`bash
npm run build
\`\`\`

构建产物将输出到 `dist/` 目录。

## 预览生产版本

\`\`\`bash
npm run preview
\`\`\`

## API 接口

前端通过以下 API 与后端通信：

- `POST /api/physics/ask` - 发送物理题目并获取解答
  - 请求体：`{ problemText?: string, imageBase64?: string }`
  - 响应：`{ text: string }`

## 使用说明

1. **输入文字题目**：在输入框中直接输入物理题目，按 Enter 发送
2. **上传图片**：点击图片图标，选择物理题目图片上传
3. **组合使用**：可以同时输入文字说明和上传图片
4. **查看解答**：AI 助手会返回包含答案、考点和详细解析的完整回复

## 开发说明

- 使用 `Shift + Enter` 在输入框中换行
- 图片自动转换为 Base64 格式发送
- 支持 JPG、PNG 等常见图片格式
- 最大图片预览高度为 128px

## License

MIT
