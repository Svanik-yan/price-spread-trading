import React, { useState, useEffect } from 'react';
import { useTradeStore } from '@/lib/store/trade-store';

interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  networkLatency: number;
  messageRate: number;
  uptime: number;
}

export function SystemStatus() {
  const { isConnected = false } = useTradeStore();
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsage: 0,
    memoryUsage: 0,
    networkLatency: 0,
    messageRate: 0,
    uptime: 0
  });
  
  // 模拟系统指标更新
  useEffect(() => {
    // 实际应用中，这里应该从后端API获取真实数据
    const interval = setInterval(() => {
      setMetrics({
        cpuUsage: Math.floor(Math.random() * 60) + 5, // 5-65%
        memoryUsage: Math.floor(Math.random() * 40) + 20, // 20-60%
        networkLatency: Math.floor(Math.random() * 50) + 10, // 10-60ms
        messageRate: Math.floor(Math.random() * 200) + 100, // 100-300 msgs/s
        uptime: metrics.uptime + 1 // 增加运行时间
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [metrics.uptime]);

  // 计算正常运行时间的格式化显示
  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) {
      return `${days}天${hours}小时`;
    } else if (hours > 0) {
      return `${hours}小时${minutes}分钟`;
    } else {
      return `${minutes}分钟`;
    }
  };

  // 根据值确定状态颜色
  const getStatusColor = (value: number, type: 'cpu' | 'memory' | 'latency') => {
    if (type === 'cpu') {
      return value < 30 ? 'success' : value < 70 ? 'warning' : 'danger';
    } else if (type === 'memory') {
      return value < 40 ? 'success' : value < 80 ? 'warning' : 'danger';
    } else {
      return value < 30 ? 'success' : value < 100 ? 'warning' : 'danger';
    }
  };

  return (
    <div className="card bg-dark text-light border-secondary h-100">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-hdd-network me-2"></i>
          系统状态
        </h5>
        <span className={`badge ${isConnected ? 'bg-success' : 'bg-danger'}`}>
          <i className={`bi ${isConnected ? 'bi-wifi' : 'bi-wifi-off'} me-1`}></i>
          {isConnected ? '已连接' : '未连接'}
        </span>
      </div>
      <div className="card-body p-2">
        <div className="row g-2">
          {/* CPU使用率 */}
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <div className="d-flex align-items-center">
                <i className="bi bi-cpu text-primary me-2"></i>
                <span>CPU使用率</span>
              </div>
              <span className={`badge bg-${getStatusColor(metrics.cpuUsage, 'cpu')}`}>{metrics.cpuUsage}%</span>
            </div>
            <div className="progress bg-secondary bg-opacity-25" style={{ height: '8px' }}>
              <div 
                className={`progress-bar bg-${getStatusColor(metrics.cpuUsage, 'cpu')}`} 
                style={{ width: `${metrics.cpuUsage}%` }}
              ></div>
            </div>
          </div>

          {/* 内存使用率 */}
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <div className="d-flex align-items-center">
                <i className="bi bi-memory text-primary me-2"></i>
                <span>内存使用率</span>
              </div>
              <span className={`badge bg-${getStatusColor(metrics.memoryUsage, 'memory')}`}>{metrics.memoryUsage}%</span>
            </div>
            <div className="progress bg-secondary bg-opacity-25" style={{ height: '8px' }}>
              <div 
                className={`progress-bar bg-${getStatusColor(metrics.memoryUsage, 'memory')}`} 
                style={{ width: `${metrics.memoryUsage}%` }}
              ></div>
            </div>
          </div>

          {/* 网络延迟 */}
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <div className="d-flex align-items-center">
                <i className="bi bi-speedometer2 text-primary me-2"></i>
                <span>网络延迟</span>
              </div>
              <span className={`badge bg-${getStatusColor(metrics.networkLatency, 'latency')}`}>{metrics.networkLatency} ms</span>
            </div>
            <div className="progress bg-secondary bg-opacity-25" style={{ height: '8px' }}>
              <div 
                className={`progress-bar bg-${getStatusColor(metrics.networkLatency, 'latency')}`} 
                style={{ width: `${Math.min(100, metrics.networkLatency)}%` }}
              ></div>
            </div>
          </div>

          {/* 消息处理速率和运行时间 */}
          <div className="col-12 mt-2">
            <div className="d-flex justify-content-between bg-dark bg-opacity-75 p-2 rounded border border-secondary">
              <div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-envelope text-info me-2"></i>
                  <small>消息速率</small>
                </div>
                <div className="fs-5 mt-1">{metrics.messageRate} <small className="text-muted">msgs/s</small></div>
              </div>
              <div className="border-start ps-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-clock-history text-warning me-2"></i>
                  <small>运行时间</small>
                </div>
                <div className="fs-5 mt-1">{formatUptime(metrics.uptime)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer text-center py-1">
        <small className="text-muted">最后更新: {new Date().toLocaleTimeString()}</small>
      </div>
    </div>
  );
} 