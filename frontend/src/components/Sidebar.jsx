import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="logo">
                <div className="logo-icon">⚡</div>

                <div>
                    <h2>SmartGridSense</h2>
                    <span>Energy Intelligence</span>
                </div>
            </div>

            <nav className="sidebar-nav">

                <NavLink to="/" className="nav-item">
                    <span>📊</span>
                    Dashboard
                </NavLink>

                <NavLink to="/devices" className="nav-item">
                    <span>⚡</span>
                    Devices
                </NavLink>

                <NavLink to="/analytics" className="nav-item">
                    <span>📈</span>
                    Analytics
                </NavLink>

                <NavLink to="/predictions" className="nav-item">
                    <span>🤖</span>
                    AI Predictions
                </NavLink>

                <NavLink to="/anomalies" className="nav-item">
                    <span>⚠️</span>
                    Anomalies
                </NavLink>

                <NavLink to="/recommendations" className="nav-item">
                    <span>💡</span>
                    Recommendations
                </NavLink>

                <NavLink to="/bill" className="nav-item">
                    <span>🧾</span>
                    Bill Prediction
                </NavLink>

            </nav>

            <div className="sidebar-bottom">

                <NavLink to="/settings" className="nav-item">
                    <span>⚙️</span>
                    Settings
                </NavLink>

                <div className="user-section">
                    <div className="user-avatar">S</div>

                    <div>
                        <strong>Sonali</strong>
                        <small>Energy User</small>
                    </div>
                </div>

            </div>

        </aside>
    );
}

export default Sidebar;