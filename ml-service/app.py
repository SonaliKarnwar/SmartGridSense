from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib
import os


app = FastAPI(
    title="SmartGridSense ML API",
    description="AI service for energy prediction and anomaly detection",
    version="1.0"
)


# -----------------------------------------
# Project paths
# -----------------------------------------

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

MODEL_DIR = os.path.join(
    BASE_DIR,
    "models"
)


# -----------------------------------------
# Model files
# -----------------------------------------

prediction_model_path = os.path.join(
    MODEL_DIR,
    "energy_prediction_model.pkl"
)

prediction_features_path = os.path.join(
    MODEL_DIR,
    "features.pkl"
)

anomaly_model_path = os.path.join(
    MODEL_DIR,
    "anomaly_model.pkl"
)

anomaly_features_path = os.path.join(
    MODEL_DIR,
    "anomaly_features.pkl"
)


# -----------------------------------------
# Load prediction model
# -----------------------------------------

prediction_model = joblib.load(
    prediction_model_path
)

prediction_features = joblib.load(
    prediction_features_path
)


# -----------------------------------------
# Load anomaly model
# -----------------------------------------

anomaly_model = joblib.load(
    anomaly_model_path
)

anomaly_features = joblib.load(
    anomaly_features_path
)


# -----------------------------------------
# Request format
# -----------------------------------------

class EnergyRequest(BaseModel):

    data: dict


# -----------------------------------------
# Home
# -----------------------------------------

@app.get("/")
def home():

    return {
        "message": "SmartGridSense ML API is running",
        "prediction_model": "loaded",
        "anomaly_model": "loaded"
    }


# -----------------------------------------
# Energy prediction
# -----------------------------------------

@app.post("/predict")
def predict_energy(request: EnergyRequest):

    try:

        input_data = request.data

        missing_features = [
            feature
            for feature in prediction_features
            if feature not in input_data
        ]

        if missing_features:

            raise HTTPException(
                status_code=400,
                detail={
                    "message": "Missing prediction features",
                    "missing_features": missing_features
                }
            )

        row = {
            feature: input_data[feature]
            for feature in prediction_features
        }

        dataframe = pd.DataFrame([row])

        prediction = prediction_model.predict(
            dataframe
        )

        return {
            "success": True,
            "predicted_energy": float(
                prediction[0]
            )
        }

    except HTTPException:

        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# -----------------------------------------
# Anomaly detection
# -----------------------------------------

@app.post("/detect-anomaly")
def detect_anomaly(request: EnergyRequest):

    try:

        input_data = request.data

        missing_features = [
            feature
            for feature in anomaly_features
            if feature not in input_data
        ]

        if missing_features:

            raise HTTPException(
                status_code=400,
                detail={
                    "message": "Missing anomaly features",
                    "missing_features": missing_features
                }
            )

        row = {
            feature: input_data[feature]
            for feature in anomaly_features
        }

        dataframe = pd.DataFrame([row])

        prediction = anomaly_model.predict(
            dataframe
        )

        if prediction[0] == -1:

            result = "Anomaly"

        else:

            result = "Normal"

        return {
            "success": True,
            "result": result
        }

    except HTTPException:

        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )