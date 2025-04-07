import React from "react";
import { useTradeStore } from "@/lib/store/trade-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AlgorithmPanel() {
  const { algorithmConfigs } = useTradeStore();

  return (
    <div className="bg-gray-900 rounded-md overflow-hidden">
      <h2 className="text-xl font-semibold p-4 text-white">算法</h2>
      
      <Tabs defaultValue="table" className="px-4 pb-4">
        <TabsList className="mb-4">
          <TabsTrigger value="table">表格视图</TabsTrigger>
          <TabsTrigger value="chart">图表视图</TabsTrigger>
        </TabsList>
        
        <TabsContent value="table">
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead className="bg-gray-800">
                <tr>
                  <th className="py-2 px-4 text-left">算法</th>
                  <th className="py-2 px-4 text-left">价差</th>
                  <th className="py-2 px-4 text-center">方向</th>
                  <th className="py-2 px-4 text-right">开平</th>
                  <th className="py-2 px-4 text-right">数量</th>
                  <th className="py-2 px-4 text-right">状态</th>
                </tr>
              </thead>
              <tbody>
                {algorithmConfigs.length > 0 ? (
                  algorithmConfigs.map((config, index) => (
                    <tr key={index} className="border-t border-gray-800 hover:bg-gray-800/50">
                      <td className="py-2 px-4">{config.algorithm}</td>
                      <td className="py-2 px-4">{config.spread}</td>
                      <td className="py-2 px-4 text-center">{config.direction}</td>
                      <td className="py-2 px-4 text-right">{config.openPrice}</td>
                      <td className="py-2 px-4 text-right">{config.volume}</td>
                      <td className="py-2 px-4 text-right">{config.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      暂无算法配置
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="chart">
          <div className="h-64 flex items-center justify-center text-gray-500">
            图表视图尚未实现
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}