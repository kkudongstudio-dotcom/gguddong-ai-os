import { Routes, Route } from "react-router-dom";

import { ERPProvider } from "./context/ERPContext";

import MainLayout from "./components/layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Operations from "./pages/Operations";
import Projects from "./pages/Projects";
import AiCenter from "./pages/AiCenter";
import Business from "./pages/Business";
import Monitor from "./pages/Monitor";

function App() {
  return (
    <ERPProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/ai-center" element={<AiCenter />} />
          <Route path="/business" element={<Business />} />
          <Route path="/monitor" element={<Monitor />} />
        </Routes>
      </MainLayout>
    </ERPProvider>
  );
}

export default App;