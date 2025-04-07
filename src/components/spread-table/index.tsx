import React, { useEffect } from "react";
import { useTradeStore } from "@/lib/store/trade-store";

export function SpreadTable() {
  const { spreadItems, addSpreadItem } = useTradeStore();

  // 模拟数据加载
  useEffect(() => {
    const mockData = [
      {
        id: "1",
        name: "IF2306-IF2307",
        buyVolume: 1,
        buyPrice: 3456.2,
        sellPrice: 3457.8,
        sellVolume: 1,
        netPosition: 0,
        time: "09:45:32",
        fixedPrice: 3456.5
      },
      {
        id: "2",
        name: "IF2306-IF2309",
        buyVolume: 2,
        buyPrice: 3452.4,
        sellPrice: 3454.6,
        sellVolume: 2,
        netPosition: 0,
        time: "09:46:15",
        fixedPrice: 3453.2
      }
    ];
    
    mockData.forEach(item => {
      addSpreadItem(item);
    });
  }, [addSpreadItem]);

  return (
    <div className="bg-white rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table table-striped table-hover table-sm mb-0">
          <thead className="table-light">
            <tr>
              <th className="py-2 px-4 text-left">名称</th>
              <th className="py-2 px-4 text-right">买量</th>
              <th className="py-2 px-4 text-right">买价</th>
              <th className="py-2 px-4 text-right">卖价</th>
              <th className="py-2 px-4 text-right">卖量</th>
              <th className="py-2 px-4 text-right">净仓</th>
              <th className="py-2 px-4 text-right">时间</th>
              <th className="py-2 px-4 text-right">定价</th>
            </tr>
          </thead>
          <tbody>
            {spreadItems.map((item) => (
              <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-100">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4 text-right">{item.buyVolume}</td>
                <td className="py-2 px-4 text-right text-success">{item.buyPrice.toFixed(2)}</td>
                <td className="py-2 px-4 text-right text-danger">{item.sellPrice.toFixed(2)}</td>
                <td className="py-2 px-4 text-right">{item.sellVolume}</td>
                <td className="py-2 px-4 text-right">{item.netPosition}</td>
                <td className="py-2 px-4 text-right">{item.time}</td>
                <td className="py-2 px-4 text-right">{item.fixedPrice.toFixed(2)}</td>
              </tr>
            ))}
            {spreadItems.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4 text-muted">
                  暂无数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 