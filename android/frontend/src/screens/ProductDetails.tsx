import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import useGetItemById from '../hooks/useGetItemById';
import useHandlePay from '../hooks/useHandlePay';
import { RootStackParamList } from '../types';

interface Product {
  image_url: string;
  product_name: string;
  seller_name: string;
  seller_type: string;
  price: number;
}

const ProductDetails = () => {
  const [prodInfo, setProdInfo] = useState<Product | null>(null);
  const { payLoading, handlePay } = useHandlePay();
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetails'>>();
  const { productId } = route.params;
  const { loading, product } = useGetItemById();

  const handlePayInit = async () => {
    const response = await handlePay(prodInfo);
    if (response?.url) {
      Linking.openURL(response.url);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      const data = await product(productId);
      setProdInfo(data);
    };
    getProduct();
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 p-4`}>
      <View style={tw`items-center my-5`}>
        <Image style={tw`w-72 h-72 rounded-lg`} source={{ uri: prodInfo?.image_url }} />
      </View>
      <View style={tw`mx-5`}>
        <Text style={tw`text-2xl font-bold mb-2`}>{prodInfo?.product_name}</Text>
        <Text style={tw`text-lg text-gray-400 mb-2`}>{prodInfo?.seller_name}</Text>
        <Text style={tw`text-lg font-light mb-3`}>{prodInfo?.seller_type}</Text>
        <View style={tw`flex-row items-center mb-4`}>
          <Text style={tw`text-xl mr-1`}>₹</Text>
          <Text style={tw`text-2xl font-bold`}>{prodInfo?.price}</Text>
        </View>
        <TouchableOpacity
          style={tw`bg-blue-600 py-3 px-4 rounded-md items-center`}
          onPress={handlePayInit}
          disabled={payLoading}
        >
          <Text style={tw`text-white text-lg italic`}>CONTINUE TO PAY WITH STRIPE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;
