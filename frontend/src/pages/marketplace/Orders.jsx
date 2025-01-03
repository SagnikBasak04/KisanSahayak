import { useEffect, useState } from "react";
import useGetMyOrders from "../../hooks/useGetMyOrders";
import Navbar from "../../components/navbars/Navbar-actions";
import OrderCard from "../../components/OrderCard";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Spinner2 from "../../components/Spinner2";

const Orders = () => {
	const { loading, orders } = useGetMyOrders();
	const [myOrders, setMyOrders] = useState([]);

	const getOrders = async () => {
		const data = await orders();
		setMyOrders(data);
	}

	useEffect(() => {
		getOrders();
	}, []);

	return (
		<div>
			<Navbar />

			<div className="flex w-full px-6 items-start -mt-4">
				<Link to="/marketplace" className="flex items-center gap-1 text-lg text-gray-500  hover:text-gray-600"><IoMdArrowRoundBack /> Back</Link>
			</div>

			<div className="flex flex-col gap-3 items-center justify-center w-full">
				<h1 className="-mt-1 text-[50px] font-bold text-gray-700">Orders</h1>
				{loading ? (
					<Spinner2 />
				) : (
					<div className="w-full">
						{myOrders?.length !== 0 ? (
							<div className="flex flex-col gap-2 p-3 w-full">
								{myOrders?.slice().reverse().map((order, _idx) => (
									<OrderCard order={order} key={_idx} />
								))}
							</div>
						) : (
							<h1>No Orders yet</h1>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default Orders