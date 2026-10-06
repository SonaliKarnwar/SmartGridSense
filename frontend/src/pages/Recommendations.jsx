import { useEffect, useState } from "react";
import api from "../services/api";

function Recommendations() {

    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadRecommendations();
    }, []);

    const loadRecommendations = async () => {

        try {

            const response = await api.get("/api/recommendations");

            setRecommendations(response.data);
            setLoading(false);

        } catch (error) {

            console.error(error);

            setError("Unable to load recommendations.");
            setLoading(false);

        }
    };

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <div>

                    <h1>AI Recommendations</h1>

                    <p>
                        Smart suggestions to reduce energy consumption
                    </p>

                </div>

                <button
                    className="refresh-button"
                    onClick={loadRecommendations}
                >
                    ↻ Refresh
                </button>

            </div>


            {loading && (

                <div className="panel">

                    <p>Loading recommendations...</p>

                </div>

            )}


            {error && (

                <div className="panel">

                    <p>{error}</p>

                </div>

            )}


            {!loading && !error && (

                <div className="recommendation-grid">

                    {recommendations.length === 0 ? (

                        <div className="panel">

                            <h2>No recommendations found</h2>

                            <p>
                                Recommendations will appear here
                                when available.
                            </p>

                        </div>

                    ) : (

                        recommendations.map((recommendation) => (

                            <div
                                className="panel recommendation-card"
                                key={recommendation.id}
                            >

                                <div className="recommendation-icon">
                                    💡
                                </div>

                                <h2>
                                    Energy Saving Recommendation
                                </h2>

                                <p>
                                    {recommendation.message}
                                </p>

                                <div className="saving-value">

                                    Potential Saving:
                                    <strong>
                                        ₹{recommendation.potentialSaving}
                                    </strong>

                                </div>

                                {recommendation.device && (

                                    <p>
                                        <strong>Device:</strong>{" "}
                                        {recommendation.device.deviceName}
                                    </p>

                                )}

                            </div>

                        ))

                    )}

                </div>

            )}

        </div>
    );
}

export default Recommendations;