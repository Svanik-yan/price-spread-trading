import "./globals.css";
import { Inter } from "next/font/google";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "价差交易系统",
  description: "高性能价差交易平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-plus@2.5.6/dist/index.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/antd@5.15.2/dist/reset.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <div className="fixed -top-40 -right-40 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
        <div className="fixed -bottom-40 -left-40 w-96 h-96 bg-indigo-600 rounded-full opacity-20 blur-3xl"></div>
        <div className="fixed top-1/3 left-1/2 w-64 h-64 bg-pink-600 rounded-full opacity-10 blur-3xl"></div>
        
        <header className="el-header shadow-sm sticky top-0 bg-white border-b border-gray-200 py-4 px-6 z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-5 w-5 rounded bg-gradient-to-br from-blue-500 to-blue-600 mr-3"></div>
              <h1 className="text-xl font-bold text-[#409EFF]">AI价差交易系统</h1>
            </div>
            <div className="flex items-center space-x-5">
              <div className="flex items-center space-x-2 bg-[#ecf5ff] px-4 py-2 rounded">
                <span className="inline-block w-2 h-2 bg-[#67C23A] rounded-full"></span>
                <span className="text-sm text-[#606266]">系统在线</span>
              </div>
              <div className="flex items-center text-sm text-[#606266] px-4 py-2 rounded border border-[#DCDFE6]">
                <span>用户: Admin</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-5 relative z-10 mt-2">{children}</main>
        
        <footer className="el-footer border-t border-gray-200 py-3 px-6 text-center text-gray-500 text-xs bg-white">
          <p className="flex items-center justify-center gap-3">
            <span>© {new Date().getFullYear()} AI价差交易系统</span>
            <span className="inline-block w-1 h-1 bg-[#909399] rounded-full"></span>
            <span className="flex items-center">
              <span className="inline-block w-2 h-2 bg-[#67C23A] rounded-full mr-1.5"></span>
              算法版本 1.2.8
            </span>
            <span className="inline-block w-1 h-1 bg-[#909399] rounded-full"></span>
            <span>实时数据处理中</span>
          </p>
        </footer>
        
        {/* Bootstrap JS */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
