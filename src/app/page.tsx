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

export default function Home() {
  // 控制初学者指南显示
  const [showGuide, setShowGuide] = useState(false);

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
      
      {/* 新手引导区域 - 条件渲染 */}
      {showGuide && (
        <div className="card mb-2 border-primary">
          <div className="card-body">
            <BeginnerGuide />
          </div>
        </div>
      )}
      
      {/* 仪表盘 */}
      <div className="row mb-2">
        <div className="col-12">
          <Dashboard />
        </div>
      </div>
      
      {/* 主体内容 */}
      <div className="row g-2">
        {/* 左侧交易和控制区 */}
        <div className="col-md-3">
          {/* 交易表单 */}
          <div className="card mb-2 shadow-sm">
            <div className="card-header bg-light py-2 border-bottom">
              <h5 className="card-title mb-0 text-primary d-flex align-items-center">
                <i className="bi bi-sliders me-2"></i>
                交易控制
                <span className="badge bg-primary ms-2 fs-8">开始此处</span>
              </h5>
            </div>
            <div className="card-body py-2">
              <TradeForm />
            </div>
          </div>

          {/* 策略控制区 */}
          <div className="card mb-2 shadow-sm">
            <div className="card-header bg-light py-2 border-bottom">
              <h5 className="card-title mb-0 text-primary">
                <i className="bi bi-gear-wide-connected me-2"></i>
                策略管理
              </h5>
            </div>
            <div className="card-body py-2">
              <StrategyControl />
            </div>
          </div>
          
          {/* 系统状态面板 */}
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <SystemStatus />
            </div>
          </div>
        </div>
        
        {/* 中央区域 */}
        <div className="col-md-6">
          {/* 价差数据区 */}
          <div className="card shadow-sm mb-2">
            <div className="card-header bg-light py-2 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0 text-primary">
                <i className="bi bi-bar-chart-line me-2"></i>
                价差数据
              </h5>
              <div className="d-flex align-items-center">
                <span className="badge bg-info me-2 d-flex align-items-center">
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
          <div className="card mb-2 shadow-sm">
            <div className="card-header bg-light py-2 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0 text-primary">
                <i className="bi bi-cpu me-2"></i>
                算法
              </h5>
              <span className="badge bg-primary d-flex align-items-center">
                <i className="bi bi-arrow-repeat me-1"></i>
                自动更新
              </span>
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
          <div className="card mb-2 shadow-sm">
            <div className="card-header bg-light py-2 border-bottom">
              <h5 className="card-title mb-0 text-primary">
                <i className="bi bi-gear me-2"></i>
                策略
              </h5>
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
          
          {/* 日志面板 */}
          <div className="card shadow-sm">
            <div className="card-header bg-light py-2 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0 text-primary">
                <i className="bi bi-journal-text me-2"></i>
                系统日志
              </h5>
              <span className="badge bg-success d-flex align-items-center">
                <i className="bi bi-activity me-1"></i>
                实时记录
              </span>
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
