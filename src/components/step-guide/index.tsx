import React from 'react';
import { Steps, Card } from 'antd';
import { 
  SettingOutlined, 
  ControlOutlined, 
  PlayCircleOutlined, 
  LineChartOutlined 
} from '@ant-design/icons';

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
      icon: <SettingOutlined />
    },
    {
      id: 2,
      title: "选择交易策略",
      description: "从策略列表中选择合适的交易策略",
      icon: <ControlOutlined />
    },
    {
      id: 3,
      title: "执行交易",
      description: "启动所选策略，开始监控和执行交易",
      icon: <PlayCircleOutlined />
    },
    {
      id: 4,
      title: "监控结果",
      description: "查看持仓、盈亏和交易历史记录",
      icon: <LineChartOutlined />
    }
  ];

  const handleStepClick = (current: number) => {
    if (onStepClick) {
      onStepClick(current + 1);
    }
  };

  return (
    <Card
      className="el-card border border-[#EBEEF5] rounded-md shadow-sm overflow-hidden"
      title={
        <div className="flex items-center text-[#303133] font-medium">
          <i className="bi bi-signpost-split me-2"></i>
          交易操作指南
        </div>
      }
      headStyle={{ 
        backgroundColor: '#F5F7FA', 
        borderBottom: '1px solid #DCDFE6',
        padding: '12px 16px',
        fontWeight: 500
      }}
      bodyStyle={{ 
        padding: '24px', 
        backgroundColor: '#fff' 
      }}
    >
      <Steps
        current={activeStep - 1}
        onChange={handleStepClick}
        items={steps.map(step => ({
          title: <div className="text-[#303133] font-medium">{step.title}</div>,
          description: <div className="text-[#909399] text-sm">{step.description}</div>,
          icon: step.icon
        }))}
        style={{
          '--ant-primary-color': '#409EFF',
          '--ant-primary-color-outline': '#E6F0FF'
        } as React.CSSProperties}
      />
    </Card>
  );
} 