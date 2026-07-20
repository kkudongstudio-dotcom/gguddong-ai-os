import { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import FloatingPanel from "./FloatingPanel";

function MainLayout() {
  const [activePanel, setActivePanel] = useState(null);

  return (
    <div className="erp-shell">
      <Sidebar onOpenPanel={setActivePanel} />

      <div className="erp-main">
        <Header />

        <main className="erp-content" />
      </div>

      <RightSidebar />

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