import { ERPProvider } from "./context/ERPContext";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <ERPProvider>
      <MainLayout />
    </ERPProvider>
  );
}

export default App;