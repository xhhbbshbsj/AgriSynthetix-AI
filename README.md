AgriSynthetix: Deep Synthesis of AI-Based Crop Yield Prediction
AgriSynthetix is a high-precision agriculture decision-support system. It integrates Pedo-Climatic Intelligence—soil chemistry and meteorological data—with advanced XGBoost Machine Learning to provide actionable crop yield forecasts.

Inspired by research on rural socio-economic transformation (specifically within the Presidency Division, West Bengal), this tool democratizes precision farming for smallholder farmers by offering real-time satellite-driven insights without the need for expensive on-field hardware.

🚀 Key Features
Virtual Sensing Engine: Bypasses hardware costs by pulling real-time data from NASA POWER and ISRIC SoilGrids APIs based on GPS coordinates.

Predictive Synthesis: Utilizes an XGBoost Regressor to model non-linear relationships between NPK levels, pH, temperature, and temporal rainfall distribution.

Multi-Crop Recommendation: Dynamically suggests the most profitable crop (Rice, Jute, Mustard) based on current environmental suitability.

Explainable AI (XAI): Provides transparent "AI Insights" to build farmer trust by explaining why a specific yield is predicted.

GIS Interface: An interactive Mapbox/Leaflet dashboard with integrated location search for global accessibility.

🛠️ Tech Stack
Frontend (Client)
React.js: Interactive UI/UX.

Leaflet & Leaflet-GeoSearch: Geospatial visualization and address autocomplete.

Axios: Asynchronous API communication.

Backend (Server & AI)
Node.js & Express: Central API gateway.

FastAPI (Python): High-performance AI microservice.

XGBoost & Scikit-learn: Machine learning model training and inference.

REST APIs: Integration with Global Earth Observation databases.

📁 Project Structure:
CropIntel-AI/
├── ai_engine/             # Python FastAPI & ML Logic
│   ├── core/              # API Fetching (NASA, SoilGrids)
│   ├── models/            # Trained XGBoost Pickles (.pkl)
│   └── main.py            # AI Engine Entry Point
├── client/                # React Frontend Dashboard
├── server/                # Node.js API Gateway
└── data/                  # Local training datasets

🚦 Getting Started
1. AI Engine Setup
Bash
cd ai_engine
python -m venv venv
source venv/bin/activate  # venv\Scripts\activate for Windows
pip install -r requirements.txt
python main.py
2. Backend Setup
Bash
cd server
npm install
node index.js
3. Frontend Setup
Bash
cd client
npm install
npm start
📊 Performance & Research Impact
Based on the integrated model, the system achieves a registered prediction accuracy of ~98% for structured tabular data. By focusing on the Presidency Division (Nadia, Murshidabad, etc.), the project highlights how data-driven interventions can bridge the productivity gap and foster rural resilience.

🤝 Acknowledgments
Research Paper: Deep Synthesis of AI-Based Crop Yield Prediction Systems: Integrating Pedo-Climatic Intelligence for Precision Agriculture.

Data Providers: NASA Langley Research Center, Open-Meteo, and ISRIC World Soil Information.