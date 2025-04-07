"use client";

import { TradeForm } from "@/components/trade-form";
import { SpreadTable } from "@/components/spread-table";
import { LogPanel } from "@/components/log-panel";
import { StrategyPanel } from "@/components/strategy";
import { AlgorithmPanel } from "@/components/algorithm";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 左侧交易栏 */}
      <div className="lg:col-span-3">
        <TradeForm />
      </div>
      
      {/* 中间内容区 */}
      <div className="lg:col-span-6 space-y-6">
        {/* 价差表格 */}
        <SpreadTable />
        
        {/* 日志面板 */}
        <LogPanel />
      </div>
      
      {/* 右侧策略和算法区 */}
      <div className="lg:col-span-3 space-y-6">
        <StrategyPanel />
        <AlgorithmPanel />
      </div>
    </div>
  );
}
