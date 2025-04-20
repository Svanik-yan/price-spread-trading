import React, { useState } from "react";
import { useTradeStore } from "@/lib/store/trade-store";
import { HelpIcon } from "../context-help";

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

  // 定义策略信息
  const strategyInfo = {
    "BasicSpreadStrategy": "基础价差策略，适用于常规价差交易",
    "DynamicHedgeStrategy": "动态对冲策略，实时调整对冲比例",
    "VolatilityStrategy": "波动率策略，基于波动率变化执行交易"
  };

  return (
    <div className="strategy-control">
      {/* 步骤提示 */}
      <div className="alert alert-primary py-2 d-flex align-items-center mb-3">
        <div className="bg-primary rounded-circle text-white d-flex justify-content-center align-items-center me-2" style={{ width: "24px", height: "24px" }}>2</div>
        <div className="small">选择并管理交易策略</div>
      </div>
      
      {/* 系统状态指示器 */}
      <div className="d-flex justify-content-between mb-3 px-1">
        <div className="d-flex align-items-center">
          <span className="me-2 small">系统状态:</span>
          <span className={`badge ${isInitialized ? 'bg-success' : 'bg-secondary'}`}>
            <i className={`bi ${isInitialized ? 'bi-check-circle' : 'bi-dash-circle'} me-1`}></i>
            初始化
          </span>
        </div>
        <div className="d-flex align-items-center">
          <span className={`badge ${isRunning ? 'bg-success' : 'bg-secondary'}`}>
            <i className={`bi ${isRunning ? 'bi-play-circle' : 'bi-pause-circle'} me-1`}></i>
            {isRunning ? '运行中' : '已停止'}
          </span>
        </div>
      </div>
      
      {/* 策略选择 */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <label className="form-label fw-bold small mb-0">选择策略</label>
          <HelpIcon title="交易策略" content="选择适合您交易风格的策略，不同策略有不同的风险收益特性" />
        </div>
        <select 
          className="form-select form-select-sm bg-dark text-light mb-2"
          value={selectedStrategy}
          onChange={(e) => setSelectedStrategy(e.target.value)}
        >
          <option value="BasicSpreadStrategy">基础价差策略</option>
          <option value="DynamicHedgeStrategy">动态对冲策略</option>
          <option value="VolatilityStrategy">波动率策略</option>
        </select>
        <div className="small text-info mb-2 ps-1">
          <i className="bi bi-info-circle me-1"></i>
          {strategyInfo[selectedStrategy as keyof typeof strategyInfo]}
        </div>
        <button 
          className="btn btn-primary btn-sm w-100 d-flex align-items-center justify-content-center"
          onClick={handleAddStrategy}
        >
          <i className="bi bi-plus-lg me-1"></i>
          添加策略
        </button>
      </div>
      
      {/* 操作流程提示 */}
      <div className="alert alert-dark bg-dark bg-opacity-75 border-light border-opacity-25 py-2 mb-3">
        <h6 className="mb-1 text-light"><i className="bi bi-lightbulb me-1"></i> 操作流程</h6>
        <ol className="ps-3 mb-0 small">
          <li className={isInitialized ? 'text-muted' : 'text-light'}>初始化策略</li>
          <li className={isRunning ? 'text-muted' : (!isInitialized ? 'text-muted' : 'text-light')}>启动策略</li>
          <li className={!isRunning ? 'text-muted' : 'text-light'}>监控交易</li>
        </ol>
      </div>
      
      {/* 策略控制按钮 */}
      <div className="row mb-3 g-2">
        <div className="col-6">
          <button 
            className={`btn ${isInitialized ? 'btn-outline-secondary' : 'btn-secondary'} btn-sm w-100`}
            onClick={handleInitialize}
            disabled={isInitialized}
          >
            <i className="bi bi-lightning-charge me-1"></i>
            <span>{isInitialized ? '已初始化' : '全部初始化'}</span>
          </button>
        </div>
        <div className="col-6">
          <button 
            className={`btn ${isRunning ? 'btn-outline-success' : 'btn-success'} btn-sm w-100`}
            onClick={handleStartAll}
            disabled={!isInitialized || isRunning}
          >
            <i className="bi bi-play-fill me-1"></i>
            <span>{isRunning ? '运行中' : '全部启动'}</span>
          </button>
        </div>
      </div>
      
      {/* 价差管理按钮 */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <label className="form-label fw-bold small mb-0">价差管理</label>
          <HelpIcon title="价差管理" content="创建或移除价差，价差是策略执行的基础" />
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
              className="btn btn-outline-danger btn-sm w-100"
              onClick={handleRemoveSpread}
            >
              <i className="bi bi-trash me-1"></i>
              移除价差
            </button>
          </div>
        </div>
      </div>

      {/* 紧急停止按钮 */}
      <div className="mt-3">
        <button 
          className="btn btn-danger btn-sm w-100 d-flex align-items-center justify-content-center py-2"
          onClick={handleStopAll}
          disabled={!isRunning}
        >
          <i className="bi bi-stop-fill me-1 fs-5"></i>
          <span>紧急停止</span>
        </button>
        <small className="text-danger text-center d-block mt-1">
          <i className="bi bi-exclamation-triangle me-1"></i>
          停止所有运行中的策略
        </small>
      </div>
    </div>
  );
} 