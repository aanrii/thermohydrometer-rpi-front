import { Tabs, Tab } from "@material-ui/core";
import { useContext, useState } from "react";
import { ModeContext } from "./App";

export const ModeMenu: React.FC = () => {
  const [value, setValue] = useState(0);
  const { setMode } = useContext(ModeContext);

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    setMode(newValue === 0 ? "temperature" : "humidity");
  };

  return (
    <Tabs
      value={value}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleChange}
    >
      <Tab label="Temperature" />
      <Tab label="Humidity" />
    </Tabs>
  );
};
