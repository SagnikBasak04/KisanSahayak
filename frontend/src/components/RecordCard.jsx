import { useNavigate } from "react-router-dom";
import formattedDate from "../utils/formattedDate";

const RecordCard = ({ record }) => {
    const navigate = useNavigate();
    const date = formattedDate(record.createdAt);

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 w-90 mx-auto my-2 transition-transform transform hover:scale-105 hover:border-2 hover:border-slate-500 hover:bg-slate-100 cursor-pointer flex flex-col justify-between">
            <img
                src={record.url}
                alt={
                    record.disease
                        ? `${record.crop} affected by ${record.disease}`
                        : `${record.crop} (Healthy)`
                }
                className="w-full h-48 object-cover rounded-t-lg"
            />

            <div className="flex-grow p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Disease: {record.disease || "Healthy"}
                </h2>
                <p className="text-gray-700 text-sm mb-1">
                    <strong>Crop:</strong> {record.crop}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                    <strong>Location:</strong> {record.location}
                </p>
                <p className="text-gray-700 text-sm mb-3">
                    <strong>Date:</strong> {date}
                </p>

                <div className="mb-3">
                    <h3 className="font-semibold text-gray-800">Recommendations:</h3>
                    {record.recomm && record.recomm.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-700">
                            {record.recomm.map((rec, index) => (
                                <li key={index}>{rec}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>🌞 Your crop is thriving! No recommendations needed. 🌱</p>
                    )}
                </div>

                <div>
                    <h3 className="font-semibold text-gray-800">Pesticides:</h3>
                    {record.pesticides && record.pesticides.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-700">
                            {record.pesticides.map((pesticide, index) => (
                                <li key={index}>{pesticide}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>🥳 No pesticides required. Your crop is healthy! 🍎</p>
                    )}
                </div>
            </div>

            <div className="mt-auto">
                <button className="bg-orange-400 w-full py-1.5 rounded-lg hover:bg-orange-500 font-semibold text-lg" onClick={() => {
                    navigate(`/elevated-user/record/${record._id}`);
                }}>
                    Update
                </button>
            </div>
        </div>
    );
};

export default RecordCard;