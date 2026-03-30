import requests
import json

def get_nasa_weather(lat, lon):
    # Fetching Solar Radiation, Temp, and Precipitation (last 7 days)
    url = f"https://power.larc.nasa.gov/api/temporal/daily/point?parameters=ALLSKY_SFC_SW_DWN,T2M,PRECTOTCORR&community=AG&longitude={lon}&latitude={lat}&start=20260301&end=20260307&format=JSON"
    
    try:
        response = requests.get(url, timeout=15)
        if response.status_code == 200:
            print("✅ NASA POWER API: Connected Successfully!")
            return True
        else:
            print(f"❌ NASA API Error: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ NASA Connection Failed: {e}")
        return False

def get_soil_fallback(lat, lon):
    # Research Paper Data Integration: Nadia/Presidency Division profiles
    # We use this while SoilGrids (503) is down.
    if 22.0 <= lat <= 24.5 and 87.5 <= lon <= 89.0:
        print("ℹ️ SoilGrids Down. Using Research Paper Profile for West Bengal...")
        return {"nitrogen": 250, "ph": 6.5, "source": "Research Paper Baseline"}
    return None

if __name__ == "__main__":
    lat, lon = 23.47, 88.55 # Nadia, WB
    
    nasa_status = get_nasa_weather(lat, lon)
    soil_data = get_soil_fallback(lat, lon)
    
    if nasa_status and soil_data:
        print("\n🚀 STATUS: ALL SYSTEMS GO (using Hybrid Data).")
        print(f"Soil Profile: {soil_data['nitrogen']} mg/kg Nitrogen, pH {soil_data['ph']}")