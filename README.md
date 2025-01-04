# KisanSahayak - Empowering Farmers with Smart Agriculture Solutions

**KisanSahayak** is a smart, data-driven web application designed to help farmers make informed decisions. By integrating machine learning, environmental data, advanced imaging techniques, and innovative marketplace features, we aim to provide farmers with real-time insights into rainfall patterns, crop recommendations, disease management, and more.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Mobile App Usage](#app-usage)
- [Dataset Information](#dataset-information)
- [Future Work](#future-work)
- [Team Members](#team-members)
- [License](#license)

## Project Overview
KisanSahayak offers farmers a comprehensive solution for smarter agricultural practices, utilizing cutting-edge technologies such as machine learning and computer vision. Key highlights include:
- **Rainfall & Climate Analysis:** In-depth analysis of district-wise rainfall patterns and climate variations to help farmers plan their sowing and irrigation strategies.
- **Crop Recommendations:** AI-based suggestions for optimal crops to grow, based on soil nutrients, temperature, and humidity.
- **Disease Prediction & Management:** Our system predicts potential crop diseases and offers management tips, using both traditional and advanced methods like hyperspectral imaging.
- **Voice Assistance:** A voice-enabled system that allows farmers to interact with the app hands-free, making it user-friendly for all.
- **Image Analysis for Disease Detection:** Farmers can upload photos of crops, and the app selects the best out of 3 images to analyze for disease detection.
- **Multilingual Support:** Farmers can access the platform in multiple regional languages, ensuring ease of use for everyone.
- **Trusted User Marketplace:** A secure, verified platform for farmers to sell or buy products from other farmers or retailers.
- **Disease Prediction:** The app predicts the most likely disease in a farm based on current environmental and crop conditions.

KisanSahayak aims to simplify agricultural decision-making, reduce risks, and improve yields for farmers across India.

## Features
- **Rainfall Analysis:** Understand actual vs. normal rainfall and deviation trends.
- **Crop Recommendations:** AI-based suggestions for ideal crops to grow in specific environmental conditions.
- **Disease Prediction:** Forecast potential crop diseases and offer actionable management tips.
- **Interactive Reports:** Generate detailed analysis reports from user-uploaded data.
- **Voice Assistance:** Voice-controlled features for ease of use.
- **Best Camera Angle Selection:** Automated selection of the best image out of three for better accuracy in disease detection.
- **Multilingual Support:** Access the app in various regional languages for easy navigation.
- **Trusted User System:** Farmers and retailers are verified to maintain trust and transparency in the marketplace.
- **Marketplace:** A platform for farmers to trade goods with each other or retailers, ensuring fair access to resources.
- **Most Likely Disease Prediction:** AI-powered predictions on the most probable diseases affecting the crops in a specific farm.

## Technologies Used
- **Backend:** Node JS
- **Frontend:** HTML, CSS, JavaScript, React, React Native
- **Machine Learning:** scikit-learn, pandas, TensorFlow
- **Database:** MongoDB
- **Deployment:** AWS EC2, Docker
- **Additional Technologies:** NLP for voice recognition, image processing for camera selection, multilingual integration.

## Getting Started
To get started with the project, clone the repository and install the necessary dependencies.

```bash
git clone https://github.com/yourusername/kisansahayak.git
cd kisansahayak
cd backend
npm install
cd ../frontend
npm install
cd ../ML
pip install -r requirements.txt
```

## Website Usage
Once the project is set up, you can start the web application using the following command on your root directory:

```bash
cd frontend
npm run dev
cd ../backend
npm start
cd ../ML
uvicorn app:app --reload
```

Open your browser and navigate to `http://localhost:5173/` to use the application.

## App Usage
You can also start the mobile application using the following command on your root directory:

```bash
cd android/frontend
npx expo start
cd ../../backend
npm start
cd ../ML
uvicorn app:app --reload
```

Download Expo Go app on your mobile device

- [Download for Android (Google Play Store)](https://play.google.com/store/apps/details?id=host.exp.exponent)
- [Download for iOS (App Store)](https://apps.apple.com/app/expo-go/id982107779)

After the app has started running, a QR code will be generated in your terminal or browser. Open the Expo Go app on your mobile phone and use the built-in camera or Expo Go to scan the QR code. Once scanned, the mobile app will load directly in the Expo Go app.

## Dataset Information
Our data is sourced from reliable datasets like IMD (India Meteorological Department) and district-wise agricultural reports. The data contains key features like district names, actual rainfall, normal rainfall, percentage deviation from the norm, soil nutrients (NPK), temperature, and humidity.

## Future Work
We are actively working on enhancing KisanSahayak by introducing:
- **AI-powered AR Image Assistance:** While capturing crop photos, the app will use augmented reality (AR) to guide farmers on the optimal way to take the picture for disease detection.
- **Hyperspectral Reflectance Method:** We are exploring hyperspectral imaging techniques to predict crop diseases more accurately, leveraging the reflectance properties of leaves and plants.
- **Expanded Crop and Disease Prediction Models:** Building more robust models to predict diseases in a broader range of crops and environmental conditions.

These features are in development and will be added to future versions of KisanSahayak.

## Team Members
This project is a collaborative effort by:
- **Sagnik Basak** (Team Leader) - Machine Learning Engineer & Data Analyst
- **Tamojit Das** – Full Stack Development, Application System Design & Project Manager
- **Ankan Das** – DL Model Design & Development
- **Debeshee Sen** – Full Stack Development & UI/UX Design
- **Titas Kabiraj** – Front End, UI/UX Design & Documentation
- **Ritesh Das** – Android Development & Full Stack Development

For inquiries, feel free to contact us via [kisansahayak@gmail.com](mailto:kisansahayak@gmail.com).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note:** This is a private repository, and we are not currently open to contributions. However, we will be happy to consider your ideas in the future. Stay tuned!

