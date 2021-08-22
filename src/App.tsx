import { Card, Container, makeStyles } from "@material-ui/core";
import Chart from "./Chart";
import "./app.css";
import "@fontsource/roboto";
import { createContext, useState } from "react";
import { TimeRange } from "./types";
import { TimeRangeMenu } from "./TimeRangeMenu";
import { Mode } from "fs";
import { ModeMenu } from "./ModeMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "lg",
    [theme.breakpoints.down("sm")]: {
      minWidth: "sm",
    },
    padding: 10,
  },
  card: {
    padding: 20,
  },
  timeMenu: {
    padding: 10,
  },
}));

export const TimeRangeContext = createContext({
  timeRange: {} as TimeRange,
  setTimeRange: (tr: TimeRange) => {},
});
export const ModeContext = createContext({
  mode: "" as Mode,
  setMode: (m: Mode) => {},
});

function App() {
  const classes = useStyles();

  const now = new Date();
  const [timeRange, setTimeRange] = useState({
    from: new Date(now.getTime() - 13 * 1000 * 60 * 60),
    to: now,
  } as TimeRange);

  const [mode, setMode] = useState("temperature" as Mode);

  return (
    <div className="App">
      <TimeRangeContext.Provider value={{ timeRange, setTimeRange }}>
        <ModeContext.Provider value={{ mode, setMode }}>
          <Container className={classes.root}>
            <Card className={classes.card}>
              <ModeMenu />
              <Chart />
              <TimeRangeMenu />
            </Card>
          </Container>
        </ModeContext.Provider>
      </TimeRangeContext.Provider>
    </div>
  );
}

export default App;
