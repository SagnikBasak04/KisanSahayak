import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadToCloudinary } from '../utils/uploadToCloudinary';
import useSellProduct from '../hooks/useSellProduct';
import tw from 'twrnc';

const MarketplaceSell = () => {
    const [url, setUrl] = useState<string | null>(null);
	const [inputs, setInputs] = useState({
		product_name: '',
		image_url: '',
		seller_name: '',
		seller_type: '',
		price: ''
	});
    console.log(inputs);
    
	const [uploadData, setUploadData] = useState(null);
	const [uploading, setUploading] = useState(false);
	const { loading, sell } = useSellProduct();

	const openCamera = async () => {
		const { status } = await ImagePicker.requestCameraPermissionsAsync();
		if (status !== 'granted') {
			Alert.alert('Camera permissions are required to take a photo.');
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled && result.assets.length > 0) {
			setUrl(result.assets[0].uri);
            console.log(inputs);
		}
	};

	const handleUploadToCloudinary = async () => {
		setUploading(true);
		try {
			const glbUrl = await uploadToCloudinary(url);
			setUploadData(glbUrl);
			setInputs({ ...inputs, image_url: glbUrl });
		} catch (error) {
			console.error("Error in uploading image", error);
		} finally {
			setUploading(false);
		}
	};

	const handleSubmit = async () => {
		await sell(inputs);
	};

	return (
		<View style={tw`flex p-4 gap-1 flex-row`}>
			<View style={tw`w-1/2 h-auto flex flex-col items-center justify-center border-2 border-dashed border-blue-600 p-4`}>
				{url ? (
					<Image source={{ uri: url }} style={tw`w-full h-40`} />
				) : (
					<TouchableOpacity
						style={tw`w-1/2 mt-6 rounded-2xl p-2 bg-blue-700`}
						onPress={openCamera}
					>
						<Text style={tw`text-white font-medium text-center`}>Take a Picture</Text>
					</TouchableOpacity>
				)}
				{url && !uploadData && (
					<View style={tw`flex flex-row gap-2 w-full`}>
						<TouchableOpacity
							style={tw`w-1/2 mt-6 rounded-2xl p-2 bg-blue-700`}
							onPress={() => setUrl(null)}
						>
							<Text style={tw`text-white font-medium text-center`}>Refresh</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={tw`w-1/2 mt-6 rounded-2xl p-2 bg-blue-700`}
							disabled={uploading}
							onPress={handleUploadToCloudinary}
						>
							{uploading ? <ActivityIndicator color="#fff" /> : <Text style={tw`text-white font-medium text-center`}>Upload</Text>}
						</TouchableOpacity>
					</View>
				)}
			</View>

			<View style={tw`w-1/2`}>
				<Text style={tw`text-2xl font-bold`}>INPUT DETAILS</Text>
				<View style={tw`mt-4`}>
					<TextInput
						style={tw`border p-2 mb-4`}
						placeholder="Enter name of crop here"
						value={inputs.product_name}
						onChangeText={(text) => setInputs({ ...inputs, product_name: text })}
					/>

					<View style={tw`flex flex-row justify-around mb-4`}>
						<TouchableOpacity
							style={tw`flex flex-row items-center`}
							onPress={() => setInputs({ ...inputs, seller_type: 'retailer' })}
						>
							<Text style={tw`mr-2`}>Retailer</Text>
							<Text style={tw`mr-2`}>{inputs.seller_type === 'retailer' ? '✔️' : ''}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={tw`flex flex-row items-center`}
							onPress={() => setInputs({ ...inputs, seller_type: 'farmer' })}
						>
							<Text style={tw`mr-2`}>Farmer</Text>
							<Text style={tw`mr-2`}>{inputs.seller_type === 'farmer' ? '✔️' : ''}</Text>
						</TouchableOpacity>
					</View>

					{inputs.seller_type === "farmer" ? (
						<TextInput
							style={tw`border p-2 mb-4`}
							placeholder="Enter your name here"
							value={inputs.seller_name}
							onChangeText={(text) => setInputs({ ...inputs, seller_name: text })}
						/>
					) : inputs.seller_type === "retailer" ? (
						<TextInput
							style={tw`border p-2 mb-4`}
							placeholder="Enter the name of your Enterprise"
							value={inputs.seller_name}
							onChangeText={(text) => setInputs({ ...inputs, seller_name: text })}
						/>
					) : null}

					<TextInput
						style={tw`border p-2 mb-4`}  // Removed outline class
						placeholder="Enter price of crop here"
						value={inputs.price}
						onChangeText={(text) => setInputs({ ...inputs, price: text })}
					/>

					<TouchableOpacity
						style={tw`bg-blue-700 p-2 rounded-2xl`}
						onPress={handleSubmit}
						disabled={loading}
					>
						{loading ? <ActivityIndicator color="#fff" /> : <Text style={tw`text-white font-medium text-center`}>Sell</Text>}
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

export default MarketplaceSell;
