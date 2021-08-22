import { Box, CircularProgress } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ModeContext, TimeRangeContext } from "./App";
import GetMetrics from "./GetMetrics";
import { Metrics } from "./types";

function GetMovingAveraged(arr: any[], key: string, points: number): any[] {
  return arr.slice(points).map((v, i) => {
    const sum = arr
      .slice(i, i + points)
      .map((v) => v[key])
      .reduce((acc, cur) => acc + cur, 0);
    return { ...v, [key]: (sum / points).toFixed(1) };
  });
}

const Chart: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [metricsArray, setMetricsArray] = useState([] as Metrics[]);
  const { mode } = useContext(ModeContext);
  const { timeRange } = useContext(TimeRangeContext);

  useEffect(() => {
    setIsLoading(true);
    GetMetrics(timeRange.from, timeRange.to).then((metrics) => {
      setMetricsArray(GetMovingAveraged(metrics, "humidity", 6));
      setIsLoading(false);
    });
  }, [timeRange]);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Box p={4}>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={metricsArray} margin={{ bottom: 70, right: 70 }}>
          <XAxis
            dataKey="measuredAt"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(measuredAt) =>
              new Date(measuredAt).toLocaleString("ja-JP", {
                timeZone: "Asia/Tokyo",
              })
            }
            type="number"
            scale="time"
            angle={45}
            interval={20}
            textAnchor="start"
            style={{
              fontSize: "0.7rem",
            }}
          />
          <CartesianGrid strokeDasharray="5 5" />
          <YAxis
            domain={[
              (min: number) => Math.floor(min - 1),
              (max: number) => Math.ceil(max + 1),
            ]}
            style={{
              fontSize: "0.7rem",
            }}
          />
          <Line type="monotone" dataKey={mode} />
          <Tooltip
            labelFormatter={(t) =>
              new Date(t).toLocaleString("ja-JP", {
                timeZone: "Asia/Tokyo",
              })
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Chart;
