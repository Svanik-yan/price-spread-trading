import React, { useState } from "react";
import { useTradeStore } from "@/lib/store/trade-store";
import { PositionItem } from "@/types";

export function PositionPanel() {
  const { positions, updatePosition, closePosition, closeAllPositions, addLog } = useTradeStore();
  
  // 总盈亏计算
  const totalProfit = positions.reduce((sum, pos) => sum + pos.profit, 0);

  // 调整止盈止损操作
  const [showSettings, setShowSettings] = useState<string | null>(null);
  const [stopLoss, setStopLoss] = useState<number>(0);
  const [takeProfit, setTakeProfit] = useState<number>(0);

  const handleSettingsClick = (id: string, currentProfit: number) => {
    const position = positions.find(pos => pos.id === id);
    setShowSettings(showSettings === id ? null : id);
    
    // 如果已经设置过止盈止损，则使用已有的值
    if (position) {
      setStopLoss(position.stopLoss || currentProfit - 0.5);
      setTakeProfit(position.takeProfit || currentProfit + 1.0);
    } else {
      setStopLoss(currentProfit - 0.5);
      setTakeProfit(currentProfit + 1.0);
    }
  };

  const handleApplySettings = (id: string) => {
    updatePosition(id, { stopLoss, takeProfit });
    addLog(`已设置止盈点: ${takeProfit.toFixed(2)}, 止损点: ${stopLoss.toFixed(2)}`);
    setShowSettings(null);
  };

  // 处理平仓操作
  const handleClosePosition = (id: string) => {
    closePosition(id);
  };

  // 处理一键平仓
  const handleCloseAll = () => {
    if (positions.filter(p => p.status === "持有中").length > 0) {
      if (confirm("确定要平掉所有持仓吗？")) {
        closeAllPositions();
      }
    } else {
      addLog("当前没有可平仓的持仓");
    }
  };

  // 持仓状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "平仓中": return "warning";
      case "已平仓": return "secondary";
      default: return "primary";
    }
  };

  // 盈亏颜色
  const getProfitColor = (profit: number) => {
    if (profit > 0) return "success";
    if (profit < 0) return "danger";
    return "secondary";
  };

  // 筛选功能
  const [filter, setFilter] = useState<string>("全部");
  
  const filteredPositions = positions.filter(pos => {
    if (filter === "全部") return true;
    if (filter === "多头") return pos.direction === "多";
    if (filter === "空头") return pos.direction === "空";
    if (filter === "盈利") return pos.profit > 0;
    if (filter === "亏损") return pos.profit < 0;
    return true;
  });
  
  // 排序功能
  const [sortBy, setSortBy] = useState<string>("时间");
  
  const sortedPositions = [...filteredPositions].sort((a, b) => {
    if (sortBy === "时间") {
      return a.time.localeCompare(b.time);
    }
    if (sortBy === "盈亏") {
      return b.profit - a.profit;
    }
    if (sortBy === "价格") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="position-panel h-100 d-flex flex-column">
      {/* 持仓统计 - 精简头部 */}
      <div className="d-flex justify-content-between bg-dark bg-opacity-10 p-2 border-bottom">
        <div className="d-flex align-items-center">
          <div className="badge bg-primary me-1">{positions.length}</div>
          <small className="text-muted me-1 d-none d-sm-inline">持仓</small>
          <div className="dropdown">
            <button 
              className="btn btn-sm btn-outline-secondary border-0 py-0 px-1"
              type="button" 
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-filter"></i>
              <span className="d-none d-sm-inline ms-1">{filter}</span>
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item py-1" onClick={() => setFilter("全部")}>全部</button></li>
              <li><button className="dropdown-item py-1" onClick={() => setFilter("多头")}>多头</button></li>
              <li><button className="dropdown-item py-1" onClick={() => setFilter("空头")}>空头</button></li>
              <li><button className="dropdown-item py-1" onClick={() => setFilter("盈利")}>盈利</button></li>
              <li><button className="dropdown-item py-1" onClick={() => setFilter("亏损")}>亏损</button></li>
            </ul>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <span className={`badge bg-${getProfitColor(totalProfit)} me-1`}>
            {totalProfit > 0 ? "+" : ""}{totalProfit.toFixed(2)}
          </span>
          <div className="dropdown">
            <button 
              className="btn btn-sm btn-outline-secondary border-0 py-0 px-1"
              type="button" 
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-sort-down"></i>
              <span className="d-none d-sm-inline ms-1">{sortBy === "时间" ? "时" : sortBy === "盈亏" ? "盈" : "价"}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><button className="dropdown-item py-1" onClick={() => setSortBy("时间")}>按时间</button></li>
              <li><button className="dropdown-item py-1" onClick={() => setSortBy("盈亏")}>按盈亏</button></li>
              <li><button className="dropdown-item py-1" onClick={() => setSortBy("价格")}>按价格</button></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 持仓列表 - 优化滚动显示 */}
      <div className="position-list overflow-auto flex-grow-1">
        {sortedPositions.length === 0 ? (
          <div className="text-center py-3 text-muted">
            <i className="bi bi-inbox fs-5 d-block mb-1"></i>
            暂无持仓
          </div>
        ) : (
          sortedPositions.map(position => (
            <div key={position.id} className="position-item py-2 px-2 border-bottom">
              {/* 头部信息行 */}
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex align-items-center">
                  <span className={`badge bg-${position.direction === "多" ? "danger" : "success"} me-1`}>
                    {position.direction}
                  </span>
                  <span className="small fw-medium text-truncate" style={{ maxWidth: "120px" }}>
                    {position.spreadId}
                  </span>
                </div>
                <span className={`badge bg-${getStatusColor(position.status)}`}>
                  {position.status}
                </span>
              </div>
              
              {/* 中间信息行 - 响应式布局 */}
              <div className="row g-1 mb-1">
                <div className="col-4">
                  <div className="small text-muted fs-8">价格</div>
                  <div className="small">{position.price.toFixed(2)}</div>
                </div>
                <div className="col-4">
                  <div className="small text-muted fs-8">数量</div>
                  <div className="small">{position.volume}</div>
                </div>
                <div className="col-4">
                  <div className="small text-muted fs-8">时间</div>
                  <div className="small">{position.time}</div>
                </div>
              </div>
              
              {/* 底部信息行 */}
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="small text-muted me-1 fs-8">盈亏:</span>
                  <span className={`small fw-bold text-${getProfitColor(position.profit)}`}>
                    {position.profit > 0 ? "+" : ""}{position.profit.toFixed(2)}
                  </span>
                  {position.stopLoss && (
                    <small className="text-danger ms-1 fs-8">
                      SL:{position.stopLoss.toFixed(2)}
                    </small>
                  )}
                  {position.takeProfit && (
                    <small className="text-success ms-1 fs-8">
                      TP:{position.takeProfit.toFixed(2)}
                    </small>
                  )}
                </div>
                
                <div className="btn-group btn-group-sm">
                  <button 
                    className="btn btn-outline-primary py-0 px-1"
                    onClick={() => handleSettingsClick(position.id, position.profit)}
                    disabled={position.status !== "持有中"}
                  >
                    <i className="bi bi-gear-fill fs-8"></i>
                  </button>
                  <button 
                    className="btn btn-outline-danger py-0 px-1"
                    onClick={() => handleClosePosition(position.id)}
                    disabled={position.status !== "持有中"}
                  >
                    <i className="bi bi-x-circle-fill fs-8"></i>
                    <span className="d-none d-sm-inline ms-1">平仓</span>
                  </button>
                </div>
              </div>
              
              {/* 止盈止损设置面板 */}
              {showSettings === position.id && (
                <div className="mt-2 p-2 bg-light rounded">
                  <div className="row g-2 mb-2">
                    <div className="col-6">
                      <label className="form-label small mb-1 fs-8">止损点</label>
                      <div className="input-group input-group-sm">
                        <input 
                          type="number" 
                          className="form-control py-0"
                          value={stopLoss}
                          onChange={e => setStopLoss(parseFloat(e.target.value))}
                          step="0.01"
                        />
                        <span className="input-group-text py-0 fs-8">点位</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <label className="form-label small mb-1 fs-8">止盈点</label>
                      <div className="input-group input-group-sm">
                        <input 
                          type="number" 
                          className="form-control py-0"
                          value={takeProfit}
                          onChange={e => setTakeProfit(parseFloat(e.target.value))}
                          step="0.01"
                        />
                        <span className="input-group-text py-0 fs-8">点位</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button 
                      className="btn btn-sm btn-primary py-0 px-2"
                      onClick={() => handleApplySettings(position.id)}
                    >
                      应用
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* 底部操作栏 - 优化显示 */}
      <div className="position-footer bg-dark bg-opacity-10 p-2 border-top d-flex justify-content-between align-items-center">
        <div className="btn-group btn-group-sm">
          <button 
            className="btn btn-outline-secondary py-0 px-2"
            type="button"
            data-bs-toggle="dropdown"
          >
            <i className="bi bi-funnel fs-8"></i>
            <span className="d-none d-sm-inline ms-1">筛选</span>
          </button>
          <div className="dropdown-menu">
            <button className="dropdown-item py-1" onClick={() => setFilter("全部")}>全部</button>
            <button className="dropdown-item py-1" onClick={() => setFilter("多头")}>多头</button>
            <button className="dropdown-item py-1" onClick={() => setFilter("空头")}>空头</button>
            <button className="dropdown-item py-1" onClick={() => setFilter("盈利")}>盈利</button>
            <button className="dropdown-item py-1" onClick={() => setFilter("亏损")}>亏损</button>
          </div>
        </div>
        <button 
          className="btn btn-outline-danger btn-sm py-0 px-2"
          onClick={handleCloseAll}
          disabled={positions.filter(p => p.status === "持有中").length === 0}
        >
          <i className="bi bi-x-circle fs-8"></i>
          <span className="d-none d-sm-inline ms-1">全部平仓</span>
        </button>
      </div>
    </div>
  );
} 