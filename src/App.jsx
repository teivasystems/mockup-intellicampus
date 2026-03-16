import { useState } from "react";
import T from "./tokens";

// Chrome
import SNHeader from "./components/SNHeader";
import WorkspaceTabBar from "./components/WorkspaceTabBar";
import NowAssistDrawer from "./components/NowAssistDrawer";

// Screens
import DashboardScreen from "./screens/DashboardScreen";
import AlertListScreen from "./screens/AlertListScreen";
import CaseDetailScreen from "./screens/CaseDetailScreen";
import StudentsStub from "./screens/StudentsScreen";
import FacultyView from "./screens/FacultyScreen";
import AdvisorsStub from "./screens/AdvisorsScreen";
import ConfigStub from "./screens/ConfigScreen";
import AnalyticsStub from "./screens/AnalyticsScreen";

const TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "alerts", label: "Early Alerts" },
  { id: "students", label: "Students" },
  { id: "faculty", label: "Faculty" },
  { id: "advisors", label: "Advisors" },
  { id: "config", label: "Risk Config" },
  { id: "analytics", label: "Analytics" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedCase, setSelectedCase] = useState(null);
  const [assistOpen, setAssistOpen] = useState(false);

  const handleTabChange = (id) => {
    setActiveTab(id);
    setSelectedCase(null);
    setAssistOpen(false);
  };

  return (
    <div style={{
      fontFamily: T.font, color: T.textPrimary, background: T.surface1,
      width: "100%", height: "100vh", display: "flex", flexDirection: "column",
      overflow: "hidden", fontSize: 14, lineHeight: 1.5,
      WebkitFontSmoothing: "antialiased",
    }}>
      <SNHeader />
      <WorkspaceTabBar tabs={TABS} active={activeTab} onChange={handleTabChange} />

      {/* Screens */}
      {activeTab === "dashboard" && (
        <DashboardScreen onViewAlerts={() => handleTabChange("alerts")} />
      )}

      {activeTab === "alerts" && !selectedCase && (
        <AlertListScreen onSelectCase={setSelectedCase} />
      )}

      {activeTab === "alerts" && selectedCase && (
        <CaseDetailScreen
          student={selectedCase}
          onBack={() => { setSelectedCase(null); setAssistOpen(false); }}
          onOpenAssist={() => setAssistOpen(true)}
        />
      )}

      {activeTab === "students" && <StudentsStub />}
      {activeTab === "faculty" && (
        <FacultyView onSelectCase={(s) => { setActiveTab("alerts"); setSelectedCase(s); }} />
      )}
      {activeTab === "advisors" && <AdvisorsStub />}
      {activeTab === "config" && <ConfigStub />}
      {activeTab === "analytics" && <AnalyticsStub />}

      {/* Now Assist Drawer */}
      <NowAssistDrawer
        student={selectedCase}
        open={assistOpen}
        onClose={() => setAssistOpen(false)}
      />

      {/* Backdrop */}
      {assistOpen && (
        <div
          onClick={() => setAssistOpen(false)}
          style={{
            position: "fixed", top: 0, left: 0, right: 420, bottom: 0,
            background: "rgba(0,0,0,.15)", zIndex: 199,
          }}
        />
      )}
    </div>
  );
}
