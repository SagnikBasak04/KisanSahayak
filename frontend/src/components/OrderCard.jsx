const OrderCard = ({order}) => {
	return (
		<div className="p-2 bg-gray-300 rounded-lg flex gap-2">
			<img src={order.image_url} alt={order.product_id} className="h-[150px] w-[160px] rounded-md" />

			<div className="flex justify-between w-full">
				<div className="flex flex-col max-w-[150px] lg:max-w-[300px]">
					<h1 className="font-bold text-xl mb-1">Product Details</h1>
					<span className="font-semibold text-xl">{order.product_name}</span>
					<span className="text-gray-700">{order.seller_name}</span>
					<span className="text-sm text-gray-600">{order.seller_type}</span>
					<span className="text-sm text-gray-500 break-words">id: {order.product_id}</span>
				</div>

				<div className="flex flex-col max-w-[200px] lg:max-w-[300px] mr-2">
					<h1 className="font-bold text-xl mb-1 break-words">Customer Details</h1>
					<span className="font-normal text-xl break-words">{order.customer_name}</span>
					<span className="text-gray-700 whitespace-normal break-words">{order.customer_email}</span>
					<span className="text-sm text-gray-500 break-words">{order.customer_mobile}</span>
				</div>

				<div className="flex flex-col max-w-[200px]">
					<h1 className="font-bold text-xl mb-1">Delivery</h1>
					<span className="font-normal text-md whitespace-normal">{order.delivery}</span>
					<div className="mt-1">
						<span className="text-[22px] text-gray-600">Amount: </span>
						<span className="font-semibold text-[22px]">₹{order.amount}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default OrderCard