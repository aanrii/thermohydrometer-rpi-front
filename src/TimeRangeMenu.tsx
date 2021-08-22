import { makeStyles, Grid, Button, TextField } from "@material-ui/core";
import { useState, ChangeEvent, useContext } from "react";
import { TimeRangeContext } from "./App";

const useStyles = makeStyles(() => ({
  root: {
    padding: 10,
  },

  textField: {
    marginLeft: 20,
    marginRight: 20,
    width: 200,
  },
}));

const TimeSelects = ["12H", "1D", "3D", "1W", "CUSTOM"];
type TimeSelect = typeof TimeSelects[number];

export const TimeRangeMenu: React.FC = () => {
  const classes = useStyles();
  const [timeSelect, setTimeSelect] = useState("12H" as TimeSelect);
  const { timeRange, setTimeRange } = useContext(TimeRangeContext);

  const now = new Date();
  const onButtonClick = (t: TimeSelect) => {
    setTimeSelect(t);

    if (t === "CUSTOM") {
      return;
    }

    const from =
      t === "12H"
        ? new Date(now.getTime() - 13 * 1000 * 60 * 60)
        : t === "1D"
        ? new Date(now.getTime() - 25 * 1000 * 60 * 60)
        : t === "3D"
        ? new Date(now.getTime() - (24 * 3 + 1) * 1000 * 60 * 60)
        : new Date(now.getTime() - (24 * 7 + 1) * 1000 * 60 * 60);

    setTimeRange({ ...timeRange, from });
  };

  const onTextFieldChange = (mode: "to" | "from") => {
    return (e: ChangeEvent<HTMLTextAreaElement>) => {
      const d = new Date(Date.parse(e.target.value));
      const newTimeRange =
        mode === "to" ? { ...timeRange, to: d } : { ...timeRange, from: d };
      setTimeRange(newTimeRange);
    };
  };

  return (
    <Grid container justifyContent="flex-start" className={classes.root}>
      {TimeSelects.map((t) =>
        t === timeSelect ? (
          <Button key={t} disabled>
            {t}
          </Button>
        ) : (
          <Button key={t} onClick={() => onButtonClick(t)}>
            {t}
          </Button>
        )
      )}

      {timeSelect === "CUSTOM" ? (
        <div>
          <TextField
            id="from-datetime"
            label="from"
            type="datetime-local"
            defaultValue={timeRange.from.toISOString().slice(0, 16)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onTextFieldChange("from")}
          />
          <TextField
            id="to-datetime"
            label="to"
            type="datetime-local"
            defaultValue={timeRange.to.toISOString().slice(0, 16)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onTextFieldChange("to")}
          />
        </div>
      ) : null}
    </Grid>
  );
};
