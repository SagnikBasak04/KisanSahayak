import React, { useEffect, useMemo, useState } from 'react';
import { Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import useGetItems from '../hooks/useGetItems';
import ItemCard from "../components/ItemCard";
import { Product, RootStackParamList } from '../types';

const MarketPlace = () => {
	const { loading, items } = useGetItems();
    
	const [products, setProducts] = useState<Product[]>([]);
	const [search, setSearch] = useState('');
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	useEffect(() => {
		const getItems = async () => {
			const data = await items();
            console.log(data);
            
			setProducts(data);
		};
		getItems();
	}, []);

	const filteredProducts = useMemo(() => {
        if (!products) return;
		return products.filter((item) =>
			item.product_name.toLowerCase().includes(search.toLowerCase())
		);
	}, [products, search]);

	return (
		<View style={tw`flex-1 pt-2 bg-white`}>
			<View style={tw`m-2 border border-black rounded p-1`}>
				<TextInput
					style={tw`h-10 px-2 text-base`}
					placeholder="Search for farm equipment"
					value={search}
					onChangeText={(text) => setSearch(text)}
				/>
			</View>
			<View style={tw`flex-row justify-around my-2`}>
				<Button
					title="SELL"
					color="#0000ff"
					onPress={() => navigation.navigate('Sell')}
				/>
				<Button
					title="MY LISTINGS"
					color="#0000ff"
					onPress={() => navigation.navigate('MyListings')}
				/>
			</View>
			{loading ? (
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				<FlatList
					data={filteredProducts}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => <ItemCard item={item} />}
					contentContainerStyle={tw`p-2`}
				/>
			)}
		</View>
	);
};

export default MarketPlace;
