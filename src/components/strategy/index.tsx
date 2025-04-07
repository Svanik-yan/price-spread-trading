import React from "react";
import { Button } from "@/components/ui/button";
import { useTradeStore } from "@/lib/store/trade-store";

export function StrategyPanel() {
  const { 
    currentStrategy, 
    strategies,
    isInitialized, 
    isRunning, 
    initialize, 
    startAll, 
    stopAll,
    addLog 
  } = useTradeStore();

  const handleAddStrategy = () => {
    addLog("添加策略");
  };

  const handleInitialize = () => {
    initialize();
  };

  const handleStartAll = () => {
    startAll();
  };

  const handleStopAll = () => {
    stopAll();
  };

  return (
    <div className="bg-gray-900 p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4 text-white">策略</h2>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">当前策略:</span>
          <span className="text-white">{currentStrategy?.name || "无"}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <Button 
          className="w-full mb-2"
          onClick={handleAddStrategy}
        >
          添加策略
        </Button>
        
        <Button 
          className="w-full mb-2"
          onClick={handleInitialize}
          disabled={isInitialized}
        >
          全部初始化
        </Button>
        
        <Button 
          className="w-full mb-2"
          onClick={handleStartAll}
          disabled={!isInitialized || isRunning}
        >
          全部启动
        </Button>
        
        <Button 
          className="w-full mb-2"
          variant="destructive"
          onClick={handleStopAll}
          disabled={!isRunning}
        >
          全部停止
        </Button>
      </div>
    </div>
  );
}
