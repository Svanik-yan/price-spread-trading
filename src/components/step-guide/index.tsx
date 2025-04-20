import React from 'react';
import { Steps, Card, Typography } from 'antd';
import { 
  SlidersFilled, 
  SettingFilled, 
  PlayCircleFilled, 
  AreaChartOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;

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
      icon: <SlidersFilled />
    },
    {
      id: 2,
      title: "选择交易策略",
      description: "从策略列表中选择合适的交易策略",
      icon: <SettingFilled />
    },
    {
      id: 3,
      title: "执行交易",
      description: "启动所选策略，开始监控和执行交易",
      icon: <PlayCircleFilled />
    },
    {
      id: 4,
      title: "监控结果",
      description: "查看持仓、盈亏和交易历史记录",
      icon: <AreaChartOutlined />
    }
  ];

  const handleStepClick = (current: number) => {
    if (onStepClick) {
      onStepClick(current + 1);
    }
  };

  return (
    <Card
      title={
        <Title level={5} style={{ margin: 0 }}>
          <i className="bi bi-signpost-split me-2"></i>
          交易操作指南
        </Title>
      }
      className="mb-3"
      headStyle={{ backgroundColor: '#1890ff15', borderBottom: '1px solid #1890ff40' }}
      bodyStyle={{ padding: '16px 24px' }}
    >
      <Steps
        current={activeStep - 1}
        onChange={handleStepClick}
        items={steps.map(step => ({
          title: step.title,
          description: <Text type="secondary">{step.description}</Text>,
          icon: step.icon
        }))}
      />
    </Card>
  );
} 