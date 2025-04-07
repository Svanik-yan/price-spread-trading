import React from "react";
import { useTradeStore } from "@/lib/store/trade-store";

export function LogPanel() {
  const { logs } = useTradeStore();

  return (
    <div className="bg-gray-900 rounded-md overflow-hidden">
      <h2 className="text-xl font-semibold p-4 text-white">日志</h2>
      <div className="h-40 overflow-y-auto p-4 bg-gray-950 text-white font-mono text-sm">
        {logs.map((log, index) => (
          <div key={index} className="mb-1">
            <span className="text-gray-500">{log.time}</span> <span>{log.message}</span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-gray-500">暂无日志记录</div>
        )}
      </div>
    </div>
  );
} 