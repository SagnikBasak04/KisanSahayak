/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="h-[400px] p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
      onClick={() => navigate(`/marketplace/buy/${item._id}`)}
    >
      <div className="w-full h-[270px] rounded-lg overflow-hidden">
        <img
          src={item.image_url}
          alt={item.product_name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="mt-1 flex flex-col justify-between">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {item.product_name}
        </h3>

        <p className="text-sm text-gray-600">
          <span className="font-medium">{item.seller_name}</span> |{' '}
          <span>{item.seller_type}</span> |{' '}
          <span>{new Date(item.updatedAt).toLocaleDateString()}</span>
        </p>

        <div className="mt-2 text-xl font-bold text-gray-900">
          ₹{item.price}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
