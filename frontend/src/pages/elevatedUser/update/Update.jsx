import { useParams } from "react-router-dom";
import useGetRecordById from "../../../hooks/getRecordById";
import { useEffect, useState } from "react";
import Navbar from "../../../components/navbars/Navbar-actions";
import Spinner from "../../../components/Spinner";
import HistoryCard from "../../../components/HistoryCard";
import RainfallChart from "../../../components/analytics/RainfallChart";
import SoilChart from "../../../components/analytics/SoilChart";
import useUpdateRecord from "../../../hooks/useUpdateRecord";
import kelvinToCelsius from "../../../utils/kelvinToCelcius";

const Update = () => {
  const { id } = useParams();
  const { loading, record } = useGetRecordById();
  const [recordData, setRecordData] = useState(null);
  const { enLoading, update } = useUpdateRecord();
  const [weatherData, setWeatherData] = useState({
    ACTUAL: 0.0,
    NORMAL: 0.0,
    DEP: 0.0,
  });
  const [soilData, setSoilData] = useState({
    N: 0.0,
    P: 0.0,
    K: 0.0,
    pH: 0.0,
  });
  const [formData, setFormData] = useState({
    id: "",
    crop: "",
    disease: "",
    disease_details: [],
    recomm: [],
    pesticides: [],
  });

  const getRecordData = async () => {
    if (id) {
      const data = await record(id);
      if (data) {
        setRecordData(data);

        setWeatherData({
          ACTUAL: data.rainAct || 0.0,
          NORMAL: data.rainNorm || 0.0,
          DEP: data.rainDep || 0.0,
        });

        setSoilData({
          N: data.soil_N || 0.0,
          P: data.soil_P || 0.0,
          K: data.soil_K || 0.0,
          pH: data.soil_pH || 0.0,
        });

        setFormData({
          id: data._id || "",
          crop: data.crop || "",
          disease: data.disease || "",
          disease_details: data.disease_details || [],
          recomm: data.recomm || [],
          pesticides: data.pesticides || [],
        });
      }
    }
  };

  useEffect(() => {
    getRecordData();
  }, []);
  console.log(recordData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayInputChange = (e, fieldName, index) => {
    const newValue = e.target.value;
    setFormData((prevData) => {
      const updatedArray = [...prevData[fieldName]];
      updatedArray[index] = newValue;
      return {
        ...prevData,
        [fieldName]: updatedArray,
      };
    });
  };

  const handleAddItem = (fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: [...prevData[fieldName], ""],
    }));
  };

  const handleRemoveItem = (fieldName, index) => {
    setFormData((prevData) => {
      const updatedArray = [...prevData[fieldName]];
      updatedArray.splice(index, 1);
      return {
        ...prevData,
        [fieldName]: updatedArray,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await update(formData);
    setRecordData(data);
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto flex flex-col items-center py-10 px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-700 mb-8">Update & Contribute</h1>

        <div className="flex flex-col md:flex-row lg:gap-[80px] md:gap-[40px] w-full justify-center items-center">
          {loading ? (
            <Spinner />
          ) : (
            recordData && (
              <>
                {/* HistoryCard Section */}
                <div className="flex-1">
                  <HistoryCard history={recordData} />
                </div>

                {/* Charts Section */}
                <div className="flex-1 flex flex-col gap-6">
                  <div className="flex-1 w-full">
                    <RainfallChart data={weatherData} />
                  </div>
                  <div className="flex-1 w-full">
                    <SoilChart data={soilData} />
                  </div>

                  <div className="flex w-full justify-center gap-4">
                    <div>
                      <span className="text-gray-500 text-lg">Humidity: </span>
                      <span className="font-semibold text-lg">{recordData.hum}</span>
                    </div>

                    <div>
                      <span className="text-gray-500 text-lg">Temerature: </span>
                      <span className="font-semibold text-lg">{kelvinToCelsius(recordData.temp)}</span>
                    </div>
                  </div>
                </div>
              </>
            )
          )}
        </div>

        <form className="w-11/12 lg:w-10/12 xl:w-9/12 bg-white p-6 shadow-md rounded-lg mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Crop</label>
            <input
              type="text"
              name="crop"
              value={formData.crop}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Disease</label>
            <input
              type="text"
              name="disease"
              value={formData.disease}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Disease Details</label>
            {formData.disease_details.map((detail, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => handleArrayInputChange(e, "disease_details", index)}
                  className="w-full p-2 border rounded"
                />
                <button type="button" onClick={() => handleRemoveItem("disease_details", index)} className="text-red-500 hover:bg-transparent">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddItem("disease_details")} className="text-blue-500 mt-2 hover:bg-transparent hover:text-blue-700 hover:font-semibold">Add Detail</button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Recommendations</label>
            {formData.recomm.map((rec, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={rec}
                  onChange={(e) => handleArrayInputChange(e, "recomm", index)}
                  className="w-full p-2 border rounded"
                />
                <button type="button" onClick={() => handleRemoveItem("recomm", index)} className="text-red-500 hover:bg-transparent">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddItem("recomm")} className="text-blue-500 mt-2 hover:bg-transparent hover:text-blue-700 hover:font-semibold">Add Recommendation</button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Pesticides</label>
            {formData.pesticides.map((pesticide, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={pesticide}
                  onChange={(e) => handleArrayInputChange(e, "pesticides", index)}
                  className="w-full p-2 border rounded"
                />
                <button type="button" onClick={() => handleRemoveItem("pesticides", index)} className="text-red-500 hover:bg-transparent">Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddItem("pesticides")} className="text-blue-500 mt-2 hover:bg-transparent hover:text-blue-700 hover:font-semibold">Add Pesticide</button>
          </div>

          {enLoading ? (
            <Spinner />
          ) : (
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded font-bold mt-4" disabled={enLoading}>Update</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Update;