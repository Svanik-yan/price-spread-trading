import React, { useState, useEffect } from 'react';
import { useTradeStore } from '@/lib/store/trade-store';

// 系统指标接口
interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  networkLatency: number;
  messageRate: number;
  uptime: number;
}

export function SystemStatus() {
  const { isInitialized, isRunning, isConnected, spreadItems, logs } = useTradeStore();
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsage: 0,
    memoryUsage: 0,
    networkLatency: 0,
    messageRate: 0,
    uptime: 0
  });
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // 模拟系统指标更新
  useEffect(() => {
    const interval = setInterval(() => {
      // 真实系统应该从API获取这些数据，而不是使用随机数
      // 但现在我们使用更合理的随机数据，并将其与系统状态相关联
      
      // 当系统运行时，CPU和内存使用率更高
      const baseCpuUsage = isRunning ? 25 : 10;
      const baseMemoryUsage = isRunning ? 35 : 15;
      
      // 消息速率仅在系统运行时有意义
      const baseMessageRate = isRunning ? 50 + spreadItems.length * 5 : 0;
      
      // 网络延迟取决于是否连接
      const baseNetworkLatency = isConnected ? 15 : 500;
      
      setMetrics({
        cpuUsage: baseCpuUsage + Math.random() * 10,
        memoryUsage: baseMemoryUsage + Math.random() * 15,
        networkLatency: baseNetworkLatency + Math.random() * 20,
        messageRate: baseMessageRate + Math.random() * 20,
        uptime: metrics.uptime + 3
      });
      setLastUpdated(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, [isRunning, isConnected, spreadItems.length, metrics.uptime]);

  // 格式化运行时间
  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${days > 0 ? days + "天 " : ""}${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // 根据指标值确定状态颜色
  const getStatusColor = (value: number, thresholds: { warning: number; danger: number }): string => {
    if (value >= thresholds.danger) return "danger";
    if (value >= thresholds.warning) return "warning";
    return "success";
  };

  // 确定网络延迟颜色
  const getLatencyColor = (value: number): string => {
    if (value > 100) return "danger";
    if (value > 50) return "warning";
    return "success";
  };

  // 确定系统整体状态
  const getSystemStatusLabel = (): { text: string; color: string } => {
    if (!isConnected) return { text: "离线", color: "danger" };
    if (!isInitialized) return { text: "未初始化", color: "warning" };
    if (isRunning) return { text: "运行中", color: "success" };
    return { text: "已就绪", color: "info" };
  };

  const systemStatus = getSystemStatusLabel();

  return (
    <div className="d-flex flex-column h-100">
      {/* 系统状态头部 */}
      <div className={`bg-${systemStatus.color} bg-opacity-10 p-2 border-bottom text-center d-flex align-items-center justify-content-center`}>
        <i className={`bi bi-${isRunning ? "play-circle" : isConnected ? "pause-circle" : "x-circle"} me-2 fs-5`}></i>
        <span className={`text-${systemStatus.color} fw-bold`}>
          {systemStatus.text}
        </span>
      </div>

      {/* 主要指标 - 使用两列网格布局 */}
      <div className="p-2 flex-grow-1 overflow-auto">
        <div className="row g-2">
          {/* CPU使用率 */}
          <div className="col-6">
            <div className="card border-0 h-100">
              <div className="card-body p-2 text-center">
                <div className="small text-muted mb-1 fs-8">CPU使用率</div>
                <div className={`fs-6 fw-bold text-${getStatusColor(metrics.cpuUsage, { warning: 70, danger: 90 })}`}>
                  {metrics.cpuUsage.toFixed(1)}%
                </div>
                <div className="progress mt-1" style={{ height: "4px" }}>
                  <div
                    className={`progress-bar bg-${getStatusColor(metrics.cpuUsage, {
                      warning: 70,
                      danger: 90
                    })}`}
                    style={{ width: `${metrics.cpuUsage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 内存使用率 */}
          <div className="col-6">
            <div className="card border-0 h-100">
              <div className="card-body p-2 text-center">
                <div className="small text-muted mb-1 fs-8">内存使用率</div>
                <div className={`fs-6 fw-bold text-${getStatusColor(metrics.memoryUsage, { warning: 75, danger: 90 })}`}>
                  {metrics.memoryUsage.toFixed(1)}%
                </div>
                <div className="progress mt-1" style={{ height: "4px" }}>
                  <div
                    className={`progress-bar bg-${getStatusColor(metrics.memoryUsage, {
                      warning: 75,
                      danger: 90
                    })}`}
                    style={{ width: `${metrics.memoryUsage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* 网络延迟 */}
          <div className="col-6">
            <div className="card border-0 h-100">
              <div className="card-body p-2 text-center">
                <div className="small text-muted mb-1 fs-8">网络延迟</div>
                <div className={`fs-6 fw-bold text-${getLatencyColor(metrics.networkLatency)}`}>
                  {metrics.networkLatency.toFixed(1)} ms
                </div>
                <span className={`badge bg-${getLatencyColor(metrics.networkLatency)} bg-opacity-10 
                  text-${getLatencyColor(metrics.networkLatency)} w-100 mt-1 fs-8`}>
                  {metrics.networkLatency < 30 ? "极佳" : metrics.networkLatency < 80 ? "良好" : "延迟较高"}
                </span>
              </div>
            </div>
          </div>
          
          {/* 消息速率 */}
          <div className="col-6">
            <div className="card border-0 h-100">
              <div className="card-body p-2 text-center">
                <div className="small text-muted mb-1 fs-8">消息速率</div>
                <div className={`fs-6 fw-bold ${isRunning ? "text-primary" : "text-muted"}`}>
                  {metrics.messageRate.toFixed(0)} 条/秒
                </div>
                <span className={`badge ${isRunning ? "bg-primary bg-opacity-10 text-primary" : "bg-secondary bg-opacity-10 text-secondary"} w-100 mt-1 fs-8`}>
                  {isRunning ? "正常" : "已暂停"}
                </span>
              </div>
            </div>
          </div>

          {/* 价差数量 */}
          <div className="col-6">
            <div className="card border-0 h-100">
              <div className="card-body p-2 text-center">
                <div className="small text-muted mb-1 fs-8">价差数量</div>
                <div className="fs-6 fw-bold text-info">
                  {spreadItems.length}
                </div>
                <span className="badge bg-info bg-opacity-10 text-info w-100 mt-1 fs-8">
                  {spreadItems.length > 0 ? `${spreadItems.length}个价差` : "暂无价差"}
                </span>
              </div>
            </div>
          </div>

          {/* 运行时间 */}
          <div className="col-6">
            <div className="card border-0 h-100">
              <div className="card-body p-2 text-center">
                <div className="small text-muted mb-1 fs-8">运行时间</div>
                <div className="fs-6 fw-bold text-success">
                  {formatUptime(metrics.uptime)}
                </div>
                <span className="badge bg-success bg-opacity-10 text-success w-100 mt-1 fs-8">
                  {isInitialized ? "已初始化" : "未初始化"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部状态栏 */}
      <div className="bg-dark bg-opacity-10 p-2 border-top d-flex justify-content-between align-items-center">
        <div>
          <span className={`badge bg-${isConnected ? "success" : "danger"} me-1 p-1`}>
            <i className={`bi bi-${isConnected ? "wifi" : "wifi-off"} fs-8`}></i>
          </span>
          <small className="text-muted fs-8">
            {isConnected ? "连接正常" : "连接断开"}
          </small>
        </div>
        <div>
          <small className="text-muted fs-8">
            {lastUpdated.toLocaleTimeString()}
          </small>
        </div>
      </div>
    </div>
  );
} 