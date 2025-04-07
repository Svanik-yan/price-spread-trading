#!/bin/bash

# 价差交易系统部署脚本

# 构建项目
echo "开始构建项目..."
npm run build

# 检查构建是否成功
if [ $? -eq 0 ]; then
  echo "构建成功，准备部署..."
else
  echo "构建失败，请检查错误。"
  exit 1
fi

# 如果使用 Vercel，可以用以下命令部署
if command -v vercel &> /dev/null; then
  echo "使用 Vercel 部署..."
  vercel --prod
else
  echo "请安装 Vercel CLI 进行部署，或手动部署到您的服务器。"
  echo "安装 Vercel CLI: npm i -g vercel"
fi

echo "部署流程结束" 