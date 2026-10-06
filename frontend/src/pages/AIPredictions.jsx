import { useState } from "react";
import api from "../services/api";

function AIPredictions() {

    const [formData, setFormData] = useState({
        lights: 30,
        T1: 20.5,
        RH_1: 45,
        T_out: 10,
        RH_out: 70,
        Windspeed: 3,
        Visibility: 10,
        hour: 12,
        day_of_week: 2,
        is_weekend: 0
    });

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: Number(value)
        });
    };

    const getPrediction = async () => {

        setLoading(true);
        setError("");
        setPrediction(null);

        try {

            const data = {
                lights: formData.lights,

                T1: formData.T1,
                RH_1: formData.RH_1,

                T2: 20.0,
                RH_2: 44,

                T3: 21.0,
                RH_3: 43,

                T4: 20.8,
                RH_4: 44,

                T5: 19.5,
                RH_5: 50,

                T6: 18.5,
                RH_6: 55,

                T7: 19.0,
                RH_7: 52,

                T8: 20.0,
                RH_8: 48,

                T9: 18.0,
                RH_9: 55,

                T_out: formData.T_out,
                Press_mm_hg: 755,
                RH_out: formData.RH_out,
                Windspeed: formData.Windspeed,
                Visibility: formData.Visibility,
                Tdewpoint: 5,

                rv1: 0.5,
                rv2: 0.5,

                hour: formData.hour,
                day_of_week: formData.day_of_week,
                is_weekend: formData.is_weekend
            };

            const response = await api.post(
    "/api/ml/predict",
    {
        data: data
    }
);

const predictedEnergy =
    Number(response.data.predicted_energy);

setPrediction(predictedEnergy);


// Save prediction in database
await api.post(
    "/api/predictions",
    {
        predictionDate:
            new Date().toISOString().split("T")[0],

        predictedEnergy: predictedEnergy,

        modelName: "Random Forest",

        device: {
            id: 1
        }
    }
);

        } catch (error) {

            console.error(error);

            setError(
                "Unable to generate prediction. Please check that Spring Boot and ML service are running."
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <div>

                    <h1>AI Energy Prediction</h1>

                    <p>
                        Predict energy consumption using machine learning
                    </p>

                </div>

            </div>


            <div className="panel">

                <h2>Enter Energy Conditions</h2>

                <p>
                    Provide the current environmental and usage conditions.
                    SmartGridSense AI will estimate the energy consumption.
                </p>


                <div className="prediction-form">

                    <div className="form-group">

                        <label>
                            Lights Usage
                        </label>

                        <input
                            type="number"
                            name="lights"
                            value={formData.lights}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Indoor Temperature (°C)
                        </label>

                        <input
                            type="number"
                            step="0.1"
                            name="T1"
                            value={formData.T1}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Indoor Humidity (%)
                        </label>

                        <input
                            type="number"
                            name="RH_1"
                            value={formData.RH_1}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Outdoor Temperature (°C)
                        </label>

                        <input
                            type="number"
                            step="0.1"
                            name="T_out"
                            value={formData.T_out}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Outdoor Humidity (%)
                        </label>

                        <input
                            type="number"
                            name="RH_out"
                            value={formData.RH_out}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Wind Speed
                        </label>

                        <input
                            type="number"
                            step="0.1"
                            name="Windspeed"
                            value={formData.Windspeed}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Visibility
                        </label>

                        <input
                            type="number"
                            step="0.1"
                            name="Visibility"
                            value={formData.Visibility}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Hour (0–23)
                        </label>

                        <input
                            type="number"
                            min="0"
                            max="23"
                            name="hour"
                            value={formData.hour}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Day of Week
                        </label>

                        <input
                            type="number"
                            min="0"
                            max="6"
                            name="day_of_week"
                            value={formData.day_of_week}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Weekend
                        </label>

                        <select
                            name="is_weekend"
                            value={formData.is_weekend}
                            onChange={handleChange}
                        >

                            <option value={0}>
                                No
                            </option>

                            <option value={1}>
                                Yes
                            </option>

                        </select>

                    </div>

                </div>


                <button
                    className="refresh-button"
                    onClick={getPrediction}
                    disabled={loading}
                >

                    {loading
                        ? "🤖 Predicting..."
                        : "🤖 Generate AI Prediction"
                    }

                </button>

            </div>


            {error && (

                <div className="panel">

                    <p>{error}</p>

                </div>

            )}


            {prediction !== null && (

    <div className="panel prediction-result">

        <h2>🤖 AI Prediction Result</h2>

        <div className="prediction-value">

            🔮

            <div>

                <span>Predicted Energy Consumption</span>

                <h1>
                    {Number(prediction).toFixed(2)} kWh
                </h1>

            </div>

        </div>


        <div className="prediction-details">

            <div>
                <strong>AI Model</strong>
                <span>Random Forest</span>
            </div>


            <div>
                <strong>Prediction Status</strong>

                <span>
                    {Number(prediction) > 300
                        ? "High Energy Consumption"
                        : Number(prediction) > 150
                        ? "Moderate Energy Consumption"
                        : "Normal Energy Consumption"}
                </span>

            </div>


            <div>
                <strong>AI Insight</strong>

                <span>
                    {Number(prediction) > 300
                        ? "Energy consumption is relatively high. Consider reducing the usage of high-power devices."
                        : Number(prediction) > 150
                        ? "Energy consumption is moderate. Monitoring device usage can help improve efficiency."
                        : "Energy consumption is within a normal range."}
                </span>

            </div>

        </div>


        <p>
            This prediction was generated by the SmartGridSense
            Random Forest machine learning model using the provided
            environmental and usage conditions.
        </p>

    </div>

)}

        </div>
    );
}

export default AIPredictions;