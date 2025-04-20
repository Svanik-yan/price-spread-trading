import React, { useState } from 'react';

export interface StepGuideProps {
  activeStep?: number;
  onStepClick?: (step: number) => void;
}

export function StepGuide({ activeStep = 1, onStepClick }: StepGuideProps) {
  const steps = [
    {
      id: 1,
      title: "设置价差参数",
      description: "填写价差代码、方向、数量等交易参数",
      icon: "bi-sliders"
    },
    {
      id: 2,
      title: "选择交易策略",
      description: "从策略列表中选择合适的交易策略",
      icon: "bi-gear-wide-connected"
    },
    {
      id: 3,
      title: "执行交易",
      description: "启动所选策略，开始监控和执行交易",
      icon: "bi-play-circle"
    },
    {
      id: 4,
      title: "监控结果",
      description: "查看持仓、盈亏和交易历史记录",
      icon: "bi-graph-up"
    }
  ];

  const handleStepClick = (stepId: number) => {
    if (onStepClick) {
      onStepClick(stepId);
    }
  };

  return (
    <div className="card bg-dark text-light border-primary mb-3">
      <div className="card-header bg-primary bg-opacity-25">
        <h5 className="mb-0">
          <i className="bi bi-signpost-split me-2"></i>
          交易操作指南
        </h5>
      </div>
      <div className="card-body p-0">
        <div className="d-flex flex-column flex-md-row">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`
                p-3 position-relative 
                ${activeStep === step.id ? 'bg-primary bg-opacity-10 border-bottom border-primary border-3' : 'border-bottom'}
                ${index < steps.length - 1 ? 'border-end' : ''}
              `}
              onClick={() => handleStepClick(step.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center">
                <div className={`
                  d-flex justify-content-center align-items-center rounded-circle 
                  ${activeStep === step.id ? 'bg-primary' : 'bg-secondary'} 
                  text-white me-3
                `} style={{ width: '32px', height: '32px' }}>
                  {step.id}
                </div>
                <div>
                  <h6 className={`mb-1 ${activeStep === step.id ? 'text-primary' : 'text-light'}`}>
                    <i className={`bi ${step.icon} me-2`}></i>
                    {step.title}
                  </h6>
                  <small className={`d-none d-lg-block ${activeStep === step.id ? 'text-light' : 'text-muted'}`}>
                    {step.description}
                  </small>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="d-none d-md-block position-absolute end-0 top-50 translate-middle-y pe-none">
                  <i className="bi bi-chevron-right text-secondary fs-4"></i>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 