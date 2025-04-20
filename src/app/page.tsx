"use client";

import { useState } from "react";
import { TradeForm } from "@/components/trade-form";
import { SpreadTable } from "@/components/spread-table";
import { LogPanel } from "@/components/log-panel";
import { StrategyPanel } from "@/components/strategy";
import { AlgorithmPanel } from "@/components/algorithm";
import { StrategyControl } from "@/components/strategy-control";
import { BeginnerGuide } from "@/components/beginner-guide";
import { SystemStatus } from "@/components/system-status";
import { StepGuide } from "@/components/step-guide";
import { HelpIcon } from "@/components/context-help";
import { PositionPanel } from "@/components/position-panel";
import { Dashboard } from "@/components/dashboard";
import { Layout, Menu, Button, Space, Tooltip, Badge, Typography, Tag, Divider } from 'antd';
import { 
  QuestionCircleOutlined, 
  CheckCircleOutlined, 
  AreaChartOutlined, 
  PlayCircleOutlined, 
  StopOutlined 
} from '@ant-design/icons';

const { Header } = Layout;
const { Title, Text } = Typography;

export default function Home() {
  // 控制初学者指南显示和当前活动步骤
  const [showGuide, setShowGuide] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // 处理步骤点击
  const handleStepClick = (step: number) => {
    setActiveStep(step);
    // 根据步骤自动滚动到相应区域
    const elementMap: Record<number, string> = {
      1: "trade-form-section",
      2: "strategy-control-section",
      3: "spread-data-section",
      4: "system-status-section"
    };
    
    const element = document.getElementById(elementMap[step]);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container-fluid px-2 py-2" style={{ minHeight: 'calc(100vh - 3rem)' }}>
      {/* 顶部导航栏 - Ant Design 风格 */}
      <Header className="flex justify-between items-center bg-white shadow rounded-md px-4 mb-3" style={{ height: '48px', lineHeight: '48px' }}>
        <div className="flex items-center">
          <AreaChartOutlined style={{ fontSize: '18px', marginRight: '8px', color: '#1890ff' }} />
          <Title level={5} style={{ margin: 0, color: '#1890ff' }}>价差交易平台</Title>
        </div>
        
        <div className="flex items-center gap-3">
          <Tooltip title={showGuide ? "关闭指引" : "查看新手指引"}>
            <Button 
              type="link" 
              icon={<QuestionCircleOutlined />} 
              onClick={() => setShowGuide(!showGuide)}
              size="small"
            >
              {showGuide ? "关闭指引" : "新手指引"}
            </Button>
          </Tooltip>
          
          <Divider type="vertical" style={{ margin: '0 8px', height: '20px' }} />
          
          <Space>
            <Badge status="success" text={<Text type="success">系统在线</Text>} />
            
            <Button type="primary" size="small" icon={<PlayCircleOutlined />}>
              <span>全部启动</span>
            </Button>
            
            <Button danger size="small" icon={<StopOutlined />}>
              <span>全部停止</span>
            </Button>
          </Space>
        </div>
      </Header>
      
      {/* 步骤引导区域 */}
      <div className="mb-2">
        <StepGuide activeStep={activeStep} onStepClick={handleStepClick} />
      </div>
      
      {/* 新手引导区域 - 条件渲染 */}
      {showGuide && (
        <div className="card mb-2 border-primary">
          <div className="card-body py-2">
            <BeginnerGuide />
          </div>
        </div>
      )}
      
      {/* 主体内容 */}
      <div className="row g-2">
        {/* 左侧交易和控制区 */}
        <div className="col-md-3">
          {/* 交易表单 */}
          <div id="trade-form-section" className="card mb-2 shadow-sm border-primary border-opacity-25">
            <div className="card-header bg-primary bg-opacity-10 py-1 border-bottom d-flex justify-content-between align-items-center">
              <h6 className="card-title mb-0 text-primary d-flex align-items-center">
                <i className="bi bi-sliders me-1"></i>
                交易控制
                <span className="badge bg-primary ms-1 fs-8">第一步</span>
              </h6>
              <HelpIcon title="交易控制" content="在此设置价差交易参数，完成后点击启动交易" />
            </div>
            <div className="card-body py-2 px-2">
              <TradeForm />
            </div>
          </div>

          {/* 策略控制区 */}
          <div id="strategy-control-section" className="card mb-2 shadow-sm border-primary border-opacity-25">
            <div className="card-header bg-primary bg-opacity-10 py-1 border-bottom d-flex justify-content-between align-items-center">
              <h6 className="card-title mb-0 text-primary">
                <i className="bi bi-gear-wide-connected me-1"></i>
                策略管理
                <span className="badge bg-primary ms-1 fs-8">第二步</span>
              </h6>
              <HelpIcon title="策略管理" content="选择并管理交易策略，控制策略运行状态" />
            </div>
            <div className="card-body py-2 px-2">
              <StrategyControl />
            </div>
          </div>
          
          {/* 系统状态面板 */}
          <div id="system-status-section" className="card shadow-sm border-info border-opacity-25 mb-2">
            <div className="card-header bg-info bg-opacity-10 py-1 border-bottom d-flex justify-content-between align-items-center">
              <h6 className="card-title mb-0 text-info">
                <i className="bi bi-hdd-network me-1"></i>
                系统状态
                <span className="badge bg-info ms-1 fs-8">监控</span>
              </h6>
              <HelpIcon title="系统状态" content="实时监控系统运行状态、资源使用和性能指标" />
            </div>
            <div className="card-body p-0 overflow-hidden" style={{ height: "280px" }}>
              <SystemStatus />
            </div>
          </div>
        </div>
        
        {/* 中央区域 */}
        <div className="col-md-6">
          {/* 交易概览面板 */}
          <div id="dashboard-section" className="card shadow-sm mb-2 border-primary border-opacity-25">
            <div className="card-header bg-primary bg-opacity-10 py-1 border-bottom d-flex justify-content-between align-items-center">
              <h6 className="card-title mb-0 text-primary">
                <i className="bi bi-speedometer2 me-1"></i>
                交易概览
                <span className="badge bg-primary ms-1 fs-8">总览</span>
              </h6>
              <HelpIcon title="交易概览" content="显示交易策略、价差、持仓等关键数据统计" />
            </div>
            <div className="card-body p-0 overflow-hidden">
              <Dashboard />
            </div>
          </div>
          
          {/* 价差数据区 */}
          <div id="spread-data-section" className="card shadow-sm mb-2 border-success border-opacity-25">
            <div className="card-header bg-success bg-opacity-10 py-1 border-bottom d-flex justify-content-between align-items-center">
              <h6 className="card-title mb-0 text-success">
                <i className="bi bi-bar-chart-line me-1"></i>
                价差数据
                <span className="badge bg-success ms-1 fs-8">第三步</span>
              </h6>
              <div className="d-flex align-items-center">
                <HelpIcon title="价差数据" content="显示所有价差的实时行情和交易数据" placement="left" />
                <span className="badge bg-info mx-1 d-flex align-items-center px-1 py-0">
                  <i className="bi bi-arrow-repeat me-1 fs-8"></i>
                  <span className="d-none d-md-inline fs-8">实时刷新</span>
                </span>
                <select className="form-select form-select-sm py-0" style={{ width: "100px" }}>
                  <option>按时间</option>
                  <option>按价格</option>
                </select>
              </div>
            </div>
            <div className="card-body p-0 overflow-auto" style={{ height: "300px" }}>
              <SpreadTable />
            </div>
            <div className="card-footer d-flex justify-content-between border-top py-1">
              <small className="text-muted fs-8">总数据: 12条</small>
              <div>
                <button className="btn btn-sm btn-primary py-0 px-2 me-1">
                  <i className="bi bi-arrow-clockwise fs-8"></i>
                  <span className="d-none d-sm-inline ms-1">刷新</span>
                </button>
                <button className="btn btn-sm btn-primary py-0 px-2">
                  <i className="bi bi-funnel fs-8"></i>
                  <span className="d-none d-sm-inline ms-1">过滤</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* 算法模块 */}
          <div className="card mb-2 shadow-sm border-warning border-opacity-25">
            <div className="card-header bg-warning bg-opacity-10 py-1 border-bottom d-flex justify-content-between align-items-center">
              <h6 className="card-title mb-0 text-warning">
                <i className="bi bi-cpu me-1"></i>
                算法
              </h6>
              <div className="d-flex align-items-center">
                <HelpIcon title="交易算法" content="自动交易算法配置和管理" placement="left" />
                <span className="badge bg-primary ms-1 d-flex align-items-center px-1 py-0">
                  <i className="bi bi-arrow-repeat fs-8 me-1"></i>
                  <span className="d-none d-md-inline fs-8">自动更新</span>
                </span>
              </div>
            </div>
            <div className="card-body p-0 overflow-auto" style={{ maxHeight: "200px" }}>
              <AlgorithmPanel />
            </div>
            <div className="card-footer d-flex justify-content-between border-top py-1">
              <small className="text-muted fs-8">总算法: 3个</small>
              <div>
                <button className="btn btn-sm btn-primary py-0 px-2 me-1">
                  <i className="bi bi-plus-lg fs-8"></i>
                  <span className="d-none d-sm-inline ms-1">添加</span>
                </button>
                <button className="btn btn-sm btn-danger py-0 px-2">
                  <i className="bi bi-trash fs-8"></i>
                  <span className="d-none d-sm-inline ms-1">删除</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* 右侧面板区域 */}
        <div className="col-md-3">
          {/* 策略面板 */}
          <div className="card mb-2 shadow-sm border-warning border-opacity-25">
            <div className="card-header bg-warning bg-opacity-10 py-1 border-bottom d-flex justify-content-between align-items-center">
              <h6 className="card-title mb-0 text-warning">
                <i className="bi bi-gear me-1"></i>
                策略
                <span className="badge bg-warning ms-1 fs-8 text-dark">监控</span>
              </h6>
              <HelpIcon title="策略监控" content="显示策略运行状态和性能指标" placement="left" />
            </div>
            <div className="card-body p-0 overflow-auto" style={{ maxHeight: "200px" }}>
              <StrategyPanel />
            </div>
            <div className="card-footer d-flex justify-content-between border-top py-1">
              <small className="text-muted fs-8">总策略: 3个</small>
              <button className="btn btn-sm btn-primary py-0 px-2">
                <i className="bi bi-gear-wide-connected fs-8"></i>
                <span className="d-none d-sm-inline ms-1">管理</span>
              </button>
            </div>
          </div>
          
          {/* 持仓面板 */}
          <div id="position-panel-section" className="card mb-2 shadow-sm border-danger border-opacity-25">
            <div className="card-header bg-danger bg-opacity-10 py-1 border-bottom d-flex justify-content-between align-items-center">
              <h6 className="card-title mb-0 text-danger">
                <i className="bi bi-briefcase me-1"></i>
                持仓管理
                <span className="badge bg-danger ms-1 fs-8">第四步</span>
              </h6>
              <HelpIcon title="持仓管理" content="查看和管理当前持仓情况" placement="left" />
            </div>
            <div className="card-body p-0 overflow-auto" style={{ height: "200px" }}>
              <PositionPanel />
            </div>
          </div>
          
          {/* 日志面板 */}
          <div className="card shadow-sm border-secondary border-opacity-25">
            <div className="card-header bg-secondary bg-opacity-10 py-1 border-bottom d-flex justify-content-between align-items-center">
              <h6 className="card-title mb-0 text-secondary">
                <i className="bi bi-journal-text me-1"></i>
                系统日志
              </h6>
              <div className="d-flex align-items-center">
                <HelpIcon title="系统日志" content="记录系统运行和交易活动日志" placement="left" />
                <span className="badge bg-success ms-1 d-flex align-items-center px-1 py-0">
                  <i className="bi bi-activity fs-8 me-1"></i>
                  <span className="d-none d-md-inline fs-8">实时</span>
                </span>
              </div>
            </div>
            <div className="card-body p-0 overflow-auto" style={{ maxHeight: "150px" }}>
              <LogPanel />
            </div>
            <div className="card-footer d-flex justify-content-between border-top py-1">
              <small className="text-muted fs-8">最近日志记录</small>
              <button className="btn btn-sm btn-primary py-0 px-2">
                <i className="bi bi-trash fs-8"></i>
                <span className="d-none d-sm-inline ms-1">清除</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
