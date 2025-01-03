import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { env_data } from "../data/Rainfall_Soil.json";
import { Icon } from "@rneui/themed";
import { RegionalDashboardNavigationProp } from "../types";

const DashboardList = () => {
    const [searchedRegions, setSearchedRegions] = useState<any[]>([]);
    const [searchEle, setSearchEle] = useState<string>("");

    const navigation = useNavigation<RegionalDashboardNavigationProp>();

    const images = [require("../../assets/Vector2.png"), require("../../assets/vector3.png")];

    const handleSearch = () => {
        setSearchedRegions([]);
        const data = env_data.filter((data) =>
            data.District.toLowerCase().includes(searchEle.toLowerCase().trim())
        );
        setSearchedRegions(data);
    };

    const renderRegionItem = ({ item, index }: any) => {
        const imgSrc = images[index % 2];
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('RegionalDashboard', { district: item.District });
                }}
                style={styles.regionCard}
                key={index}
            >
                <View style={styles.imageContainer}>
                    <Image source={imgSrc} style={styles.image} />
                </View>
                <Text style={styles.regionName}>{item.District}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Other Regions</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search any region here..."
                    value={searchEle}
                    onChangeText={(text) => {
                        setSearchEle(text);
                        handleSearch();
                    }}
                />
                <Icon
                    name="search"
                    type="feather"
                    size={24}
                    color="#4B4B4B"
                    containerStyle={styles.searchIconContainer}
                />
            </View>

            <View style={styles.itemContainer}>
                <FlatList
                    data={searchEle ? searchedRegions : env_data}
                    renderItem={renderRegionItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={1}
                    contentContainerStyle={styles.grid}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#4B4B4B",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E0E0E0",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        fontSize: 18,
        color: "#4B4B4B",
    },
    searchIconContainer: {
        marginLeft: 8,
    },
    itemContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    grid: {
        paddingBottom: 16,
    },
    regionCard: {
        width: 300,
        marginBottom: 16,
        backgroundColor: "#F3F3F3",
        borderRadius: 8,
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    imageContainer: {
        width: "100%",
        aspectRatio: 1,
        backgroundColor: "#C4C4C4",
        borderRadius: 8,
        marginBottom: 8,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    regionName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#4B4B4B",
        textAlign: "center",
    },
});

export default DashboardList;