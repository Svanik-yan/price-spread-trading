"use client";

import { useState } from "react";
import { TradeForm } from "@/components/trade-form";
import { SpreadTable } from "@/components/spread-table";
import { LogPanel } from "@/components/log-panel";
import { StrategyPanel } from "@/components/strategy";
import { AlgorithmPanel } from "@/components/algorithm";
import { StrategyControl } from "@/components/strategy-control";
import { BeginnerGuide } from "@/components/beginner-guide";
import { SystemStatus } from "@/components/system-status";
import { Dashboard } from "@/components/dashboard";
import { StepGuide } from "@/components/step-guide";
import { HelpIcon } from "@/components/context-help";

export default function Home() {
  // 控制初学者指南显示和当前活动步骤
  const [showGuide, setShowGuide] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // 处理步骤点击
  const handleStepClick = (step: number) => {
    setActiveStep(step);
    // 根据步骤自动滚动到相应区域
    const elementMap: Record<number, string> = {
      1: "trade-form-section",
      2: "strategy-control-section",
      3: "spread-data-section",
      4: "system-status-section"
    };
    
    const element = document.getElementById(elementMap[step]);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container-fluid px-2 py-2" style={{ minHeight: 'calc(100vh - 3rem)' }}>
      {/* 顶部导航栏 */}
      <nav className="navbar navbar-expand-lg bg-light mb-2 rounded shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-primary">
            <i className="bi bi-graph-up-arrow text-primary me-2"></i>
            价差交易平台
          </span>
          
          <div className="d-flex align-items-center">
            {/* 新手指引按钮 */}
            <button onClick={() => setShowGuide(!showGuide)} className="btn btn-outline-primary me-3">
              <i className="bi bi-question-circle me-1"></i>
              {showGuide ? "关闭指引" : "新手指引"}
            </button>
            
            <div className="d-flex align-items-center me-3">
              <span className="badge bg-success rounded-circle p-1 me-1">
                <i className="bi bi-check-circle-fill"></i>
              </span>
              <small className="text-success">系统在线</small>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-success">
                <i className="bi bi-play-fill me-1"></i> 全部启动
              </button>
              <button className="btn btn-sm btn-danger">
                <i className="bi bi-stop-fill me-1"></i> 全部停止
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* 步骤引导区域 */}
      <div className="mb-2">
        <StepGuide activeStep={activeStep} onStepClick={handleStepClick} />
      </div>
      
      {/* 新手引导区域 - 条件渲染 */}
      {showGuide && (
        <div className="card mb-2 border-primary">
          <div className="card-body">
            <BeginnerGuide />
          </div>
        </div>
      )}
      
      {/* 仪表盘 */}
      <div className="row mb-3">
        <div className="col-12">
          <Dashboard />
        </div>
      </div>
      
      {/* 主体内容 */}
      <div className="row g-3">
        {/* 左侧交易和控制区 */}
        <div className="col-md-3">
          {/* 交易表单 */}
          <div id="trade-form-section" className="card mb-3 shadow-sm border-primary border-opacity-25">
            <div className="card-header bg-primary bg-opacity-10 py-2 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0 text-primary d-flex align-items-center">
                <i className="bi bi-sliders me-2"></i>
                交易控制
                <span className="badge bg-primary ms-2 fs-8">第一步</span>
              </h5>
              <HelpIcon title="交易控制" content="在此设置价差交易参数，完成后点击启动交易" />
            </div>
            <div className="card-body py-2">
              <TradeForm />
            </div>
          </div>

          {/* 策略控制区 */}
          <div id="strategy-control-section" className="card mb-3 shadow-sm border-primary border-opacity-25">
            <div className="card-header bg-primary bg-opacity-10 py-2 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0 text-primary">
                <i className="bi bi-gear-wide-connected me-2"></i>
                策略管理
                <span className="badge bg-primary ms-2 fs-8">第二步</span>
              </h5>
              <HelpIcon title="策略管理" content="选择并管理交易策略，控制策略运行状态" />
            </div>
            <div className="card-body py-2">
              <StrategyControl />
            </div>
          </div>
          
          {/* 系统状态面板 */}
          <div id="system-status-section" className="card shadow-sm border-info border-opacity-25">
            <div className="card-header bg-info bg-opacity-10 py-2 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0 text-info">
                <i className="bi bi-hdd-network me-2"></i>
                系统状态
                <span className="badge bg-info ms-2 fs-8">监控</span>
              </h5>
              <HelpIcon title="系统状态" content="实时监控系统运行状态、资源使用和性能指标" />
            </div>
            <div className="card-body p-0">
              <SystemStatus />
            </div>
          </div>
        </div>
        
        {/* 中央区域 */}
        <div className="col-md-6">
          {/* 价差数据区 */}
          <div id="spread-data-section" className="card shadow-sm mb-3 border-success border-opacity-25">
            <div className="card-header bg-success bg-opacity-10 py-2 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0 text-success">
                <i className="bi bi-bar-chart-line me-2"></i>
                价差数据
                <span className="badge bg-success ms-2 fs-8">第三步</span>
              </h5>
              <div className="d-flex align-items-center">
                <HelpIcon title="价差数据" content="显示所有价差的实时行情和交易数据" placement="left" />
                <span className="badge bg-info mx-2 d-flex align-items-center">
                  <i className="bi bi-arrow-repeat me-1"></i>
                  实时刷新
                </span>
                <select className="form-select form-select-sm" style={{ width: "120px" }}>
                  <option>按时间排序</option>
                  <option>按价格排序</option>
                </select>
              </div>
            </div>
            <div className="card-body p-0">
              <SpreadTable />
            </div>
            <div className="card-footer d-flex justify-content-between border-top py-2">
              <small className="text-muted">总数据: 12条</small>
              <div>
                <button className="btn btn-sm btn-primary me-2">
                  <i className="bi bi-arrow-clockwise me-1"></i>刷新
                </button>
                <button className="btn btn-sm btn-primary">
                  <i className="bi bi-funnel me-1"></i>过滤
                </button>
              </div>
            </div>
          </div>
          
          {/* 算法模块 */}
          <div className="card mb-3 shadow-sm border-warning border-opacity-25">
            <div className="card-header bg-warning bg-opacity-10 py-2 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0 text-warning">
                <i className="bi bi-cpu me-2"></i>
                算法
              </h5>
              <div className="d-flex align-items-center">
                <HelpIcon title="交易算法" content="自动交易算法配置和管理" placement="left" />
                <span className="badge bg-primary ms-2 d-flex align-items-center">
                  <i className="bi bi-arrow-repeat me-1"></i>
                  自动更新
                </span>
              </div>
            </div>
            <div className="card-body p-0">
              <AlgorithmPanel />
            </div>
            <div className="card-footer d-flex justify-content-between border-top py-2">
              <small className="text-muted">总算法: 3个</small>
              <div>
                <button className="btn btn-sm btn-primary me-2">
                  <i className="bi bi-plus-lg me-1"></i>添加
                </button>
                <button className="btn btn-sm btn-danger">
                  <i className="bi bi-trash me-1"></i>删除
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* 右侧面板区域 */}
        <div className="col-md-3">
          {/* 策略面板 */}
          <div className="card mb-3 shadow-sm border-warning border-opacity-25">
            <div className="card-header bg-warning bg-opacity-10 py-2 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0 text-warning">
                <i className="bi bi-gear me-2"></i>
                策略
                <span className="badge bg-warning ms-2 fs-8 text-dark">监控</span>
              </h5>
              <HelpIcon title="策略监控" content="显示策略运行状态和性能指标" placement="left" />
            </div>
            <div className="card-body p-0">
              <StrategyPanel />
            </div>
            <div className="card-footer d-flex justify-content-between border-top py-2">
              <small className="text-muted">总策略: 3个</small>
              <button className="btn btn-sm btn-primary">
                <i className="bi bi-gear-wide-connected me-1"></i>管理
              </button>
            </div>
          </div>
          
          {/* 持仓面板 */}
          <div id="position-panel-section" className="card mb-3 shadow-sm border-danger border-opacity-25">
            <div className="card-header bg-danger bg-opacity-10 py-2 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0 text-danger">
                <i className="bi bi-briefcase me-2"></i>
                持仓管理
                <span className="badge bg-danger ms-2 fs-8">第四步</span>
              </h5>
              <HelpIcon title="持仓管理" content="查看和管理当前持仓情况" placement="left" />
            </div>
            <div className="card-body p-2">
              <div className="alert alert-info bg-info bg-opacity-10 mb-2 py-2">
                <small>
                  <i className="bi bi-info-circle me-1"></i>
                  当前无持仓，请完成交易后查看此区域
                </small>
              </div>
              <div className="list-group list-group-flush small">
                <div className="list-group-item bg-dark text-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>IF2306-IF2307</span>
                    <span className="badge bg-success">多头</span>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <small>数量: 2手</small>
                    <small className="text-success">+¥580</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between border-top py-2">
              <small className="text-muted">总持仓: 1个</small>
              <button className="btn btn-sm btn-danger">
                <i className="bi bi-dash-circle me-1"></i>一键平仓
              </button>
            </div>
          </div>
          
          {/* 日志面板 */}
          <div className="card shadow-sm border-secondary border-opacity-25">
            <div className="card-header bg-secondary bg-opacity-10 py-2 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0 text-secondary">
                <i className="bi bi-journal-text me-2"></i>
                系统日志
              </h5>
              <div className="d-flex align-items-center">
                <HelpIcon title="系统日志" content="记录系统运行和交易活动日志" placement="left" />
                <span className="badge bg-success ms-2 d-flex align-items-center">
                  <i className="bi bi-activity me-1"></i>
                  实时记录
                </span>
              </div>
            </div>
            <div className="card-body p-0">
              <LogPanel />
            </div>
            <div className="card-footer d-flex justify-content-between border-top py-2">
              <small className="text-muted">最近日志记录</small>
              <button className="btn btn-sm btn-primary">
                <i className="bi bi-trash me-1"></i>清除日志
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
