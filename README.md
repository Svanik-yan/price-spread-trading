# 价差交易系统

这是一个基于Next.js构建的现代化价差交易系统前端界面，采用AI风格设计，响应式布局，适合各种屏幕尺寸。

## 功能特点

- 实时价差交易表单
- 价差数据表格展示
- 交易策略管理
- 算法配置与监控
- 系统操作日志
- 深色主题现代界面

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand 状态管理
- Radix UI 组件库

## 本地开发

确保已安装Node.js 16+ 和npm，然后按照以下步骤操作：

```bash
# 克隆仓库
git clone https://github.com/yourusername/price-spread-trading.git
cd price-spread-trading

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 部署到Vercel

本项目可以轻松部署到Vercel平台：

1. 在GitHub上创建仓库并推送代码
2. 在Vercel上导入该GitHub项目
3. 点击部署，无需额外配置

## 项目结构

```
price-spread-trading/
├── src/
│   ├── app/               # 应用路由
│   │   ├── page.tsx      # 页面文件
│   │   └── api/          # API路由
│   ├── components/        # 组件目录
│   │   ├── ui/            # 基础UI组件
│   │   ├── trade-form/    # 交易表单组件
│   │   ├── spread-table/  # 价差表格组件
│   │   ├── algorithm/     # 算法相关组件
│   │   ├── strategy/      # 策略管理组件
│   │   └── log-panel/     # 日志面板组件
│   ├── lib/               # 工具函数和状态管理
│   └── types/             # TypeScript类型定义
├── public/                # 静态资源
├── next.config.js         # Next.js配置
└── tailwind.config.js     # Tailwind配置
```

## 许可证

MIT
