import React from "react";
import { useTradeStore } from "@/lib/store/trade-store";
import { Direction, OpenClose } from "@/types";

export function TradeForm() {
  const { formData, updateFormData, addLog } = useTradeStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLog(`🚀 价差引擎启动: ${formData.spread} ${formData.direction} ${formData.openClose} 价格:${formData.price} 数量:${formData.volume}`);
  };

  return (
    <form onSubmit={handleSubmit} className="px-1">
      {/* 价差 */}
      <div className="mb-2">
        <label htmlFor="spread" className="form-label fw-bold required-field small mb-1">价差</label>
        <input 
          type="text"
          id="spread"
          className="form-control form-control-sm bg-dark"
          value={formData.spread}
          onChange={(e) => updateFormData({ spread: e.target.value })}
          placeholder="输入价差代码"
          required
        />
      </div>
      
      {/* 交易方向和开平 */}
      <div className="row mb-2 g-2">
        <div className="col-6">
          <label htmlFor="direction" className="form-label fw-bold required-field small mb-1">方向</label>
          <select 
            id="direction"
            className="form-select form-select-sm bg-dark"
            value={formData.direction}
            onChange={(e) => updateFormData({ direction: e.target.value as Direction })}
            required
          >
            <option value="多" className="text-success fw-bold">多</option>
            <option value="空" className="text-danger fw-bold">空</option>
          </select>
        </div>
        
        <div className="col-6">
          <label htmlFor="openClose" className="form-label fw-bold required-field small mb-1">开平</label>
          <select 
            id="openClose"
            className="form-select form-select-sm bg-dark"
            value={formData.openClose}
            onChange={(e) => updateFormData({ openClose: e.target.value as OpenClose })}
            required
          >
            <option value="开" className="text-primary fw-bold">开</option>
            <option value="平" className="text-info fw-bold">平</option>
          </select>
        </div>
      </div>
      
      {/* 价格和数量 */}
      <div className="row mb-2 g-2">
        <div className="col-6">
          <label htmlFor="price" className="form-label fw-bold required-field small mb-1">价格</label>
          <input 
            type="number" 
            id="price"
            className="form-control form-control-sm bg-dark"
            value={formData.price}
            onChange={(e) => updateFormData({ price: parseFloat(e.target.value) || 0 })}
            required
          />
        </div>
        
        <div className="col-6">
          <label htmlFor="volume" className="form-label fw-bold required-field small mb-1">数量</label>
          <input 
            type="number" 
            id="volume"
            className="form-control form-control-sm bg-dark"
            value={formData.volume}
            onChange={(e) => updateFormData({ volume: parseInt(e.target.value) || 1 })}
            min={1}
            required
          />
        </div>
      </div>
      
      {/* 高级选项 */}
      <div className="card bg-navy mb-2">
        <div className="card-header d-flex justify-content-between align-items-center bg-dark-blue py-1">
          <h6 className="card-title mb-0 text-light small">高级选项</h6>
          <span className="badge bg-secondary">可选</span>
        </div>
        <div className="card-body py-2 px-2">
          <div className="row mb-2 g-2">
            <div className="col-6">
              <label htmlFor="limitPrice" className="form-label small mb-1">超价</label>
              <input 
                type="number" 
                id="limitPrice"
                className="form-control form-control-sm bg-dark"
                value={formData.limitPrice}
                onChange={(e) => updateFormData({ limitPrice: parseFloat(e.target.value) || 0 })}
              />
            </div>
            
            <div className="col-6">
              <label htmlFor="interval" className="form-label small mb-1">间隔</label>
              <input 
                type="number" 
                id="interval"
                className="form-control form-control-sm bg-dark"
                value={formData.interval}
                onChange={(e) => updateFormData({ interval: parseInt(e.target.value) || 0 })}
                min={0}
              />
            </div>
          </div>
          
          <div className="mb-0">
            <label htmlFor="isLocked" className="form-label small mb-1">锁仓</label>
            <select
              id="isLocked"
              className="form-select form-select-sm bg-dark"
              value={formData.isLocked}
              onChange={(e) => updateFormData({ isLocked: e.target.value })}
            >
              <option value="是" className="text-primary fw-bold">是</option>
              <option value="否">否</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* 操作按钮 */}
      <div className="row g-2">
        <div className="col-6">
          <button 
            type="submit" 
            className="btn btn-success btn-sm w-100 btn-gradient-success"
          >
            <i className="bi bi-play-fill me-1"></i> 启动交易
          </button>
        </div>
        <div className="col-6">
          <button 
            type="button" 
            className="btn btn-danger btn-sm w-100 btn-gradient-danger"
            onClick={() => addLog("❌ 用户取消交易操作")}
          >
            <i className="bi bi-x-lg me-1"></i> 取消交易
          </button>
        </div>
      </div>
    </form>
  );
} 