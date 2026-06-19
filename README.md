# ClaimShield: Healthcare Insurance Claim Fraud Detection System

ClaimShield is an end-to-end Machine Learning and web application system designed to detect fraudulent healthcare insurance claims. The project contains a complete pipeline, starting from raw dataset cleaning, feature engineering, encoding, and scaling, to model training, evaluation, deploying a FastAPI backend, and running a React + Vite interactive dashboard.

## 🚀 Key Features

*   **End-to-End ML Pipeline**: Notebooks covering data cleaning, encoding (Label Encoding and One-Hot Encoding), high-cardinality feature engineering, scaling, and model training.
*   **Multiple Model Evaluations**: Explores and evaluates multiple classifiers including Logistic Regression, Decision Trees, Random Forest, SVM, Gradient Boosting, and XGBoost.
*   **Optimized Model Deployment**: The API deploys a trained Random Forest classifier, achieving **~87.6% accuracy** and **~95.4% precision** on predicting fraudulent claims.
*   **FastAPI Backend**: High-performance REST API with CORS enabled, input validation via Pydantic, and predictions returned with confidence probability.
*   **Modern React Frontend**: Styled with premium glassmorphism aesthetics, interactive features, real-time prediction displays, and responsive form validation.

---

## 📁 Repository Structure

```text
Tekwork-Project/
│
├── 1.Dataset/                              # Claim datasets at various pipeline stages
│   ├── Raw data/                           # Initial unprocessed claim data (healthdata.xlsx)
│   ├── Clean data/                         # Data after outlier/missing value removal
│   ├── Encoder data/                       # Encoded representation of categorical variables
│   └── Scaling dataset/                    # Scaled features prepared for ML models
│
├── 2.Data Cleaning and outlier and missing/# Data cleaning pipeline
│   └── data_cleaning.ipynb                 # Jupyter notebook handling missing data & outliers
│
├── 3.Data Encoder/                         # Categorical encoding steps
│   └── Encoder.ipynb                       # Jupyter notebook implementing Label/One-Hot encoding
│
├── 4.Data Feature Scaling/                 # Feature scaling and normalization
│   ├── Feature_scaling.ipynb               # Jupyter notebook scaling numerical fields using StandardScaler
│   └── scaler.pkl                          # Serialized fitted StandardScaler object
│
├── 5.model training and Evaluation/        # ML model training
│   └── model.ipynb                         # Trains and evaluates multiple classifier algorithms
│
├── 6.Artifacts/                            # Serialized production objects
│   ├── random_forest.pkl                   # Production Random Forest classifier
│   ├── decision_tree.pkl                   # Trained Decision Tree classifier
│   ├── gradient_boosting.pkl               # Trained Gradient Boosting classifier
│   ├── logistic_regression.pkl             # Trained Logistic Regression classifier
│   ├── svm.pkl                             # Trained Support Vector Machine classifier
│   ├── xgboost.pkl                         # Trained XGBoost classifier
│   ├── encoders.pkl                        # Serialized categorical label encoders
│   └── scaler.pkl                          # Duplicate copy of fitted scaler object
│
├── frontend/                               # React client (Vite + SPA dashboard)
│   ├── src/                                # Frontend application source files
│   │   ├── components/                     # ClaimForm and PredictionResult UI elements
│   │   ├── api.js                          # Fetch client calling the FastAPI backend
│   │   ├── App.jsx                         # Main Dashboard wrapper & state manager
│   │   └── index.css                       # Modern stylesheet with custom glassmorphism styles
│   └── package.json                        # Frontend packages and dev scripts
│
├── main.py                                 # FastAPI application entrypoint
├── requirements.txt                        # Backend dependencies
└── README.md                               # Project documentation
```

---

## 📊 Machine Learning Pipeline & Performance

### 1. Preprocessing Stages
1.  **Data Cleaning**: Dropped identifiers (`Patient_ID`, `Policy_Number`, `Claim_ID`, `Hospital_ID`). Checked and imputed null values.
2.  **Encoding**: 
    *   *Label Encoding*: `Patient_Gender`, `Admission_Type`, `Service_Type`, `Patient_State`, `Provider_State`.
    *   *One-Hot Encoding*: `Provider_Type`, `Provider_Specialty`, `Discharge_Type`.
    *   *Frequency Mapping (High-Cardinality)*: `Patient_City`, `Provider_City`, `Diagnosis_Code`, `Procedure_Code` mapped to frequency counts to retain density.
