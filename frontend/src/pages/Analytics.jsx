import { useEffect, useState } from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import api from "../services/api";


function Analytics() {

    const [readings, setReadings] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        loadReadings();

    }, []);


    const loadReadings = async () => {

        setLoading(true);

        try {

            const response =
                await api.get("/api/energy");


            const data =
                response.data.map((reading) => ({

                    time: reading.timestamp
                        ? new Date(
                            reading.timestamp
                        ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        })
                        : "",

                    energy: Number(
                        reading.energyConsumption || 0
                    ),

                    power: Number(
                        reading.power || 0
                    )

                }));


            setReadings(data);

            setError("");

        } catch (error) {

            console.error(
                "Analytics loading error:",
                error
            );

            setError(
                "Unable to load energy data."
            );

        } finally {

            setLoading(false);

        }

    };


    // Calculate total energy

    const totalEnergy =
        readings.reduce(
            (sum, reading) =>
                sum + reading.energy,
            0
        );


    // Calculate average energy

    const averageEnergy =
        readings.length > 0
            ? totalEnergy / readings.length
            : 0;


    // Find peak energy

    const peakEnergy =
        readings.length > 0
            ? Math.max(
                ...readings.map(
                    reading => reading.energy
                )
            )
            : 0;


    // Calculate average power

    const averagePower =
        readings.length > 0
            ? readings.reduce(
                (sum, reading) =>
                    sum + reading.power,
                0
            ) / readings.length
            : 0;


    return (

        <div className="dashboard">


            {/* HEADER */}

            <div className="dashboard-header">

                <div>

                    <h1>
                        Energy Analytics
                    </h1>

                    <p>
                        Analyze your energy consumption
                        and device usage
                    </p>

                </div>


                <button
                    className="refresh-button"
                    onClick={loadReadings}
                    disabled={loading}
                >

                    {loading
                        ? "⟳ Loading..."
                        : "↻ Refresh"}

                </button>

            </div>


            {/* LOADING */}

            {loading && (

                <div className="panel">

                    <p>
                        Loading energy data...
                    </p>

                </div>

            )}


            {/* ERROR */}

            {error && (

                <div className="panel">

                    <p>
                        {error}
                    </p>

                </div>

            )}


            {!loading && !error && (

                <>


                    {/* ANALYTICS CARDS */}

                    <div className="stats-grid">


                        <div className="stat-card">

                            <div className="stat-icon">
                                ⚡
                            </div>

                            <div>

                                <p>
                                    Total Energy
                                </p>

                                <h2>
                                    {totalEnergy.toFixed(2)}
                                    {" "}kWh
                                </h2>

                                <span>
                                    Total recorded consumption
                                </span>

                            </div>

                        </div>


                        <div className="stat-card">

                            <div className="stat-icon">
                                📊
                            </div>

                            <div>

                                <p>
                                    Average Energy
                                </p>

                                <h2>
                                    {averageEnergy.toFixed(2)}
                                    {" "}kWh
                                </h2>

                                <span>
                                    Average per reading
                                </span>

                            </div>

                        </div>


                        <div className="stat-card">

                            <div className="stat-icon">
                                🔥
                            </div>

                            <div>

                                <p>
                                    Peak Energy
                                </p>

                                <h2>
                                    {peakEnergy.toFixed(2)}
                                    {" "}kWh
                                </h2>

                                <span>
                                    Highest recorded usage
                                </span>

                            </div>

                        </div>


                        <div className="stat-card">

                            <div className="stat-icon">
                                ⚙️
                            </div>

                            <div>

                                <p>
                                    Average Power
                                </p>

                                <h2>
                                    {averagePower.toFixed(2)}
                                    {" "}W
                                </h2>

                                <span>
                                    Average power consumption
                                </span>

                            </div>

                        </div>


                    </div>


                    {/* ENERGY CHART */}

                    <div className="panel">

                        <div className="panel-header">

                            <div>

                                <h2>
                                    Energy Consumption Trend
                                </h2>

                                <p>
                                    Energy consumption over time
                                </p>

                            </div>

                        </div>


                        {readings.length === 0 ? (

                            <p>
                                No energy readings available.
                            </p>

                        ) : (

                            <div
                                style={{
                                    width: "100%",
                                    height: 350
                                }}
                            >

                                <ResponsiveContainer>

                                    <LineChart
                                        data={readings}
                                    >

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                        />

                                        <XAxis
                                            dataKey="time"
                                        />

                                        <YAxis />

                                        <Tooltip />

                                        <Line
                                            type="monotone"
                                            dataKey="energy"
                                            stroke="#2563eb"
                                            strokeWidth={3}
                                            dot={{
                                                r: 5
                                            }}
                                        />

                                    </LineChart>

                                </ResponsiveContainer>

                            </div>

                        )}

                    </div>


                    {/* POWER CHART */}

                    <div className="panel">

                        <div className="panel-header">

                            <div>

                                <h2>
                                    Power Consumption Trend
                                </h2>

                                <p>
                                    Power usage over time
                                </p>

                            </div>

                        </div>


                        {readings.length === 0 ? (

                            <p>
                                No power readings available.
                            </p>

                        ) : (

                            <div
                                style={{
                                    width: "100%",
                                    height: 350
                                }}
                            >

                                <ResponsiveContainer>

                                    <LineChart
                                        data={readings}
                                    >

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                        />

                                        <XAxis
                                            dataKey="time"
                                        />

                                        <YAxis />

                                        <Tooltip />

                                        <Line
                                            type="monotone"
                                            dataKey="power"
                                            stroke="#16a34a"
                                            strokeWidth={3}
                                            dot={{
                                                r: 5
                                            }}
                                        />

                                    </LineChart>

                                </ResponsiveContainer>

                            </div>

                        )}

                    </div>


                    {/* READINGS TABLE */}

                    <div className="panel">

                        <div className="panel-header">

                            <div>

                                <h2>
                                    Energy Readings
                                </h2>

                                <p>
                                    Detailed recorded measurements
                                </p>

                            </div>

                        </div>


                        {readings.length === 0 ? (

                            <p>
                                No energy readings available.
                            </p>

                        ) : (

                            <div className="energy-table">


                                <div className="energy-table-header">

                                    <strong>
                                        Time
                                    </strong>

                                    <strong>
                                        Energy (kWh)
                                    </strong>

                                    <strong>
                                        Power (W)
                                    </strong>

                                </div>


                                {readings.map(
                                    (reading, index) => (

                                        <div
                                            className="energy-table-row"
                                            key={index}
                                        >

                                            <span>
                                                {reading.time}
                                            </span>

                                            <span>
                                                {reading.energy.toFixed(2)}
                                            </span>

                                            <span>
                                                {reading.power.toFixed(2)}
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </div>


                </>

            )}

        </div>

    );

}


export default Analytics;