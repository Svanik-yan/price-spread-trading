import React, { useState } from "react";
import { useTradeStore } from "@/lib/store/trade-store";
import { Direction, OpenClose } from "@/types";
import { HelpIcon } from "../context-help";

export function TradeForm() {
  const { formData, updateFormData, addLog } = useTradeStore();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLog(`🚀 价差引擎启动: ${formData.spread} ${formData.direction} ${formData.openClose} 价格:${formData.price} 数量:${formData.volume}`);
  };

  return (
    <form onSubmit={handleSubmit} className="px-1 space-y-3">
      {/* 步骤提示 */}
      <div className="alert alert-primary py-2 d-flex align-items-center">
        <div className="bg-primary rounded-circle text-white d-flex justify-content-center align-items-center me-2" style={{ width: "24px", height: "24px" }}>1</div>
        <div className="small">设置交易参数，启动价差交易</div>
      </div>
      
      {/* 价差 */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <label htmlFor="spread" className="form-label fw-bold required-field small mb-0">
            价差标识
          </label>
          <HelpIcon 
            title="价差标识格式" 
            content="输入价差合约代码，如IF2306-IF2307表示沪深300期货6月合约和7月合约的价差"
          />
        </div>
        <div className="input-group">
          <span className="input-group-text bg-dark border-secondary text-light">
            <i className="bi bi-tag"></i>
          </span>
          <input 
            type="text"
            id="spread"
            className="form-control form-control-sm bg-dark text-light"
            value={formData.spread}
            onChange={(e) => updateFormData({ spread: e.target.value })}
            placeholder="如：IF2306-IF2307"
            required
          />
        </div>
      </div>
      
      {/* 交易方向和开平 */}
      <div className="row mb-3 g-2">
        <div className="col-6">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <label htmlFor="direction" className="form-label fw-bold required-field small mb-0">方向</label>
            <HelpIcon title="交易方向" content="多：做多价差，看涨价差；空：做空价差，看跌价差" />
          </div>
          <select 
            id="direction"
            className="form-select form-select-sm bg-dark text-light"
            value={formData.direction}
            onChange={(e) => updateFormData({ direction: e.target.value as Direction })}
            required
          >
            <option value="多" className="text-success fw-bold">多</option>
            <option value="空" className="text-danger fw-bold">空</option>
          </select>
        </div>
        
        <div className="col-6">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <label htmlFor="openClose" className="form-label fw-bold required-field small mb-0">开平</label>
            <HelpIcon title="开平操作" content="开：建立新仓位；平：平掉已有仓位" />
          </div>
          <select 
            id="openClose"
            className="form-select form-select-sm bg-dark text-light"
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
      <div className="row mb-3 g-2">
        <div className="col-6">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <label htmlFor="price" className="form-label fw-bold required-field small mb-0">价格</label>
            <HelpIcon title="交易价格" content="设置价差交易的价格，系统将在此价格附近寻找最优成交机会" />
          </div>
          <div className="input-group">
            <input 
              type="number" 
              id="price"
              className="form-control form-control-sm bg-dark text-light"
              value={formData.price}
              onChange={(e) => updateFormData({ price: parseFloat(e.target.value) || 0 })}
              required
              step="0.01"
              min="0"
            />
            <span className="input-group-text bg-dark border-secondary text-light">点</span>
          </div>
        </div>
        
        <div className="col-6">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <label htmlFor="volume" className="form-label fw-bold required-field small mb-0">数量</label>
            <HelpIcon title="交易数量" content="设置交易的手数，建议首次交易使用较小的数量" />
          </div>
          <div className="input-group">
            <input 
              type="number" 
              id="volume"
              className="form-control form-control-sm bg-dark text-light"
              value={formData.volume}
              onChange={(e) => updateFormData({ volume: parseInt(e.target.value) || 1 })}
              min={1}
              required
            />
            <span className="input-group-text bg-dark border-secondary text-light">手</span>
          </div>
        </div>
      </div>
      
      {/* 高级选项折叠面板 */}
      <div className="mb-3">
        <button 
          type="button" 
          className="btn btn-sm btn-outline-secondary w-100 d-flex justify-content-between align-items-center py-1"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <span>
            <i className={`bi ${showAdvanced ? 'bi-chevron-down' : 'bi-chevron-right'} me-1`}></i>
            高级选项
          </span>
          <span className="badge bg-secondary">可选</span>
        </button>
        
        {showAdvanced && (
          <div className="card bg-dark bg-opacity-50 border-secondary mt-2">
            <div className="card-body py-2 px-2">
              <div className="row mb-2 g-2">
                <div className="col-6">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label htmlFor="limitPrice" className="form-label small mb-0">超价</label>
                    <HelpIcon title="超价设置" content="允许的最大滑点，设置后系统将在指定价格范围内成交" placement="left" />
                  </div>
                  <div className="input-group">
                    <input 
                      type="number" 
                      id="limitPrice"
                      className="form-control form-control-sm bg-dark text-light"
                      value={formData.limitPrice}
                      onChange={(e) => updateFormData({ limitPrice: parseFloat(e.target.value) || 0 })}
                      step="0.01"
                      min="0"
                    />
                    <span className="input-group-text bg-dark border-secondary text-light">点</span>
                  </div>
                </div>
                
                <div className="col-6">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label htmlFor="interval" className="form-label small mb-0">间隔</label>
                    <HelpIcon title="交易间隔" content="两次交易之间的最小时间间隔（秒）" placement="left" />
                  </div>
                  <div className="input-group">
                    <input 
                      type="number" 
                      id="interval"
                      className="form-control form-control-sm bg-dark text-light"
                      value={formData.interval}
                      onChange={(e) => updateFormData({ interval: parseInt(e.target.value) || 0 })}
                      min={0}
                    />
                    <span className="input-group-text bg-dark border-secondary text-light">秒</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-0">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label htmlFor="isLocked" className="form-label small mb-0">锁仓</label>
                  <HelpIcon title="锁仓设置" content="是否锁定仓位，锁定后系统不会自动平仓" placement="left" />
                </div>
                <select
                  id="isLocked"
                  className="form-select form-select-sm bg-dark text-light"
                  value={formData.isLocked}
                  onChange={(e) => updateFormData({ isLocked: e.target.value })}
                >
                  <option value="是" className="text-warning fw-bold">是</option>
                  <option value="否" className="text-primary fw-bold">否</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 操作按钮 */}
      <div className="row g-2 mt-2">
        <div className="col-6">
          <button 
            type="submit" 
            className="btn btn-success btn-sm w-100 d-flex align-items-center justify-content-center py-2"
          >
            <i className="bi bi-play-fill me-1 fs-5"></i> 
            <span>启动交易</span>
          </button>
        </div>
        <div className="col-6">
          <button 
            type="button" 
            className="btn btn-danger btn-sm w-100 d-flex align-items-center justify-content-center py-2"
            onClick={() => addLog("❌ 用户取消交易操作")}
          >
            <i className="bi bi-x-lg me-1"></i> 
            <span>取消交易</span>
          </button>
        </div>
      </div>
    </form>
  );
} 