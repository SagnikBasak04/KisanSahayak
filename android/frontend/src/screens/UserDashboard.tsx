import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import { selectUser } from '../../slices/userSlice';
import { useFonts } from 'expo-font';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../context/AuthContext';

const UserDashboard = () => {
	const navigation: any = useNavigation();
	const [profilePic, setProfilePic] = useState<string | "">("");
	const { authUser } = useAuthContext();

	const [loaded] = useFonts({
		Poppins: require("../../assets/fonts/Poppins/Poppins-Light.ttf"),
		PoppinsSemiBold: require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf")
	});

	const user = useSelector(selectUser);

	const crops = user?.crops?.map((crop) => crop + ", ");
	if (crops) crops[crops.length - 1] = user?.crops[crops.length - 1];

	const getProfilePic = () => {
		const ProfilePic =
			authUser.gender === "M"
				? `https://avatar.iran.liara.run/public/boy?username=${authUser.name}`
				: `https://avatar.iran.liara.run/public/girl?username=${authUser.name}`;

		setProfilePic(ProfilePic);
	};

	useEffect(() => {
		getProfilePic();
	}, []);

	if (loaded)
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ flex: 1 }}>
					<ImageBackground
						source={require('../../assets/templategreen.png')}
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							top: 0,
							bottom: 0
						}} />
					<ScrollView
						style={{
							backgroundColor: '#00000000',
							position: 'absolute',
							left: 0,
							right: 0,
							top: 0,
							bottom: 0
						}} >
						<View style={tw`flex-col`}>
							{/* Farmer Details Section */}
							<View style={tw`flex-row p-6 justify-between`}>
								<Text style={{ color: "white", fontSize: 12 }}>crops: {user?.crops?.length}</Text>
								<View style={tw`flex-row`}>
									<Icon name='phone' size={20} color="white" type='feather' />
									<Text style={{ color: "white", fontSize: 12, marginLeft: 8 }}>
										Contact No. +91-{user.phoneno}
									</Text>
								</View>
							</View>

							<View style={tw`flex-row m-6`}>
								<TouchableOpacity
									style={{
										borderWidth: 2,
										borderColor: 'rgb(34, 197, 94)',
										alignItems: 'center',
										justifyContent: 'center',
										width: 125,
										height: 125,
										backgroundColor: '#fff',
										borderRadius: 140,
										margin: 7
									}}
								>
									<Image
										source={profilePic ? { uri: profilePic } : require('../../assets/farmermale.png')}
										style={tw`h-30 w-30`}
									/>
								</TouchableOpacity>
								<View style={{ flexShrink: 1, marginTop: 40 }}>
									<Text style={{ fontFamily: "PoppinsSemiBold", color: "white", fontSize: 17 }}>{user?.name}</Text>
									<Text style={{ fontFamily: "Poppins", color: "white", fontSize: 10 }}>grows {crops}</Text>
								</View>
							</View>

							{/* Explore Section */}
							<View style={tw`flex-col mt-[100px] justify-center`}>
								<Text style={tw`self-center text-gray-600 text-xl font-semibold`}>
									EXPLORE
								</Text>
								<View style={tw`w-full mt-1 h-[7px] bg-gray-600`} />
								<View>
									<View style={tw`w-full mt-1 h-[2px] bg-gray-500`} />
								</View>

								<View style={tw`flex-col mt-2 gap-2 mb-7`}>
									<TouchableOpacity
										onPress={() => navigation.navigate("History")}
										style={tw`flex-row items-center p-4 bg-gray-300 hover:bg-gray-500 rounded-lg`}
									>
										<Icon name="clock" size={24} color="#4B5563" type="feather" />
										<Text style={tw`text-gray-600 ml-4 text-lg`}>History</Text>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => navigation.navigate("PersonalizedDashboard")}
										style={tw`flex-row items-center p-4 bg-gray-300 hover:bg-gray-500 rounded-lg`}
									>
										<Icon name='bar-chart' size={24} color="#4B5563" />
										<Text style={tw`text-gray-600 ml-4 text-lg`}>Personal Dashboard</Text>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => navigation.navigate("OthersDashboard")}
										style={tw`flex-row items-center p-4 bg-gray-300 hover:bg-gray-500 rounded-lg`}
									>
										<Icon name='location-pin' size={24} color="#4B5563" />
										<Text style={tw`text-gray-600 ml-4 text-lg`}>View Other Regions</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() => navigation.navigate("Contribute")}
										style={tw`flex-row items-center p-4 bg-gray-300 hover:bg-gray-500 rounded-lg`}
									>
										<Icon name='location-pin' size={24} color="#4B5563" />
										<Text style={tw`text-gray-600 ml-4 text-lg`}>Contribute</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</ScrollView>
				</View >
			</SafeAreaView >
		);
};

export default UserDashboard;
