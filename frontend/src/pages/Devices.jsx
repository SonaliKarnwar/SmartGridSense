import { useEffect, useState } from "react";
import api from "../services/api";

function Devices() {

    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDevices();
    }, []);

    const loadDevices = async () => {
        try {
            const response = await api.get("/api/devices");
            setDevices(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError("Unable to load devices.");
            setLoading(false);
        }
    };

    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <div>
                    <h1>My Devices</h1>
                    <p>Monitor and manage your connected devices</p>
                </div>

                <button
                    className="refresh-button"
                    onClick={loadDevices}
                >
                    ↻ Refresh
                </button>
            </div>

            {loading && (
                <div className="panel">
                    <p>Loading devices...</p>
                </div>
            )}

            {error && (
                <div className="panel">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && (
                <div className="device-cards">

                    {devices.length === 0 ? (
                        <div className="panel">
                            <h2>No devices found</h2>
                            <p>
                                Add devices from your SmartGridSense backend.
                            </p>
                        </div>
                    ) : (

                        devices.map((device) => (

                            <div className="panel" key={device.id}>

                                <div className="panel-header">

                                    <div>
                                        <h2>{device.deviceName}</h2>
                                        <p>{device.deviceType}</p>
                                    </div>

                                    <span>
                                        {device.status}
                                    </span>

                                </div>

                                <div className="device-info">

                                    <p>
                                        <strong>Location:</strong>{" "}
                                        {device.location}
                                    </p>

                                    <p>
                                        <strong>Rated Power:</strong>{" "}
                                        {device.ratedPower} W
                                    </p>

                                    <p>
                                        <strong>Status:</strong>{" "}
                                        {device.status}
                                    </p>

                                </div>

                            </div>

                        ))

                    )}

                </div>
            )}

        </div>
    );
}

export default Devices;