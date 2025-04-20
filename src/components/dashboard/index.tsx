import React from 'react';
import { useTradeStore } from '@/lib/store/trade-store';

interface Strategy {
  running: boolean;
  // 其他策略属性
}

interface Spread {
  active: boolean;
  // 其他价差属性
}

interface Position {
  volume: number;
  // 其他持仓属性
}

interface Trade {
  volume: number;
  // 其他交易属性
}

export function Dashboard() {
  const { 
    spreads = [] as Spread[], 
    positions = [] as Position[],
    strategies = [] as Strategy[],
    latestTrades = [] as Trade[], 
    isConnected = false
  } = useTradeStore();
  
  // 计算统计数据
  const activeStrategies = strategies.filter((s: Strategy) => s.running).length;
  const totalStrategies = strategies.length;
  const totalSpreads = spreads.length;
  const activeSpreads = spreads.filter((s: Spread) => s.active).length;
  const totalPositions = positions.reduce((sum: number, pos: Position) => sum + Math.abs(pos.volume), 0);
  const dailyVolume = latestTrades.reduce((sum: number, trade: Trade) => sum + trade.volume, 0);
  
  // 计算盈亏数据（示例数据，实际应从store获取）
  const dailyPnl = 12500; // 示例日盈亏
  const totalPnl = 45300; // 示例总盈亏
  const pnlChange = +2.3; // 示例盈亏变化百分比
  
  return (
    <div className="card bg-dark text-light border-secondary">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-speedometer2 me-2"></i>
          交易概览
        </h5>
        <span className={`badge ${isConnected ? 'bg-success' : 'bg-danger'}`}>
          <i className={`bi ${isConnected ? 'bi-wifi' : 'bi-wifi-off'} me-1`}></i>
          {isConnected ? '已连接' : '未连接'}
        </span>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {/* 策略统计 */}
          <div className="col-md-6 col-lg-3">
            <div className="card bg-dark bg-opacity-50 border-secondary h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="text-muted mb-1">活跃策略</h6>
                    <h3 className="mb-0">{activeStrategies}<span className="fs-6 text-muted">/{totalStrategies}</span></h3>
                  </div>
                  <div className="fs-1 text-primary">
                    <i className="bi bi-gear"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 价差统计 */}
          <div className="col-md-6 col-lg-3">
            <div className="card bg-dark bg-opacity-50 border-secondary h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="text-muted mb-1">监控价差</h6>
                    <h3 className="mb-0">{activeSpreads}<span className="fs-6 text-muted">/{totalSpreads}</span></h3>
                  </div>
                  <div className="fs-1 text-success">
                    <i className="bi bi-graph-up"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 仓位统计 */}
          <div className="col-md-6 col-lg-3">
            <div className="card bg-dark bg-opacity-50 border-secondary h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="text-muted mb-1">持仓量</h6>
                    <h3 className="mb-0">{totalPositions}<span className="fs-6 text-muted">手</span></h3>
                  </div>
                  <div className="fs-1 text-warning">
                    <i className="bi bi-box"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 成交统计 */}
          <div className="col-md-6 col-lg-3">
            <div className="card bg-dark bg-opacity-50 border-secondary h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="text-muted mb-1">当日成交</h6>
                    <h3 className="mb-0">{dailyVolume}<span className="fs-6 text-muted">手</span></h3>
                  </div>
                  <div className="fs-1 text-info">
                    <i className="bi bi-activity"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 盈亏展示 */}
          <div className="col-12">
            <div className="card bg-dark bg-opacity-50 border-secondary">
              <div className="card-body p-3">
                <div className="row align-items-center">
                  <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
                    <h6 className="text-muted mb-1">当日盈亏</h6>
                    <h3 className={dailyPnl >= 0 ? 'text-success' : 'text-danger'}>
                      {dailyPnl >= 0 ? '+' : ''}{dailyPnl.toLocaleString()}
                      <span className="fs-6 text-muted ms-1">元</span>
                    </h3>
                  </div>
                  <div className="col-md-4 text-center mb-3 mb-md-0">
                    <h6 className="text-muted mb-1">总盈亏</h6>
                    <h3 className={totalPnl >= 0 ? 'text-success' : 'text-danger'}>
                      {totalPnl >= 0 ? '+' : ''}{totalPnl.toLocaleString()}
                      <span className="fs-6 text-muted ms-1">元</span>
                    </h3>
                  </div>
                  <div className="col-md-4 text-center text-md-end">
                    <h6 className="text-muted mb-1">日变化</h6>
                    <h3 className={pnlChange >= 0 ? 'text-success' : 'text-danger'}>
                      {pnlChange >= 0 ? '+' : ''}{pnlChange}%
                      <i className={`bi ${pnlChange >= 0 ? 'bi-arrow-up' : 'bi-arrow-down'} ms-2`}></i>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer text-center">
        <small className="text-muted">最后更新: {new Date().toLocaleTimeString()}</small>
      </div>
    </div>
  );
} 