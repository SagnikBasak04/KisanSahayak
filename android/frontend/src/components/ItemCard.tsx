import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ItemCardProps = {
	item: {
		_id: string;
		image_url: string;
		product_name: string;
		seller_name: string;
		seller_type: string;
		updatedAt: string;
		price: number;
	};
};

const ItemCard = ({ item }: ItemCardProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<TouchableOpacity
			style={tw`bg-white rounded-lg shadow-lg m-3`}
			onPress={() => navigation.navigate("ProductDetails", { productId: item._id })}
		>
			<Image source={{ uri: item.image_url }} style={tw`w-full h-52 rounded-t-lg`} />
			<View style={tw`p-4`}>
				<Text style={tw`text-lg font-light text-black mb-2`}>{item.product_name}</Text>
				<View style={tw`flex-row justify-between items-center mt-2`}>
					<Text style={tw`text-xs font-thin text-black`}>
						{item.seller_name} | {item.seller_type} | {item.updatedAt}
					</Text>
					<Text style={tw`text-base font-medium text-black`}>₹{item.price}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ItemCard;
