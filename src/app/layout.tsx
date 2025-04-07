import "./globals.css";
import { Inter } from "next/font/google";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI价差交易系统 | 智能量化交易平台",
  description: "基于人工智能的下一代价差交易系统，支持自动化策略执行和实时数据分析",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      </head>
      <body className={inter.className}>
        <div className="fixed -top-40 -right-40 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
        <div className="fixed -bottom-40 -left-40 w-96 h-96 bg-indigo-600 rounded-full opacity-20 blur-3xl"></div>
        <div className="fixed top-1/3 left-1/2 w-64 h-64 bg-pink-600 rounded-full opacity-10 blur-3xl"></div>
        
        <header className="glass-header sticky top-0 py-3 px-6 z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-5 w-5 rounded bg-gradient-to-br from-indigo-500 to-purple-500 mr-3"></div>
              <h1 className="text-xl font-bold gradient-text">AI价差交易系统</h1>
            </div>
            <div className="flex items-center space-x-5">
              <div className="flex items-center space-x-2 bg-opacity-30 bg-indigo-900 px-3 py-1.5 rounded-full">
                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-slate-200">系统在线</span>
              </div>
              <span className="text-sm text-slate-300 px-3 py-1.5 rounded-full bg-opacity-20 bg-slate-700">用户: Admin</span>
            </div>
          </div>
        </header>
        
        <main className="p-5 relative z-10 mt-2">{children}</main>
        
        <footer className="glass-header border-t border-indigo-500 border-opacity-20 py-3 px-6 text-center text-slate-400 text-xs">
          <p className="flex items-center justify-center gap-3">
            <span>© {new Date().getFullYear()} AI价差交易系统</span>
            <span className="inline-block w-1 h-1 bg-indigo-500 rounded-full"></span>
            <span className="flex items-center">
              <span className="inline-block w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-1.5"></span>
              算法版本 1.2.8
            </span>
            <span className="inline-block w-1 h-1 bg-indigo-500 rounded-full"></span>
            <span>实时数据处理中</span>
          </p>
        </footer>
        
        {/* Bootstrap JS */}
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
