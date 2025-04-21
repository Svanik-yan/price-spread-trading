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
import { Layout, Button, Space, Tooltip, Divider } from 'antd';
import { 
  QuestionCircleOutlined, 
  AreaChartOutlined, 
  PlayCircleOutlined, 
  StopOutlined 
} from '@ant-design/icons';

const _Header = Layout.Header;

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
      {/* 顶部导航栏 - Element UI 风格 */}
      <div className="el-menu--horizontal shadow-sm rounded-md px-4 mb-3 flex justify-between items-center bg-white h-12">
        <div className="flex items-center h-full">
          <AreaChartOutlined style={{ fontSize: '18px', marginRight: '8px', color: '#409EFF' }} />
          <div className="text-base font-medium text-[#303133]">价差交易平台</div>
        </div>
        
        <div className="flex items-center gap-4 h-full">
          <Tooltip title={showGuide ? "关闭指引" : "查看新手指引"}>
            <Button 
              type="text" 
              icon={<QuestionCircleOutlined />} 
              onClick={() => setShowGuide(!showGuide)}
              size="small"
              className="text-[#606266]"
            >
              {showGuide ? "关闭指引" : "新手指引"}
            </Button>
          </Tooltip>
          
          <Divider type="vertical" style={{ margin: '0 8px', height: '16px', borderColor: '#EBEEF5' }} />
          
          <Space size={12}>
            <div className="el-result-success flex items-center px-3 py-1 rounded bg-[#f0f9eb] text-[#67C23A]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#67C23A] mr-2"></span>
              <span className="text-[#67C23A] text-sm">系统在线</span>
            </div>
            
            <Button 
              type="primary" 
              size="small" 
              icon={<PlayCircleOutlined />}
              style={{ backgroundColor: '#409EFF', borderColor: '#409EFF' }}
              className="h-8 px-3"
            >
              <span>全部启动</span>
            </Button>
            
            <Button 
              danger 
              size="small" 
              icon={<StopOutlined />}
              className="h-8 px-3"
            >
              <span>全部停止</span>
            </Button>
          </Space>
        </div>
      </div>
      
      {/* 步骤引导区域 */}
      <div className="mb-4">
        <StepGuide activeStep={activeStep} onStepClick={handleStepClick} />
      </div>
      
      {/* 新手引导区域 - 条件渲染 */}
      {showGuide && (
        <div className="el-card mb-4 border-[#409EFF] border rounded-md overflow-hidden">
          <div className="el-card__body p-4">
            <BeginnerGuide />
          </div>
        </div>
      )}
      
      {/* 主体内容 */}
      <div className="row g-2">
        {/* 左侧交易和控制区 */}
        <div className="col-md-3">
          {/* 交易表单 */}
          <div id="trade-form-section" className="el-card mb-3 rounded-md overflow-hidden shadow-sm border border-[#EBEEF5]">
            <div className="el-card__header bg-[#ecf5ff] py-2 px-3 border-bottom border-[#DCDFE6] flex justify-between items-center">
              <div className="text-[#409EFF] font-medium flex items-center">
                <i className="bi bi-sliders me-1 text-[#409EFF]"></i>
                交易控制
                <span className="ml-2 bg-[#409EFF] text-white text-xs px-2 py-0.5 rounded">第一步</span>
              </div>
              <HelpIcon title="交易控制" content="在此设置价差交易参数，完成后点击启动交易" />
            </div>
            <div className="el-card__body p-3">
              <TradeForm />
            </div>
          </div>

          {/* 策略控制区 */}
          <div id="strategy-control-section" className="el-card mb-3 rounded-md overflow-hidden shadow-sm border border-[#EBEEF5]">
            <div className="el-card__header bg-[#ecf5ff] py-2 px-3 border-bottom border-[#DCDFE6] flex justify-between items-center">
              <div className="text-[#409EFF] font-medium flex items-center">
                <i className="bi bi-gear-wide-connected me-1"></i>
                策略管理
                <span className="ml-2 bg-[#409EFF] text-white text-xs px-2 py-0.5 rounded">第二步</span>
              </div>
              <HelpIcon title="策略管理" content="选择并管理交易策略，控制策略运行状态" />
            </div>
            <div className="el-card__body p-3">
              <StrategyControl />
            </div>
          </div>
          
          {/* 系统状态面板 */}
          <div id="system-status-section" className="el-card mb-3 rounded-md overflow-hidden shadow-sm border border-[#EBEEF5]">
            <div className="el-card__header bg-[#f0f9eb] py-2 px-3 border-bottom border-[#DCDFE6] flex justify-between items-center">
              <div className="text-[#67C23A] font-medium flex items-center">
                <i className="bi bi-hdd-network me-1"></i>
                系统状态
                <span className="ml-2 bg-[#67C23A] text-white text-xs px-2 py-0.5 rounded">监控</span>
              </div>
              <HelpIcon title="系统状态" content="实时监控系统运行状态、资源使用和性能指标" />
            </div>
            <div className="el-card__body p-0 overflow-hidden" style={{ height: "280px" }}>
              <SystemStatus />
            </div>
          </div>
        </div>
        
        {/* 中央区域 */}
        <div className="col-md-6">
          {/* 交易概览面板 */}
          <div id="dashboard-section" className="el-card mb-3 rounded-md overflow-hidden shadow-sm border border-[#EBEEF5]">
            <div className="el-card__header bg-[#ecf5ff] py-2 px-3 border-bottom border-[#DCDFE6] flex justify-between items-center">
              <div className="text-[#409EFF] font-medium flex items-center">
                <i className="bi bi-speedometer2 me-1 text-[#409EFF]"></i>
                交易概览
                <span className="ml-2 bg-[#409EFF] text-white text-xs px-2 py-0.5 rounded">总览</span>
              </div>
              <HelpIcon title="交易概览" content="显示交易策略、价差、持仓等关键数据统计" />
            </div>
            <div className="el-card__body p-0 overflow-hidden">
              <Dashboard />
            </div>
          </div>
          
          {/* 价差数据区 */}
          <div id="spread-data-section" className="el-card mb-3 rounded-md overflow-hidden shadow-sm border border-[#EBEEF5]">
            <div className="el-card__header bg-[#f0f9eb] py-2 px-3 border-bottom border-[#DCDFE6] flex justify-between items-center">
              <div className="text-[#67C23A] font-medium flex items-center">
                <i className="bi bi-bar-chart-line me-1 text-[#67C23A]"></i>
                价差数据
                <span className="ml-2 bg-[#67C23A] text-white text-xs px-2 py-0.5 rounded">第三步</span>
              </div>
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
            <div className="el-card__body p-0 overflow-auto" style={{ height: "300px" }}>
              <SpreadTable />
            </div>
            <div className="el-card__footer d-flex justify-content-between border-top py-1">
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
          <div className="el-card mb-3 rounded-md overflow-hidden shadow-sm border border-[#EBEEF5]">
            <div className="el-card__header bg-[#f0f9eb] py-2 px-3 border-bottom border-[#DCDFE6] flex justify-between items-center">
              <div className="text-[#67C23A] font-medium flex items-center">
                <i className="bi bi-cpu me-1 text-[#67C23A]"></i>
                算法
              </div>
              <div className="d-flex align-items-center">
                <HelpIcon title="交易算法" content="自动交易算法配置和管理" placement="left" />
                <span className="badge bg-primary ms-1 d-flex align-items-center px-1 py-0">
                  <i className="bi bi-arrow-repeat fs-8 me-1"></i>
                  <span className="d-none d-md-inline fs-8">自动更新</span>
                </span>
              </div>
            </div>
            <div className="el-card__body p-0 overflow-auto" style={{ maxHeight: "200px" }}>
              <AlgorithmPanel />
            </div>
            <div className="el-card__footer d-flex justify-content-between border-top py-1">
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
          <div className="el-card mb-3 rounded-md overflow-hidden shadow-sm border border-[#EBEEF5]">
            <div className="el-card__header bg-[#f0f9eb] py-2 px-3 border-bottom border-[#DCDFE6] flex justify-between items-center">
              <div className="text-[#67C23A] font-medium flex items-center">
                <i className="bi bi-gear me-1 text-[#67C23A]"></i>
                策略
                <span className="ml-2 bg-[#67C23A] text-white text-xs px-2 py-0.5 rounded">监控</span>
              </div>
              <HelpIcon title="策略监控" content="显示策略运行状态和性能指标" placement="left" />
            </div>
            <div className="el-card__body p-0 overflow-auto" style={{ maxHeight: "200px" }}>
              <StrategyPanel />
            </div>
            <div className="el-card__footer d-flex justify-content-between border-top py-1">
              <small className="text-muted fs-8">总策略: 3个</small>
              <button className="btn btn-sm btn-primary py-0 px-2">
                <i className="bi bi-gear-wide-connected fs-8"></i>
                <span className="d-none d-sm-inline ms-1">管理</span>
              </button>
            </div>
          </div>
          
          {/* 持仓面板 */}
          <div id="position-panel-section" className="el-card mb-3 rounded-md overflow-hidden shadow-sm border border-[#EBEEF5]">
            <div className="el-card__header bg-[#f0f9eb] py-2 px-3 border-bottom border-[#DCDFE6] flex justify-between items-center">
              <div className="text-[#67C23A] font-medium flex items-center">
                <i className="bi bi-briefcase me-1 text-[#67C23A]"></i>
                持仓管理
                <span className="ml-2 bg-[#67C23A] text-white text-xs px-2 py-0.5 rounded">第四步</span>
              </div>
              <HelpIcon title="持仓管理" content="查看和管理当前持仓情况" placement="left" />
            </div>
            <div className="el-card__body p-0 overflow-auto" style={{ height: "200px" }}>
              <PositionPanel />
            </div>
          </div>
          
          {/* 日志面板 */}
          <div className="el-card shadow-sm border-[#EBEEF5]">
            <div className="el-card__header bg-[#f0f9eb] py-1 px-3 border-bottom border-[#DCDFE6] flex justify-between items-center">
              <div className="text-[#67C23A] font-medium flex items-center">
                <i className="bi bi-journal-text me-1 text-[#67C23A]"></i>
                系统日志
              </div>
              <div className="d-flex align-items-center">
                <HelpIcon title="系统日志" content="记录系统运行和交易活动日志" placement="left" />
                <span className="badge bg-success ms-1 d-flex align-items-center px-1 py-0">
                  <i className="bi bi-activity fs-8 me-1"></i>
                  <span className="d-none d-md-inline fs-8">实时</span>
                </span>
              </div>
            </div>
            <div className="el-card__body p-0 overflow-auto" style={{ maxHeight: "150px" }}>
              <LogPanel />
            </div>
            <div className="el-card__footer d-flex justify-content-between border-top py-1">
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
