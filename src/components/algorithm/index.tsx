import React from "react";
import { useTradeStore } from "@/lib/store/trade-store";

export function AlgorithmPanel() {
  const { algorithmConfigs } = useTradeStore();
  
  // 模拟数据
  const mockData = [
    { id: "A001", spread: "CU2306-CU2307", direction: "多", openClose: "开", price: 120, volume: 10, status: "运行中" },
    { id: "A002", spread: "AL2306-AL2307", direction: "空", openClose: "平", price: 154, volume: 5, status: "暂停" },
    { id: "A003", spread: "RB2306-RB2307", direction: "多", openClose: "开", price: 87, volume: 8, status: "运行中" },
  ];

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover table-sm mb-0">
        <thead className="table-light">
          <tr>
            <th scope="col">算法</th>
            <th scope="col">价差</th>
            <th scope="col">方向</th>
            <th scope="col">开平</th>
            <th scope="col">价格</th>
            <th scope="col">数量</th>
            <th scope="col">状态</th>
          </tr>
        </thead>
        <tbody>
          {mockData.length > 0 ? (
            mockData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.spread}</td>
                <td className={item.direction === "多" ? "text-success" : "text-danger"}>
                  {item.direction === "多" ? 
                    <><i className="bi bi-arrow-up-circle-fill me-1"></i>{item.direction}</> : 
                    <><i className="bi bi-arrow-down-circle-fill me-1"></i>{item.direction}</>
                  }
                </td>
                <td className={item.openClose === "开" ? "text-primary" : "text-info"}>
                  {item.openClose}
                </td>
                <td>{item.price}</td>
                <td>{item.volume}</td>
                <td>
                  <span className={`badge ${item.status === "运行中" ? "bg-success" : "bg-warning"} text-white`}>
                    <i className={`bi ${item.status === "运行中" ? "bi-play-circle-fill" : "bi-pause-circle-fill"} me-1`}></i>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-3">
                <span className="text-muted">暂无算法数据</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}