import React from 'react';
import { useTradeStore } from '@/lib/store/trade-store';
import { Strategy, SpreadItem, PositionItem } from '@/types';

// 定义交易记录接口，因为types中未定义
// interface Trade {
//   volume: number;
// }

export function Dashboard() {
  const { 
    spreadItems: spreads = [], 
    positions = [],
    strategies = [],
    // isConnected = false
  } = useTradeStore();
  
  // 计算统计数据
  const activeStrategies = strategies.filter((s: Strategy) => s.isActive).length;
  const totalStrategies = strategies.length;
  const totalSpreads = spreads.length;
  const activeSpreads = spreads.filter((s: SpreadItem) => s.id !== "").length; // 假设id非空表示活跃
  const totalPositions = positions.reduce((sum: number, pos: PositionItem) => sum + Math.abs(pos.volume), 0);
  
  // 模拟成交量数据（实际应从store获取）
  const dailyVolume = 12;
  
  // 计算盈亏数据（示例数据，实际应从store获取）
  const dailyPnl = 12500; // 示例日盈亏
  const totalPnl = 45300; // 示例总盈亏
  const pnlChange = +2.3; // 示例盈亏变化百分比
  
  return (
    <div className="dashboard-container">
      <div className="row g-2 p-2">
        {/* 策略统计 */}
        <div className="col-6">
          <div className="d-flex flex-column h-100 p-2 bg-dark bg-opacity-50 rounded border border-secondary">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">活跃策略</small>
                <h6 className="mb-0">{activeStrategies}<small className="text-muted fs-8">/{totalStrategies}</small></h6>
              </div>
              <div className="text-primary">
                <i className="bi bi-gear fs-5"></i>
              </div>
            </div>
          </div>
        </div>
        
        {/* 价差统计 */}
        <div className="col-6">
          <div className="d-flex flex-column h-100 p-2 bg-dark bg-opacity-50 rounded border border-secondary">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">监控价差</small>
                <h6 className="mb-0">{activeSpreads}<small className="text-muted fs-8">/{totalSpreads}</small></h6>
              </div>
              <div className="text-success">
                <i className="bi bi-graph-up fs-5"></i>
              </div>
            </div>
          </div>
        </div>
        
        {/* 仓位统计 */}
        <div className="col-6">
          <div className="d-flex flex-column h-100 p-2 bg-dark bg-opacity-50 rounded border border-secondary">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">持仓量</small>
                <h6 className="mb-0">{totalPositions}<small className="text-muted fs-8">手</small></h6>
              </div>
              <div className="text-warning">
                <i className="bi bi-box fs-5"></i>
              </div>
            </div>
          </div>
        </div>
        
        {/* 成交统计 */}
        <div className="col-6">
          <div className="d-flex flex-column h-100 p-2 bg-dark bg-opacity-50 rounded border border-secondary">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">当日成交</small>
                <h6 className="mb-0">{dailyVolume}<small className="text-muted fs-8">手</small></h6>
              </div>
              <div className="text-info">
                <i className="bi bi-activity fs-5"></i>
              </div>
            </div>
          </div>
        </div>
        
        {/* 盈亏展示 */}
        <div className="col-12">
          <div className="d-flex p-2 bg-dark bg-opacity-50 rounded border border-secondary">
            <div className="row w-100">
              <div className="col-4 text-center">
                <small className="text-muted d-block">当日盈亏</small>
                <span className={`fw-bold ${dailyPnl >= 0 ? 'text-success' : 'text-danger'}`}>
                  {dailyPnl >= 0 ? '+' : ''}{dailyPnl.toLocaleString()}
                </span>
              </div>
              <div className="col-4 text-center">
                <small className="text-muted d-block">总盈亏</small>
                <span className={`fw-bold ${totalPnl >= 0 ? 'text-success' : 'text-danger'}`}>
                  {totalPnl >= 0 ? '+' : ''}{totalPnl.toLocaleString()}
                </span>
              </div>
              <div className="col-4 text-center">
                <small className="text-muted d-block">日变化</small>
                <span className={`fw-bold ${pnlChange >= 0 ? 'text-success' : 'text-danger'}`}>
                  {pnlChange >= 0 ? '+' : ''}{pnlChange}%
                  <i className={`bi ${pnlChange >= 0 ? 'bi-arrow-up' : 'bi-arrow-down'} ms-1`}></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-footer text-center p-1 border-top border-secondary">
        <small className="text-muted fs-8">最后更新: {new Date().toLocaleTimeString()}</small>
      </div>
    </div>
  );
} 