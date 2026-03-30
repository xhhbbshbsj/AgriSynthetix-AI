import pandas as pd
import numpy as np
import xgboost as xgb
import pickle

def train_crop_model():
    # 1. Create Synthetic Data based on Research Paper ranges
    # Features: Nitrogen, Phosphorus, Potassium, pH, Rainfall, Temperature
    data_size = 1000
    data = {
        'N': np.random.uniform(50, 300, data_size),
        'P': np.random.uniform(20, 100, data_size),
        'K': np.random.uniform(20, 100, data_size),
        'pH': np.random.uniform(5.5, 8.5, data_size),
        'rainfall': np.random.uniform(500, 2500, data_size),
        'temperature': np.random.uniform(20, 35, data_size)
    }
    
    df = pd.DataFrame(data)
    
    # 2. Define the Target (Yield) based on the Paper's logic
    # Yield is higher with optimal N and moderate Rainfall
    df['yield'] = (df['N'] * 0.03) + (df['rainfall'] * 0.002) + (df['temperature'] * 0.1) - (abs(df['pH'] - 6.5) * 2)
    
    X = df.drop('yield', axis=1)
    y = df['yield']

    # 3. Train XGBoost (The gold standard from your paper)
    model = xgb.XGBRegressor(objective='reg:squarederror', n_estimators=100)
    model.fit(X, y)

    # 4. Save the model to a file
    with open('models/crop_xgboost.pkl', 'wb') as f:
        pickle.dump(model, f)
    
    print("✅ XGBoost Model Trained and Saved to models/crop_xgboost.pkl")

if __name__ == "__main__":
    train_crop_model()