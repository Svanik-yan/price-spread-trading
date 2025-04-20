import { create } from "zustand";
import { AlgorithmConfig, LogItem, PositionItem, SpreadItem, Strategy, TradeFormData } from "@/types";

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
  
  // 持仓数据
  positions: PositionItem[];
  addPosition: (position: PositionItem) => void;
  updatePosition: (id: string, data: Partial<PositionItem>) => void;
  removePosition: (id: string) => void;
  closePosition: (id: string) => void;
  closeAllPositions: () => void;
  
  // 系统状态
  isInitialized: boolean;
  isRunning: boolean;
  isConnected: boolean;
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
  
  // 持仓数据
  positions: [
    {
      id: "pos1",
      spreadId: "IF2302-IF2303",
      direction: "多",
      price: 5.25,
      volume: 2,
      time: "10:23:45",
      profit: 0.38,
      status: "持有中"
    },
    {
      id: "pos2",
      spreadId: "IC2304-IC2305",
      direction: "空",
      price: 8.75,
      volume: 1,
      time: "11:15:32",
      profit: -0.42,
      status: "持有中"
    }
  ],
  addPosition: (position) => set((state) => {
    state.addLog(`新建持仓: ${position.spreadId} ${position.direction} ${position.volume}手`);
    return {
      positions: [...state.positions, position]
    };
  }),
  updatePosition: (id, data) => set((state) => ({
    positions: state.positions.map(pos => 
      pos.id === id ? { ...pos, ...data } : pos
    )
  })),
  removePosition: (id) => set((state) => {
    state.addLog(`移除持仓: ${id}`);
    return {
      positions: state.positions.filter(pos => pos.id !== id)
    };
  }),
  closePosition: (id) => set((state) => {
    const position = state.positions.find(pos => pos.id === id);
    if (position) {
      state.addLog(`平仓操作: ${position.spreadId} ${position.direction} ${position.volume}手`);
    }
    return {
      positions: state.positions.map(pos => 
        pos.id === id ? { ...pos, status: "平仓中" } : pos
      )
    };
  }),
  closeAllPositions: () => set((state) => {
    state.addLog("一键平仓: 所有持仓");
    return {
      positions: state.positions.map(pos => 
        pos.status === "持有中" ? { ...pos, status: "平仓中" } : pos
      )
    };
  }),
  
  // 系统状态
  isInitialized: false,
  isRunning: false,
  isConnected: true,
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