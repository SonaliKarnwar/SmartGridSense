import { useState } from "react";
import api from "../services/api";

function Anomalies() {

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const detectAnomaly = async () => {

        setLoading(true);
        setError("");
        setResult(null);

        try {

            const response = await api.post(
                "/api/ml/detect-anomaly",
                {
                    data: {
                        Appliances: 500,
                        lights: 30,
                        T_out: 10,
                        RH_out: 70,
                        Windspeed: 3,
                        Visibility: 10,
                        hour: 18,
                        day_of_week: 2,
                        is_weekend: 0
                    }
                }
            );

            setResult(response.data);

        } catch (error) {

            console.error(error);

            setError(
                "Unable to detect anomaly. Make sure Spring Boot and ML service are running."
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <h1>Energy Anomaly Detection</h1>

                    <p>
                        Detect unusual energy consumption using AI
                    </p>
                </div>

            </div>

            <div className="panel">

                <h2>AI Anomaly Detection</h2>

                <p>
                    SmartGridSense uses an Isolation Forest machine
                    learning model to identify unusual energy usage.
                </p>

                <button
                    className="refresh-button"
                    onClick={detectAnomaly}
                    disabled={loading}
                >
                    {loading
                        ? "🔍 Analyzing..."
                        : "🔍 Detect Anomaly"
                    }
                </button>

            </div>

            {error && (

                <div className="panel">
                    <p>{error}</p>
                </div>

            )}

            {result && (

                <div className="panel">

                    <h2>Detection Result</h2>

                    <div className="prediction-value">

                        <span>AI Status</span>

                        <h1>
                            {result.result}
                        </h1>

                    </div>

                    <p>
                        SmartGridSense analyzed the energy
                        consumption pattern using the Isolation
                        Forest model.
                    </p>

                </div>

            )}

        </div>
    );
}

export default Anomalies;