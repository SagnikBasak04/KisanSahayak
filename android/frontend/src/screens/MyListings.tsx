import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import useGetMySellings from "../hooks/useGetMySellings";
import ItemCard from "../components/ItemCard";
import tw from "twrnc";

const MyListings = () => {
  const [listings, setListings] = useState<any[]>([]);
  const { loading, sellings } = useGetMySellings();

  const getListings = async () => {
    const data = await sellings();
    setListings(data);
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <View style={tw`p-4 bg-white`}>
      <Text style={tw`mt-3 text-4xl font-bold text-gray-700`}>My Listings</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={tw`mt-5`} />
      ) : listings && listings.length > 0 ? (
        <FlatList
          data={listings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ItemCard item={item} />}
          contentContainerStyle={tw`p-4`}
          numColumns={2}
        />
      ) : (
        <Text style={tw`text-lg mt-5`}>No listings found</Text>
      )}
    </View>
  );
};

export default MyListings;
