import { create } from "zustand";
import { AlgorithmConfig, LogItem, SpreadItem, Strategy, TradeFormData } from "@/types";

interface TradeState {
  // 交易表单数据
  formData: TradeFormData;
  updateFormData: (data: Partial<TradeFormData>) => void;
  
  // 价差表格数据
  spreadItems: SpreadItem[];
  addSpreadItem: (item: SpreadItem) => void;
  removeSpreadItem: (id: string) => void;
  
  // 日志数据
  logs: LogItem[];
  addLog: (message: string) => void;
  clearLogs: () => void;
  
  // 策略数据
  strategies: Strategy[];
  currentStrategy: Strategy | null;
  addStrategy: (strategy: Strategy) => void;
  removeStrategy: (id: string) => void;
  setCurrentStrategy: (id: string) => void;
  
  // 算法配置
  algorithmConfigs: AlgorithmConfig[];
  addAlgorithmConfig: (config: AlgorithmConfig) => void;
  removeAlgorithmConfig: (index: number) => void;
  
  // 系统状态
  isInitialized: boolean;
  isRunning: boolean;
  initialize: () => void;
  startAll: () => void;
  stopAll: () => void;
}

export const useTradeStore = create<TradeState>((set) => ({
  // 交易表单初始数据
  formData: {
    spread: "",
    direction: "多",
    openClose: "开",
    price: 0,
    volume: 1,
    limitPrice: 0,
    interval: 0,
    isLocked: "否",
  },
  
  updateFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),
  
  // 价差表格数据
  spreadItems: [],
  addSpreadItem: (item) => set((state) => ({
    spreadItems: [...state.spreadItems, item]
  })),
  removeSpreadItem: (id) => set((state) => ({
    spreadItems: state.spreadItems.filter(item => item.id !== id)
  })),
  
  // 日志数据
  logs: [],
  addLog: (message) => set((state) => {
    const time = new Date().toLocaleTimeString();
    return {
      logs: [...state.logs, { time, message }]
    };
  }),
  clearLogs: () => set({ logs: [] }),
  
  // 策略数据
  strategies: [{ id: "basic", name: "BasicSpreadStrategy", isActive: false }],
  currentStrategy: { id: "basic", name: "BasicSpreadStrategy", isActive: false },
  addStrategy: (strategy) => set((state) => ({
    strategies: [...state.strategies, strategy]
  })),
  removeStrategy: (id) => set((state) => ({
    strategies: state.strategies.filter(s => s.id !== id)
  })),
  setCurrentStrategy: (id) => set((state) => ({
    currentStrategy: state.strategies.find(s => s.id === id) || null
  })),
  
  // 算法配置
  algorithmConfigs: [],
  addAlgorithmConfig: (config) => set((state) => ({
    algorithmConfigs: [...state.algorithmConfigs, config]
  })),
  removeAlgorithmConfig: (index) => set((state) => ({
    algorithmConfigs: state.algorithmConfigs.filter((_, i) => i !== index)
  })),
  
  // 系统状态
  isInitialized: false,
  isRunning: false,
  initialize: () => set((state) => {
    state.addLog("系统初始化");
    return { isInitialized: true };
  }),
  startAll: () => set((state) => {
    state.addLog("价差数据引擎启动成功");
    state.addLog("价差算法引擎启动成功");
    state.addLog("价差策略引擎启动成功");
    return { isRunning: true };
  }),
  stopAll: () => set((state) => {
    state.addLog("系统停止");
    return { isRunning: false };
  }),
})); 