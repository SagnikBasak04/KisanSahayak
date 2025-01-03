import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGetItemById from '../../hooks/useGetItemById';
import Navbar from '../../components/navbars/Navbar-actions';
import useHandlePay from '../../hooks/useHandlePay';
import Spinner from '../../components/Spinner';
import Spinner2 from '../../components/Spinner2';
import { IoMdArrowRoundBack } from 'react-icons/io';

const MarketplaceBuy = () => {
	const [prodInfo, setProdInfo] = useState(null);
	const { payLoading, handlePay } = useHandlePay();
	const { id } = useParams();
	const { loading, product } = useGetItemById();

	const handlePayInit = async () => {
		const response = await handlePay(prodInfo);

		if (response.url) {
			window.location.href = response.url;
		}
	};

	const getProduct = async () => {
		const data = await product(id);
		setProdInfo(data);
	};

	useEffect(() => {
		getProduct();
	}, []);

	return (
		<>
			<Navbar />

			<div className="flex w-full px-6 items-start -mt-4">
				<Link to="/marketplace" className="flex items-center gap-1 text-lg text-gray-500  hover:text-gray-600"><IoMdArrowRoundBack /> Back</Link>
			</div>

			<div className="flex flex-col items-center px-4 py-8">
				{loading ? (
					<Spinner2 />
				) : (
					<div className="flex flex-col lg:flex-row items-center w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">

						<div className="w-full lg:w-1/2 p-4">
							<img src={prodInfo?.image_url} alt={prodInfo?.product_name} className="w-full md:h-[600px] lg:h-auto rounded-md shadow-md" />
						</div>

						<div className="w-full lg:w-1/2 p-6">
							<h1 className="text-2xl font-semibold mb-4">{prodInfo?.product_name}</h1>
							<p className="text-gray-600 mb-2">
								Sold by: <strong>{prodInfo?.seller_name}</strong> ({prodInfo?.seller_type})
							</p>
							<p className="text-3xl font-bold text-blue-600 mb-6">₹{prodInfo?.price}</p>

							<button
								className={`w-full py-3 px-6 text-white text-lg font-bold rounded-md ${payLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
								onClick={handlePayInit}
								disabled={payLoading}
							>
								{payLoading ? <Spinner /> : 'Continue to Pay with Stripe'}
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default MarketplaceBuy;
