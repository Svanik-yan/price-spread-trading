import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTradeStore } from "@/lib/store/trade-store";

export function TradeForm() {
  const { formData, updateFormData, addLog } = useTradeStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLog(`启动价差交易: ${formData.spread} ${formData.direction} ${formData.openClose} 价格:${formData.price} 数量:${formData.volume}`);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4 text-white">交易</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">价差</label>
          <Input 
            type="text"
            value={formData.spread}
            onChange={(e) => updateFormData({ spread: e.target.value })}
            placeholder="输入价差"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">方向</label>
          <Select
            value={formData.direction}
            onValueChange={(value: any) => updateFormData({ direction: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择方向" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="多">多</SelectItem>
              <SelectItem value="空">空</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">开平</label>
          <Select
            value={formData.openClose}
            onValueChange={(value: any) => updateFormData({ openClose: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择开平" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="开">开</SelectItem>
              <SelectItem value="平">平</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">价格</label>
          <Input 
            type="number" 
            value={formData.price}
            onChange={(e) => updateFormData({ price: parseFloat(e.target.value) || 0 })}
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">数量</label>
          <Input 
            type="number" 
            value={formData.volume}
            onChange={(e) => updateFormData({ volume: parseInt(e.target.value) || 1 })}
            min={1}
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">超价</label>
          <Input 
            type="number" 
            value={formData.limitPrice}
            onChange={(e) => updateFormData({ limitPrice: parseFloat(e.target.value) || 0 })}
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">间隔</label>
          <Input 
            type="number" 
            value={formData.interval}
            onChange={(e) => updateFormData({ interval: parseInt(e.target.value) || 0 })}
            min={0}
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">颜色</label>
          <Select
            value={formData.color}
            onValueChange={(value: any) => updateFormData({ color: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="是否显示颜色" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="是">是</SelectItem>
              <SelectItem value="否">否</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button type="submit" className="w-full">启动</Button>
      </form>
    </div>
  );
} 