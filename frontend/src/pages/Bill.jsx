import { useState } from "react";
import api from "../services/api";

function Bill() {

    const [energy, setEnergy] = useState(25);
    const [rate, setRate] = useState(8);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const calculateBill = async () => {

        setLoading(true);
        setError("");
        setResult(null);

        try {

            const response = await api.post(
                "/api/bill/calculate",
                {
                    energyConsumption: Number(energy),
                    ratePerUnit: Number(rate)
                }
            );

            setResult(response.data);

        } catch (error) {

            console.error(error);

            setError(
                "Unable to calculate bill. Please check the Bill API."
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <h1>Bill Prediction</h1>

                    <p>
                        Estimate your electricity bill using energy consumption
                    </p>
                </div>

            </div>

            <div className="panel">

                <h2>Electricity Bill Calculator</h2>

                <p>
                    Enter your expected energy consumption and electricity
                    rate per unit.
                </p>

                <div className="bill-form">

                    <div className="form-group">

                        <label>
                            Energy Consumption (kWh)
                        </label>

                        <input
                            type="number"
                            value={energy}
                            onChange={(e) => setEnergy(e.target.value)}
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Rate per Unit (₹)
                        </label>

                        <input
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                        />

                    </div>

                </div>

                <button
                    className="refresh-button"
                    onClick={calculateBill}
                    disabled={loading}
                >
                    {loading
                        ? "Calculating..."
                        : "🧾 Calculate Bill"
                    }
                </button>

            </div>

            {error && (

                <div className="panel">
                    <p>{error}</p>
                </div>

            )}

            {result && (

    <div className="panel bill-result">

        <h2>Estimated Electricity Bill</h2>

        <div className="bill-amount">
            ₹{Number(result.totalBill).toFixed(2)}
        </div>

        <p>
            <strong>Energy Cost:</strong>{" "}
            ₹{Number(result.energyCost).toFixed(2)}
        </p>

        <p>
            <strong>Fixed Charge:</strong>{" "}
            ₹{Number(result.fixedCharge).toFixed(2)}
        </p>

        <p>
            <strong>Efficiency Score:</strong>{" "}
            {Number(result.efficiencyScore).toFixed(0)}%
        </p>

        <p>
            <strong>Efficiency Level:</strong>{" "}
            {result.efficiencyLevel}
        </p>

        <p>
            <strong>Estimated Savings:</strong>{" "}
            ₹{Number(result.estimatedSavings).toFixed(2)}
        </p>

        <p>
            <strong>Recommendation:</strong>{" "}
            {result.recommendation}
        </p>

    </div>

)}

        </div>
    );
}

export default Bill;