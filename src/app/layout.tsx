import "./globals.css";

export const metadata = {
  title: "价差交易系统",
  description: "一个基于Next.js的价差交易系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-950 min-h-screen">
        <div className="container mx-auto py-6 px-4 max-w-7xl">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-white">价差交易系统</h1>
          </header>
          <main>{children}</main>
          <footer className="mt-12 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} 价差交易系统 - AI风格界面</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
