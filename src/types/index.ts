// src/types/index.ts

export type Scenario = {
  id: number;
  title: string;
  difficulty: string;
};

export type DailyResult = {
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  cpm: number;
  cpa: number;
  roas: number;
  revenue: number;
};