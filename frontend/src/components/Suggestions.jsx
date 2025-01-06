import { useEffect, useState } from "react";
import useGetSuggestion from "../hooks/useGetSuggestions"
import Spinner from "./Spinner";
import ItemCard from "./ItemCard";

const Suggestions = ({ keys }) => {
	const { loading, suggestions } = useGetSuggestion();
	const [products, setProducts] = useState([]);

	const getProducts = async () => {
		const data = await suggestions(keys);
		setProducts(data);
	}

	useEffect(() => {
		getProducts();
	}, []);
	console.log(keys);
	console.log(products);

	return (
		<div className="flex flex-col w-full items-center justify-center gap-4">
			<h1 className="text-3xl font-bold text-gray-700">Similar Product Suggestions</h1>

			<div className="flex justify-center w-full">
				{loading ? (
					<Spinner />
				) : (
					products?.length !== 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
							{products?.map((item, index) => (
								<ItemCard item={item} key={index} />
							))}
						</div>
					) : (
						<span className="text-lg text-gray-500">No suggestions available right now. Wait for updates...</span>
					)
				)}
			</div>
		</div>
	)
}

export default Suggestions