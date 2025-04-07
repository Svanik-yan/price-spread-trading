import React from "react";
import { useTradeStore } from "@/lib/store/trade-store";

export function StrategyPanel() {
  const { 
    addLog 
  } = useTradeStore();

  // 模拟数据
  const mockData = [
    { id: "S001", name: "基础价差策略", type: "自动", status: "运行中", profit: "+1.25%", history: "详情" },
    { id: "S002", name: "动态对冲策略", type: "手动", status: "暂停", profit: "-0.32%", history: "详情" },
    { id: "S003", name: "波动率套利", type: "自动", status: "运行中", profit: "+0.87%", history: "详情" },
  ];

  const handleAction = (id: string, action: string) => {
    addLog(`策略${id}执行${action}操作`);
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover table-sm mb-0">
        <thead className="table-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">名称</th>
            <th scope="col">类型</th>
            <th scope="col">状态</th>
            <th scope="col">收益</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          {mockData.length > 0 ? (
            mockData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <span className={`badge ${item.type === "自动" ? "bg-primary" : "bg-info"}`}>
                    <i className={`bi ${item.type === "自动" ? "bi-robot" : "bi-person-fill"} me-1`}></i>
                    {item.type}
                  </span>
                </td>
                <td>
                  <span className={`badge ${item.status === "运行中" ? "bg-success" : "bg-warning"}`}>
                    <i className={`bi ${item.status === "运行中" ? "bi-play-fill" : "bi-pause-fill"} me-1`}></i>
                    {item.status}
                  </span>
                </td>
                <td className={item.profit.startsWith("+") ? "text-success" : "text-danger"}>
                  <i className={`bi ${item.profit.startsWith("+") ? "bi-graph-up-arrow" : "bi-graph-down-arrow"} me-1`}></i>
                  {item.profit}
                </td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button 
                      onClick={() => handleAction(item.id, item.status === "运行中" ? "暂停" : "启动")}
                      className={`btn ${item.status === "运行中" ? "btn-warning" : "btn-success"} btn-sm`}
                    >
                      <i className={`bi ${item.status === "运行中" ? "bi-pause-fill" : "bi-play-fill"}`}></i>
                    </button>
                    <button 
                      onClick={() => handleAction(item.id, "详情")}
                      className="btn btn-info btn-sm"
                    >
                      <i className="bi bi-info-circle"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-3">
                <span className="text-muted">暂无策略数据</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
