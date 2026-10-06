import { useEffect, useState } from "react";
import api from "../services/api";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
function Dashboard() {

    const [devices, setDevices] = useState([]);
    const [readings, setReadings] = useState([]);
    const [predictions, setPredictions] = useState([]);
    const [anomalies, setAnomalies] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    const [totalEnergy, setTotalEnergy] = useState(0);
    const [predictedEnergy, setPredictedEnergy] = useState(0);

    const [billData, setBillData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const chartData = readings.map((reading) => ({
    time: reading.timestamp
        ? reading.timestamp.substring(11, 16)
        : "",
    energy: Number(reading.energyConsumption || 0)
}));

    const loadDashboardData = async () => {

    setLoading(true);
    setRefreshing(true);

        try {

            // Get devices
            const devicesResponse =
                await api.get("/api/devices");

            setDevices(devicesResponse.data);


            // Get energy readings
            const readingsResponse =
                await api.get("/api/energy");

            setReadings(readingsResponse.data);


            // Get predictions
            const predictionsResponse =
                await api.get("/api/predictions");

            setPredictions(predictionsResponse.data);


            // Get anomalies
            const anomaliesResponse =
                await api.get("/api/anomalies");

            setAnomalies(anomaliesResponse.data);


            // Get recommendations
            const recommendationsResponse =
                await api.get("/api/recommendations");

            setRecommendations(recommendationsResponse.data);


            // Calculate total energy
            console.log("READINGS:", readingsResponse.data);

            const total = readingsResponse.data.reduce(
                (sum, reading) => {
                            console.log("ENERGY:", reading.energyConsumption);
                            return sum + Number(reading.energyConsumption || 0);
                        },
                        0
                );

            console.log("TOTAL:", total);

            setTotalEnergy(total);
            // Calculate electricity bill
            const billResponse = await api.post(
                 "/api/bill/calculate",
                {
                    energyConsumption: total,
                ratePerUnit: 8
                 }
                );

            setBillData(billResponse.data);

            
            // Get latest prediction
            if (predictionsResponse.data.length > 0) {

                const latestPrediction =
                    predictionsResponse.data[
                        predictionsResponse.data.length - 1
                    ];

                setPredictedEnergy(
                    Number(latestPrediction.predictedEnergy || 0)
                );

            }

        } catch (error) {

            console.error(
                "Dashboard loading error:",
                error
            );

        }  finally {

    setLoading(false);
    setRefreshing(false);

}   
    };


    useEffect(() => {

        loadDashboardData();

    }, []);


    return (

        <div className="dashboard">

            {/* HEADER */}

            <div className="dashboard-header">

                <div>

                    <h1>Energy Dashboard</h1>

                    <p>
                        Monitor and analyze your energy consumption
                    </p>

                </div>

                <button
                    className="refresh-button"
                    onClick={loadDashboardData}
                    disabled={refreshing}
                >
                {refreshing ? "⟳ Refreshing..." : "↻ Refresh"}
                </button>

            </div>


            {/* STAT CARDS */}

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="stat-icon">
                        ⚡
                    </div>

                    <div>

                        <p>Total Energy</p>

                        <h2>
                            {totalEnergy.toFixed(2)} kWh
                        </h2>

                        <span>
                            From recorded readings
                        </span>

                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        🔮
                    </div>

                    <div>

                        <p>Predicted Energy</p>

                        <h2>
                            {predictedEnergy.toFixed(2)} kWh
                        </h2>

                        <span>
                            Latest AI prediction
                        </span>

                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        💰
                    </div>

                    <div>

                        <p>Estimated Bill</p>

                        <h2>
                            ₹{billData ? Number(billData.totalBill).toFixed(2) : "—"}
                        </h2>

                        <span>
                             AI-powered bill estimate
                        </span>

                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        🌱
                    </div>

                    <div>

                        <p>Efficiency Score</p>

                        <h2>
                            {billData
                                 ? `${Number(billData.efficiencyScore).toFixed(0)}%`
                                     : "—"}
                        </h2>

                        <span>
                             {billData?.efficiencyLevel || "Calculating..."}
                        </span>

                    </div>

                </div>

            </div>


            {/* MAIN GRID */}

            <div className="dashboard-grid">


                {/* ENERGY */}

                <div className="panel energy-panel">

                    <div className="panel-header">

                        <div>

                            <h2>
                                Energy Consumption
                            </h2>

                            <p>
                                Recorded energy readings
                            </p>

                        </div>

                        <select>

                            <option>
                                All Readings
                            </option>

                        </select>

                    </div>


                    <div className="chart-placeholder">

    {loading ? (

        <p>Loading energy data...</p>

    ) : readings.length === 0 ? (

        <p>No energy readings available.</p>

    ) : (

        <ResponsiveContainer
            width="100%"
            height={300}
        >

            <LineChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="time" />

                <YAxis />

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="energy"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                />

            </LineChart>

        </ResponsiveContainer>

    )}

</div>

                </div>


                {/* DEVICES */}

                <div className="panel">

                    <div className="panel-header">

                        <div>

                            <h2>
                                Device Status
                            </h2>

                            <p>
                                Your connected devices
                            </p>

                        </div>

                    </div>


                    <div className="device-status">

                        {devices.length === 0 ? (

                            <p>
                                No devices found.
                            </p>

                        ) : (

                            devices.map((device) => (

                                <div
                                    className="device-row"
                                    key={device.id}
                                >

                                    <span>
                                        ⚡ {device.deviceName}
                                    </span>

                                    <strong>
                                        {device.status}
                                    </strong>

                                    <span>
                                        {device.ratedPower} W
                                    </span>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </div>


            {/* BOTTOM GRID */}

            <div className="bottom-grid">


                {/* AI INSIGHTS */}

                <div className="panel">

                    <div className="panel-header">

                        <h2>
                            AI Insights
                        </h2>

                    </div>


                    {recommendations.length === 0 ? (

                        <div className="insight">

                            💡 No recommendations available yet.

                        </div>

                    ) : (

                        recommendations
                            .slice(-2)
                            .map((recommendation) => (

                                <div
                                    className="insight"
                                    key={recommendation.id}
                                >

                                    🤖{" "}
                                    {recommendation.message}

                                    {recommendation.potentialSaving && (

                                        <strong>
                                            {" "}Potential saving: ₹
                                            {recommendation.potentialSaving}
                                        </strong>

                                    )}

                                </div>

                            ))

                    )}

                </div>


                {/* ALERTS */}

                <div className="panel">

                    <div className="panel-header">

                        <h2>
                            Recent Alerts
                        </h2>

                    </div>


                    {anomalies.length === 0 ? (

                        <div className="alert-item">

                            ✅ No anomalies detected.

                        </div>

                    ) : (

                        anomalies
                            .slice(-3)
                            .map((anomaly) => (

                                <div
                                    className="alert-item"
                                    key={anomaly.id}
                                >

                                    ⚠️{" "}
                                    {anomaly.description}

                                    {anomaly.severity && (

                                        <strong>
                                            {" "}({anomaly.severity})
                                        </strong>

                                    )}

                                </div>

                            ))

                    )}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;