import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Analytics from "./pages/Analytics";
import AIPredictions from "./pages/AIPredictions";
import Anomalies from "./pages/Anomalies";
import Recommendations from "./pages/Recommendations";
import Bill from "./pages/Bill";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
    return (
        <BrowserRouter>

            <div className="app">

                <Sidebar />

                <main className="main-content">

                    <Routes>

                        <Route path="/" element={<Dashboard />} />

                        <Route path="/devices" element={<Devices />} />

                        <Route path="/analytics" element={<Analytics />} />

                        <Route
                         path="/predictions"
                         element={<AIPredictions />}
                        />

                        <Route
                        path="/anomalies"
                        element={<Anomalies />}
                        />

                        <Route
                        path="/recommendations"
                        element={<Recommendations />}
                        />

                        <Route
                        path="/bill"
                        element={<Bill />}
                        />

                        <Route
                        path="/settings"
                        element={<Settings />}
                        />
                        
                    </Routes>

                </main>

            </div>

        </BrowserRouter>
    );
}

export default App;