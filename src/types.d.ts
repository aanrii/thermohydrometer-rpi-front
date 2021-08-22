export type Mode = "temperature" | "humidity";

export type Metrics = {
  temperature: number;
  humidity: number;
  measuredAt: number;
};

export type TimeRange = {
  from: Date;
  to: Date;
};
