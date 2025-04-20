import React, { useState } from 'react';

export function BeginnerGuide() {
  const [activeStep, setActiveStep] = useState(1);
  
  const steps = [
    {
      id: 1,
      title: "欢迎使用价差交易平台",
      content: "价差交易是利用相关市场间的价格差异进行套利的交易策略。本平台可以帮助您轻松设置、管理和执行价差交易策略。",
      icon: "bi-stars"
    },
    {
      id: 2,
      title: "如何开始我的第一个价差交易",
      content: "在左侧\"交易控制\"面板中，输入您要交易的价差符号（例如：CU2306-CU2307），选择交易方向（多/空）和开平类型（开/平），设置价格和数量，然后点击\"启动交易\"按钮。",
      icon: "bi-1-circle"
    },
    {
      id: 3,
      title: "如何使用策略管理",
      content: "在\"策略管理\"面板中，您可以选择预设的交易策略（如基础价差策略、动态对冲策略等），点击\"添加策略\"后，可以使用\"全部初始化\"和\"全部启动\"来运行策略。",
      icon: "bi-2-circle"
    },
    {
      id: 4,
      title: "监控您的交易和价差",
      content: "在中央的\"价差数据\"区域，您可以实时监控价差信息，包括买卖价格、数量和净仓位。系统日志会记录所有交易活动，帮助您追踪交易过程。",
      icon: "bi-3-circle"
    },
    {
      id: 5,
      title: "使用算法增强交易能力",
      content: "在\"算法\"面板中，您可以查看和管理自动交易算法，这些算法可以根据预设条件自动执行交易，减少人工监控的需要。",
      icon: "bi-4-circle"
    }
  ];
  
  const handleStepChange = (stepId: number) => {
    setActiveStep(stepId);
  };

  const currentStep = steps.find(step => step.id === activeStep) || steps[0];
  
  return (
    <div className="card bg-dark text-light border-secondary mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-info-circle me-2"></i>
          新手指南
        </h5>
        <div className="btn-group">
          {steps.map(step => (
            <button
              key={step.id}
              className={`btn btn-sm ${activeStep === step.id ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => handleStepChange(step.id)}
            >
              {step.id}
            </button>
          ))}
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div className="fs-1 me-3">
            <i className={`bi ${currentStep.icon}`}></i>
          </div>
          <h5 className="mb-0">{currentStep.title}</h5>
        </div>
        <p>{currentStep.content}</p>
        
        {activeStep === 1 && (
          <div className="mt-3 p-3 border border-secondary rounded">
            <p className="mb-2"><strong>小贴士</strong>：不熟悉价差交易？</p>
            <p className="mb-0">价差交易是指同时买入和卖出相关联的两个合约，赚取它们之间价格差异的变化。这种交易方式可以降低方向性风险，专注于相对价值的变化。</p>
          </div>
        )}
        
        {activeStep === 2 && (
          <div className="text-center">
            <img 
              src="/trading-form-sample.png" 
              alt="交易表单示例" 
              className="img-fluid border border-secondary rounded" 
              style={{ maxHeight: '150px' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <p className="text-muted mt-2"><small>交易表单示例图</small></p>
          </div>
        )}
      </div>
      <div className="card-footer d-flex justify-content-between">
        <button 
          className="btn btn-sm btn-outline-secondary" 
          disabled={activeStep === 1}
          onClick={() => handleStepChange(activeStep - 1)}
        >
          <i className="bi bi-arrow-left me-1"></i>
          上一步
        </button>
        <button 
          className="btn btn-sm btn-outline-primary" 
          disabled={activeStep === steps.length}
          onClick={() => handleStepChange(activeStep + 1)}
        >
          下一步
          <i className="bi bi-arrow-right ms-1"></i>
        </button>
      </div>
    </div>
  );
} 