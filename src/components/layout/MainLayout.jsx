import { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import FloatingPanel from "./FloatingPanel";
import Dashboard from "../../pages/Dashboard";

function MainLayout() {
  const [activePanel, setActivePanel] = useState(null);

  return (
    <div className="erp-shell">
      <Sidebar onOpenPanel={setActivePanel} />

      <div className="erp-main">
        <Header />

        <main className="erp-content">
          <Dashboard />
        </main>
      </div>

      {activePanel && (
        <FloatingPanel
          title={activePanel}
          onClose={() => setActivePanel(null)}
        />
      )}
    </div>
  );
}

export default MainLayout;