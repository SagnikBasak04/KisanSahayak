import React, { Component, useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Icon } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import tw from "twrnc";
import { selectUser, setPredictionData } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import * as Speech from "expo-speech";
import { BarChart } from "react-native-chart-kit";
import Predict from "../hooks/predict";
import useGetAnalysis from "../hooks/analysis";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";
//import toast from 'react-hot-toast';

LogBox.ignoreLogs(["Warning: ..."]);

interface AnalysisData {
  predictions: {
    crops: string[];
  };
}

const chartConfig = {
  backgroundColor: "#3437eb",
  backgroundGradientFrom: "#006aff",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#82b6ff",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 10, // optional, default 3
  barPercentage: 1.5,
  useShadowColorFromDataset: false, // optional
};

const Home = () => {
  const [loaded] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
    Montserratm: require("../../assets/fonts/Montserrat/static/Montserrat-Medium.ttf"),
  });

  const [uploading, setUploading] = useState(false);
  const [predicting, setPredicting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [uploadData, setUploadData] = useState<string[]>([]);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const maleVoice = "en-us-x-sfg#male_1-local";

  const { getPredictions } = Predict();
  const { analysis } = useGetAnalysis();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleVoice = () => {
    Speech.speak(
      predictionsData.disease_details[0] + predictionsData.disease_details[1] ||
        `Your crop ${predictionsData.crop} is healthy`,
      {
        // language: "bn-IN",
        pitch: 0.0,
        rate: 1.0,
        voice: maleVoice,
      }
    );
  };

  const getAnalysis = async () => {
    try {
      const res = await analysis();
      console.log("analysis: ", res);
      setAnalysisData(res);
    } catch (err) {
      console.log(err);
    }
  };

  const [predictionsData, setPredictionsData] = useState(
    {} as {
      crop: string;
      disease: string;
      disease_details: string[];
      hum: number;
      location: string;
      pesticides: string[];
      rainAct: number;
      rainDep: number;
      rainNorm: number;
      recomm: string[];
      soil_K: number;
      soil_N: number;
      soil_P: number;
      soil_pH: number;
      temp: number;
    }
  );

  const data = {
    labels: ["Actual Rainfall", "Normal Rainfall", "% DEP"],
    datasets: [
      {
        data: [
          predictionsData?.rainAct,
          predictionsData?.rainNorm,
          predictionsData?.rainDep,
        ],
      },
    ],
  };

  const soilData = {
    labels: ["Nitrogen", "Potassium", "Phosphorus", "pH"],
    datasets: [
      {
        data: [
          predictionsData?.soil_N,
          predictionsData?.soil_K,
          predictionsData?.soil_P,
          predictionsData?.soil_pH,
        ],
      },
    ],
  };

  const sources = [
    {
      name: "wheat",
      require: require("../../assets/wheat.png"),
    },
    {
      name: "mustard",
      require: require("../../assets/mustard.png"),
    },
    {
      name: "rice",
      require: require("../../assets/rice.png"),
    },
    {
      name: "potato",
      require: require("../../assets/potato.png"),
    },
    {
      name: "corn",
      require: require("../../assets/corn.png"),
    },
    {
      name: "sugarcane",
      require: require("../../assets/sugarcane.png"),
    },
  ];

  const registeredCropsSource: { name: string; require: any }[] = [];

  sources.map((crops) => {
    if (user?.crops?.includes(crops.name)) registeredCropsSource.push(crops);
  });

  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(
        cameraStatus.status === "granted" && galleryStatus.status === "granted"
      );
    })();
  }, []);

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };
  const choosePhotoFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

  const handleUploadToCloudinary = async () => {
    try {
      setUploading(true);
      const uploadPromises = images.map(async (imageBlob) => {
        console.log(imageBlob);
        const cloudinaryUrl = await uploadToCloudinary(imageBlob);
        return cloudinaryUrl;
      });

      const cloudinaryUrls = await Promise.all(uploadPromises);
      setUploadData((prevData) => [...prevData, ...cloudinaryUrls]);
      setUploading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error in uploading image", error.message);
        //toast.error(error.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  };

  // const choosePhotoFromGallery = async () => {
  //   const image = await launchCamera({
  //     mediaType: "photo"
  //   });
  //   setImg(img);
  //   console.log(img);
  // }
  const handlePredictions = async () => {
    try {
      setPredicting(true);
      const predData = await getPredictions(uploadData);
      setPredictionsData(predData);
      setPredicting(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePredict = () => {
    if (uploadData) handlePredictions();
    getAnalysis();
    // setPredictionsData(data);
    // dispatch(setPredictionData(data));
  };

  const handleDeleteImages = () => {
    setImages([]);
    setUploadData([]);
  };

  if (loaded)
    return (
      <ScrollView style={tw`bg-white`}>
        <View style={tw`flex-col bg-white`}>
          <View style={tw`flex-row`}>
            {registeredCropsSource.map((crops) => {
              return (
                <View style={tw`flex-col items-center`}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 2,
                      borderColor: "rgb(34, 197, 94)",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 60,
                      height: 60,
                      backgroundColor: "#fff",
                      borderRadius: 50,
                      margin: 7,
                    }}
                  >
                    <Image
                      key={crops.name}
                      source={crops.require}
                      style={tw`h-10 w-10`}
                    />
                  </TouchableOpacity>
                  <Text key={crops.name}>{crops.name}</Text>
                </View>
              );
            })}
          </View>
          <Text style={tw`text-xl m-4 mb-2 pl-4`}>
            <Text style={{ fontFamily: "Montserrat", fontSize: 17 }}>
              Revitalize Your Fields
            </Text>
          </Text>
          <View style={tw`m-3 pt-4 shadow-md bg-white`}>
            <View style={tw`flex-row self-center mb-5`}>
              <View style={tw`flex-col self-center`}>
                <Image
                  source={require("../../assets/takepic.png")}
                  style={tw`h-20 w-20`}
                />
                <Text style={tw`mt-7`}>Take a picture</Text>
              </View>
              <View style={tw`my-7 mx-2`}>
                <Icon
                  name="arrow-right"
                  size={20}
                  color="black"
                  type="entypo"
                />
              </View>
              <View style={tw`flex-col self-center`}>
                <Image
                  source={require("../../assets/report.png")}
                  style={tw`h-20 w-20`}
                />
                <Text style={tw`mt-7`}>View Insights</Text>
              </View>
              <View style={tw`my-7 mx-2`}>
                <Icon
                  name="arrow-right"
                  size={20}
                  color="black"
                  type="entypo"
                />
              </View>
              <View style={tw`flex-col self-center`}>
                <Image
                  source={require("../../assets/harvest.png")}
                  style={tw`h-20 w-20`}
                />
                <Text style={tw`mt-2`}>Optimize your farming</Text>
                <Text>practices and secure</Text>
                <Text>a bountiful harvest</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={tw`m-3`}
            disabled={images.length > 2}
            onPress={openCamera}
          >
            <View style={tw`h-15 w-70 bg-black shadow-md self-center`}>
              <Text
                style={{
                  fontFamily: "Montserratm",
                  color: "white",
                  margin: "auto",
                  fontSize: 18,
                }}
              >
                Take a picture
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={choosePhotoFromGallery}
            disabled={images.length > 2}
            style={tw`mb-3`}
          >
            <View style={tw`h-15 w-70 bg-green-500 shadow-md self-center`}>
              <Text
                style={{
                  fontFamily: "Montserratm",
                  color: "white",
                  margin: "auto",
                  fontSize: 18,
                }}
              >
                Choose from gallery
              </Text>
            </View>
          </TouchableOpacity>
          {images.length < 3 && (
            <View style={tw`self-center`}>
              <Text>Please take three pictures to proceed further</Text>
            </View>
          )}
          <View style={tw`flex-row self-center`}>
            {images.length > 0 && (
              <Image
                source={{ uri: images[0] }}
                style={tw`self-center h-20 w-20 mr-3`}
              />
            )}
            {images.length > 0 && (
              <Image
                source={{ uri: images[1] }}
                style={tw`self-center h-20 w-20 mr-3`}
              />
            )}
            {images.length > 0 && (
              <Image
                source={{ uri: images[2] }}
                style={tw`self-center h-20 w-20`}
              />
            )}
            {images.length > 2 && (
              <TouchableOpacity onPress={handleDeleteImages} style={tw`mb-3`}>
                <View style={tw`p-2`}>
                  <Icon
                    name="delete"
                    size={15}
                    color="#a3a3a3"
                    type="antdesign"
                  />
                  <Text style={tw`text-[#a3a3a3] text-xs`}>Delete</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          {images.length > 2 && (
            <TouchableOpacity
              onPress={handleUploadToCloudinary}
              disabled={uploadData.length > 2}
              style={tw`mb-2`}
            >
              <View
                style={tw`h-15 w-70 m-3 bg-blue-500 shadow-md flex-row self-center`}
              >
                <Text
                  style={{
                    fontFamily: "Montserratm",
                    color: "white",
                    margin: "auto",
                    fontSize: 18,
                  }}
                >
                  {uploading ? "Uploading" : "Upload"}
                </Text>
                {uploading && (
                  <ActivityIndicator size="large" style={{ marginLeft: 10 }} />
                )}
              </View>
            </TouchableOpacity>
          )}
          {images.length > 2 && uploadData.length > 2 && (
            <TouchableOpacity onPress={handlePredict} style={tw`mb-2`}>
              <View
                style={tw`h-15 w-70 bg-black shadow-md flex-row self-center`}
              >
                <Text
                  style={{
                    fontFamily: "Montserratm",
                    color: "white",
                    margin: "auto",
                    fontSize: 18,
                  }}
                >
                  {predicting ? "Predicting" : "Predict"}
                </Text>
                {predicting && (
                  <ActivityIndicator size="large" style={{ marginLeft: 10 }} />
                )}
              </View>
            </TouchableOpacity>
          )}
          {Object.keys(predictionsData)?.length > 0 && (
            <View>
              <View style={tw`p-3 pl-12`}>
                <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}>
                  {predictionsData?.disease.replace(/_/g, " ")}
                </Text>
                <TouchableOpacity onPress={handleVoice}>
                  <View style={tw`flex-row gap-1`}>
                    <Icon
                      name="sound"
                      size={20}
                      color="#1d4ed8"
                      type="antdesign"
                    />
                    <Text
                      style={{ fontFamily: "Montserrat", color: "#1d4ed8" }}
                    >
                      Listen to predictions voice-over
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={tw`self-center flex-col gap-y-2`}>
                <Text style={tw`flex-col`}>
                  Crop Name: {predictionsData?.crop}
                </Text>
                <Text>
                  Disease: {predictionsData?.disease.replace(/_/g, " ")}
                </Text>
                {predictionsData?.disease_details.length > 0 && (
                  <Text style={tw`w-70`}>
                    Disease details: {predictionsData?.disease_details}
                  </Text>
                )}
                {predictionsData?.pesticides.length > 0 && (
                  <Text style={tw`w-70`}>
                    Pesticides:{" "}
                    {predictionsData?.pesticides.map((pest) => `${pest}, `)}
                  </Text>
                )}
                {predictionsData?.recomm.length > 0 === null && (
                  <Text style={tw`w-70`}>
                    Recommendations: {predictionsData?.recomm}
                  </Text>
                )}
              </View>
            </View>
          )}
          {Object.keys(predictionsData)?.length > 0 && (
            <View style={tw`mt-7`}>
              <Text style={{ alignSelf: "center" }}>Annual Rainfall</Text>
              <BarChart
                style={{ marginVertical: 8 }}
                data={data}
                width={390}
                height={220}
                yAxisLabel=""
                yAxisSuffix="mm"
                yLabelsOffset={0}
                xLabelsOffset={0}
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                horizontalLabelRotation={0}
              />
            </View>
          )}
          {Object.keys(predictionsData)?.length > 0 && (
            <View style={tw`mt-7`}>
              <Text style={{ alignSelf: "center" }}>Regional Soil Quality</Text>
              <BarChart
                style={{ marginVertical: 8 }}
                data={soilData}
                width={390}
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yLabelsOffset={0}
                xLabelsOffset={0}
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                horizontalLabelRotation={0}
              />
            </View>
          )}
          {Object.keys(predictionsData)?.length > 0 && (
            <View style={{ alignSelf: "center" }}>
              <Text>Most suitable crops you can grow</Text>
              {analysisData?.predictions?.crops.map((crop, index) => (
                <Text style={tw`mx-2 mt-2`} key={index}>
                  • {crop}
                </Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    );
};

export default Home;
