import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import AggregatedTables from "./components/AggregatedTables";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AggregatedTables />
    </MantineProvider>
  );
}
