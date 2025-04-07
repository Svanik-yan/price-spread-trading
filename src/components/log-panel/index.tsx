import React, { useState } from "react";
import { useTradeStore } from "@/lib/store/trade-store";

export function LogPanel() {
  const { logs } = useTradeStore();
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;
  
  // 计算总页数
  const totalPages = Math.max(1, Math.ceil(logs.length / logsPerPage));
  
  // 获取当前页的日志
  const getCurrentLogs = () => {
    const startIndex = (currentPage - 1) * logsPerPage;
    const endIndex = startIndex + logsPerPage;
    return logs.slice(startIndex, endIndex);
  };
  
  // 处理页码变化
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // 当前页显示的日志
  const currentLogs = getCurrentLogs();

  return (
    <div className="bg-white rounded-md overflow-hidden">
      <div className="h-40 overflow-y-auto p-3 bg-light text-dark font-mono text-sm">
        {currentLogs.map((log, index) => (
          <div key={index} className="mb-1">
            <span className="text-secondary">{log.time}</span> <span className="text-dark">{log.message}</span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-muted">暂无日志记录</div>
        )}
      </div>
      
      {/* 分页控制 */}
      {logs.length > 0 && (
        <div className="d-flex justify-content-between align-items-center bg-light border-top px-2 py-1">
          <div className="small text-dark">
            第 {currentPage} / {totalPages} 页
          </div>
          <div className="btn-group btn-group-sm">
            <button 
              className="btn btn-light text-dark border" 
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              <i className="bi bi-chevron-double-left"></i>
            </button>
            <button 
              className="btn btn-light text-dark border" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button 
              className="btn btn-light text-dark border" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
            <button 
              className="btn btn-light text-dark border" 
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <i className="bi bi-chevron-double-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 