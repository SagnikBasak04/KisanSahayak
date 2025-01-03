import formattedDate from "../utils/formattedDate";

const HistoryCard = ({ history }) => {
    const date = formattedDate(history.createdAt);
  
    return (
      <div className="bg-gradient-to-br from-gray-300 to-gray-200 shadow-lg rounded-lg p-4 w-90 mx-auto my-4 backdrop-blur-lg">
        <img
          src={history.url}
          alt={history.disease ? `${history.crop} affected by ${history.disease}` : `${history.crop} (Healthy)`}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Disease: {history.disease || "Healthy"}
          </h2>
          <p className="text-gray-700 text-sm mb-1">
            <strong>Crop:</strong> {history.crop}
          </p>
          <p className="text-gray-700 text-sm mb-1">
            <strong>Location:</strong> {history.location}
          </p>
          <p className="text-gray-700 text-sm mb-3">
            <strong>Date:</strong> {date}
          </p>
  
          <div className="mb-3">
            <h3 className="font-semibold text-gray-800">Recommendations:</h3>
            {history.recomm && history.recomm.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {history.recomm.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            ) : (
              <p>
                🌞 Your crop is thriving! No recommendations needed. 🌱
              </p>
            )}
          </div>
  
          <div>
            <h3 className="font-semibold text-gray-800">Pesticides:</h3>
            {history.pesticides && history.pesticides.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {history.pesticides.map((pesticide, index) => (
                  <li key={index}>{pesticide}</li>
                ))}
              </ul>
            ) : (
              <p>
                🥳 No pesticides required. Your crop is healthy! 🍎
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default HistoryCard;
  