3.  **Feature Engineering**: Derived `Claim_Year`, `Claim_Month`, and `Claim_Delay_Days` (difference between `Claim_Date` and `Service_Date`).
4.  **Scaling**: Scaled quantitative variables using `StandardScaler`.

### 2. Model Performance Summary
Evaluated on a 20% test split from a 20,100 record claim dataset:

| Model | Accuracy | Precision (Fraud) | Recall (Fraud) | F1-Score (Fraud) |
| :--- | :---: | :---: | :---: | :---: |
| **Random Forest** | **87.64%** | **95.41%** | **53.46%** | **68.52%** |
| **Gradient Boosting** | 87.00% | 90.00% | 55.00% | 69.00% |
| **Decision Tree** | 81.57% | 62.94% | 65.12% | 64.01% |
| **Logistic Regression**| 81.42% | 71.69% | 43.28% | 53.97% |

*Note: **Random Forest** was selected for production due to its high precision (95.4%), reducing costly false-positive fraud alerts.*

---

## 🛠️ Installation & Setup

### Backend API Setup

1.  **Navigate to the project root directory**:
    ```bash
    cd Tekwork-Project
    ```
2.  **Create and activate a virtual environment**:
    ```bash
    python -m venv venv
    # On Windows
    venv\Scripts\activate
    # On macOS/Linux
    source venv/bin/activate
    ```
3.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
4.  **Start the FastAPI server**:
    ```bash
    python main.py
    ```
    *The API will be available at [http://localhost:8000](http://localhost:8000) and the interactive API documentation can be accessed at [http://localhost:8000/docs](http://localhost:8000/docs).*

### Frontend Setup

1.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```
2.  **Install npm packages**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    *The frontend dashboard will be available at the local URL printed in your terminal (typically [http://localhost:5173](http://localhost:5173)).*

---

## 🔌 API Documentation

### 1. Welcome Endpoint
*   **Method**: `GET`
*   **Path**: `/`
*   **Response**:
    ```json
    {
      "message": "Welcome to the Healthcare Insurance Claim Fraud Detection API"
    }
    ```

### 2. Predict Endpoint
*   **Method**: `POST`
*   **Path**: `/predict`
*   **Request Body (JSON)**:
    ```json
    {
      "Claim_Amount": 1500.00,
      "Patient_Age": 45,
      "Patient_Gender": 0,
      "Patient_City": 101,
      "Patient_State": 0,
      "Provider_City": 202,
      "Provider_State": 0,
      "Diagnosis_Code": 505,
      "Procedure_Code": 909,
      "Number_of_Procedures": 1,
      "Admission_Type": 0,
      "Length_of_Stay_Days": 1,
      "Service_Type": 0,
      "Deductible_Amount": 250.00,
      "CoPay_Amount": 50.00,
      "Number_of_Previous_Claims_Patient": 0,
      "Number_of_Previous_Claims_Provider": 0,
      "Provider_Patient_Distance_Miles": 10.0,
      "Claim_Submitted_Late": 0,
      "Provider_Type_Hospital": 1,
      "Provider_Type_Laboratory": 0,
      "Provider_Type_Pharmacy": 0,
      "Provider_Type_Specialist_Office": 0,
      "Provider_Type_Urgent_Care": 0,
      "Provider_Specialty_Dermatology": 0,
      "Provider_Specialty_General_Practice": 1,
      "Provider_Specialty_Neurology": 0,
      "Provider_Specialty_Oncology": 0,
      "Provider_Specialty_Orthopedics": 0,
      "Provider_Specialty_Pediatrics": 0,
      "Provider_Specialty_Physical_Therapy": 0,
      "Provider_Specialty_Psychiatry": 0,
      "Provider_Specialty_Radiology": 0,
      "Discharge_Type_Deceased": 0,
      "Discharge_Type_Home": 1,
      "Discharge_Type_Rehab_Skilled_Nursing": 0,
      "Discharge_Type_Transfer_to_another_facility": 0,
      "Claim_Year": 2024,
      "Claim_Month": 10,
      "Claim_Delay_Days": 0
    }
    ```
*   **Response Body (JSON)**:
    ```json
    {
      "is_fraudulent": false,
      "fraud_probability": 0.08
    }
    ```

---

## 🛡️ License
ClaimShield Healthcare Systems. All systems operational.
