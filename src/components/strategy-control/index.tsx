import React, { useState } from "react";
import { useTradeStore } from "@/lib/store/trade-store";

export function StrategyControl() {
  const { 
    currentStrategy, 
    isInitialized, 
    isRunning, 
    initialize, 
    startAll, 
    stopAll,
    addLog 
  } = useTradeStore();

  const [selectedStrategy, setSelectedStrategy] = useState("BasicSpreadStrategy");

  const handleAddStrategy = () => {
    addLog(`添加策略: ${selectedStrategy}`);
  };

  const handleInitialize = () => {
    initialize();
    addLog(`初始化策略: ${selectedStrategy}`);
  };

  const handleStartAll = () => {
    startAll();
    addLog("启动所有策略");
  };

  const handleStopAll = () => {
    stopAll();
    addLog("停止所有策略");
  };

  const handleCreateSpread = () => {
    addLog("创建价差");
  };

  const handleRemoveSpread = () => {
    addLog("移除价差");
  };

  return (
    <div className="strategy-control">
      {/* 策略选择 */}
      <div className="mb-3">
        <select 
          className="form-select form-select-sm bg-dark mb-2"
          value={selectedStrategy}
          onChange={(e) => setSelectedStrategy(e.target.value)}
        >
          <option value="BasicSpreadStrategy">BasicSpreadStrategy</option>
          <option value="DynamicHedgeStrategy">DynamicHedgeStrategy</option>
          <option value="VolatilityStrategy">VolatilityStrategy</option>
        </select>
        <button 
          className="btn btn-primary btn-sm w-100"
          onClick={handleAddStrategy}
        >
          <i className="bi bi-plus-lg me-1"></i>
          添加策略
        </button>
      </div>
      
      {/* 策略控制按钮 */}
      <div className="row mb-3 g-2">
        <div className="col-6">
          <button 
            className="btn btn-secondary btn-sm w-100"
            onClick={handleInitialize}
            disabled={isInitialized}
          >
            <i className="bi bi-lightning-charge me-1"></i>
            全部初始化
          </button>
        </div>
        <div className="col-6">
          <button 
            className="btn btn-success btn-sm w-100"
            onClick={handleStartAll}
            disabled={!isInitialized || isRunning}
          >
            <i className="bi bi-play-fill me-1"></i>
            全部启动
          </button>
        </div>
      </div>
      
      <div className="row g-2">
        <div className="col-6">
          <button 
            className="btn btn-info btn-sm w-100"
            onClick={handleCreateSpread}
          >
            <i className="bi bi-graph-up me-1"></i>
            创建价差
          </button>
        </div>
        <div className="col-6">
          <button 
            className="btn btn-danger btn-sm w-100"
            onClick={handleRemoveSpread}
          >
            <i className="bi bi-trash me-1"></i>
            移除价差
          </button>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12">
          <button 
            className="btn btn-danger btn-sm w-100"
            onClick={handleStopAll}
            disabled={!isRunning}
          >
            <i className="bi bi-stop-fill me-1"></i>
            全部停止
          </button>
        </div>
      </div>
    </div>
  );
} 