/* eslint-disable react/prop-types */
const Predictions = ({ data }) => {
  return (
    <div className="flex flex-col gap-2 bg-slate-300 text-gray-800 rounded-lg p-3 shadow-xl w-70 mx-auto lg:w-[500px]">
      {/* Disease Section */}
      <div>
        <p className="font-bold text-lg">Disease: {data.disease || "Healthy"}</p>
        <p className="font-normal px-2">
          {data.disease_details && data.disease_details.length > 0 ? (
            data.disease_details.map((el, idx) => (
              <span key={idx}>{el}&nbsp;</span>
            ))
          ) : (
            <span>🌟 No disease details available. Your crop is doing well! 🌱</span>
          )}
        </p>
      </div>

      {/* Crop Section */}
      <div>
        <p className="font-semibold text-lg">Crop: {data.crop}</p>
      </div>

      {/* Recommendation Section */}
      <div>
        <p className="font-medium">Recommendation:</p>
        {data.recomm && data.recomm.length > 0 ? (
          <ul className="pl-2 list-disc list-inside">
            {data.recomm.map((el, idx) => (
              <li key={idx}>{el}</li>
            ))}
          </ul>
        ) : (
          <p>
            🌞 Everything looks great! No recommendations needed. Keep it up! 🌱
          </p>
        )}
      </div>

      {/* Pesticides Section */}
      <div>
        <p className="font-medium">Pesticides:</p>
        {data.pesticides && data.pesticides.length > 0 ? (
          <ul className="pl-2 list-disc list-inside">
            {data.pesticides.map((el, idx) => (
              <li key={idx}>{el}</li>
            ))}
          </ul>
        ) : (
          <p>
            🥳 No pesticides required. Your crop is healthy and thriving! 🍎
          </p>
        )}
      </div>
    </div>
  );
};

export default Predictions;
