// 价差交易系统类型定义

// 交易方向
export type Direction = "多" | "空";

// 开平类型
export type OpenClose = "开" | "平";

// 价差数据项
export interface SpreadItem {
  id: string;
  name: string;
  buyVolume: number;
  buyPrice: number;
  sellPrice: number;
  sellVolume: number;
  netPosition: number;
  time: string;
  fixedPrice: number;
}

// 日志项
export interface LogItem {
  time: string;
  message: string;
}

// 策略类型
export interface Strategy {
  id: string;
  name: string;
  isActive: boolean;
}

// 交易表单数据
export interface TradeFormData {
  spread: string;
  direction: Direction;
  openClose: OpenClose;
  price: number;
  volume: number;
  limitPrice: number;
  interval: number;
  color: string;
}

// 算法配置
export interface AlgorithmConfig {
  algorithm: string;
  spread: string;
  direction: Direction;
  openPrice: number;
  volume: number;
  status: string;
} 