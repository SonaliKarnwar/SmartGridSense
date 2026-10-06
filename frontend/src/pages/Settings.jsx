import { useState } from "react";

function Settings() {

    const [energyMonitoring, setEnergyMonitoring] = useState(true);
    const [aiPredictions, setAiPredictions] = useState(true);
    const [anomalyDetection, setAnomalyDetection] = useState(true);

    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <h1>Settings</h1>

                    <p>
                        Manage your SmartGridSense preferences
                    </p>
                </div>

            </div>


            <div className="panel">

                <h2>Application Settings</h2>


                <div className="settings-item">

                    <div>
                        <strong>Energy Monitoring</strong>

                        <p>
                            Monitor your connected devices and energy usage.
                        </p>
                    </div>

                    <button
                        className={`toggle-button ${
                            energyMonitoring ? "active" : ""
                        }`}
                        onClick={() =>
                            setEnergyMonitoring(!energyMonitoring)
                        }
                    >
                        {energyMonitoring ? "Enabled" : "Disabled"}
                    </button>

                </div>


                <div className="settings-item">

                    <div>
                        <strong>AI Predictions</strong>

                        <p>
                            Use machine learning to predict future energy
                            consumption.
                        </p>
                    </div>

                    <button
                        className={`toggle-button ${
                            aiPredictions ? "active" : ""
                        }`}
                        onClick={() =>
                            setAiPredictions(!aiPredictions)
                        }
                    >
                        {aiPredictions ? "Enabled" : "Disabled"}
                    </button>

                </div>


                <div className="settings-item">

                    <div>
                        <strong>Anomaly Detection</strong>

                        <p>
                            Detect unusual energy consumption patterns.
                        </p>
                    </div>

                    <button
                        className={`toggle-button ${
                            anomalyDetection ? "active" : ""
                        }`}
                        onClick={() =>
                            setAnomalyDetection(!anomalyDetection)
                        }
                    >
                        {anomalyDetection ? "Enabled" : "Disabled"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Settings;