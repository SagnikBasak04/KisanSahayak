import { useEffect, useMemo, useState } from 'react'
import { Typography, Box, InputBase, IconButton, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import "./market.css";
import useGetItems from '../../hooks/useGetItems';
import ItemCard from '../../components/ItemCard';
import Navbar from '../../components/navbars/Navbar-actions';
import Spinner2 from '../../components/Spinner2';

const FoodGalleryPage = () => {
	const { loading, items } = useGetItems();
	const [products, setProducts] = useState([]);
	const navigate = useNavigate();
	const [search, setSearch] = useState("");

	useEffect(() => {
		AOS.init({ duration: 1000, delay: 300 });
		AOS.refresh();
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const getItems = async () => {
			const data = await items();
			setProducts(data);
		}
		getItems();
	}, []);

	// Filter products based on search input
	const filteredProducts = useMemo(() => {
		return products.filter((item) =>
			item.product_name.toLowerCase().includes(search.toLowerCase())
		);
	}, [products, search]);

	return (
		<>
			<Navbar />
			<Box marginTop={5}>
				<Box display="flex" flexDirection="row">
					<Box m={5} marginTop={1} marginLeft={9} sx={{
						border: "2px solid black",
						bgcolor: "white",
						width: "650px",
					}}>
						<InputBase
							sx={{
								width: "600px",
								height: "40px",
								input: {
									cursor: "text",
									paddingLeft: "1rem",
									fontSize: "1rem",
									color: "black",
								},
							}}
							placeholder='Search for farm equipments'
							value={search}
							onChange={(e) => { setSearch(e.target.value) }}
						/>
						<IconButton>
							<SearchIcon />
						</IconButton>
					</Box>
					<Box>
						<Button variant="contained" onClick={() => navigate(`/marketplace/sell`)} sx={{
							height: "40px",
							width: "100px",
							margin: "0.5rem",
							color: "#fff",
							"&:hover": {
								backgroundColor: "#000"
							}
						}}>
							<Typography style={{ fontFamily: "Montserrat", fontWeight: "500" }}>
								SELL
							</Typography>
						</Button>

						<Button variant="contained" onClick={() => navigate(`/marketplace/my-listings`)} sx={{
							height: "40px",
							width: "100px",
							margin: "0.5rem",
							color: "#fff",
							"&:hover": {
								backgroundColor: "#000"
							}
						}}>
							<Typography style={{ fontFamily: "Montserrat", fontWeight: "500" }}>
								MY LISTINGS
							</Typography>
						</Button>

						<Button variant="contained" onClick={() => navigate(`/marketplace/orders`)} sx={{
							height: "40px",
							width: "100px",
							margin: "0.5rem",
							color: "#fff",
							"&:hover": {
								backgroundColor: "#000"
							}
						}}>
							<Typography style={{ fontFamily: "Montserrat", fontWeight: "500" }}>
								MY ORDERS
							</Typography>
						</Button>

						{/* Sentry Test button */}
						{/*<button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>*/}
					</Box>
				</Box>
				{loading ? (
					<div className='flex items-center justify-center w-full h-screen -mt-32'>
						<Spinner2 />
					</div>
				) : (
					<>
						{filteredProducts.length > 0 && (
							<div className='flex justify-center w-full px-8 mt-10 mb-8'>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
									{filteredProducts.map((item, index) => (
										<ItemCard item={item} key={index} />
									))}
								</div>
							</div>
						)}
						{filteredProducts.length === 0 && !loading && (
							<div className='flex w-full items-center justify-center'>
								<span className="text-lg text-gray-500">No product in Market right now. Wait for updates...</span>
							</div>
						)}
					</>
				)}
			</Box>
		</>
	)
}

export default FoodGalleryPage;
