import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './screens/Home';
import UserDashboard from './screens/UserDashboard';
import MarketPlace from './screens/MarketPlace';

const Tab = createBottomTabNavigator();

const MainContainer = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Home") iconName = focused ? 'home' : 'home-outline';
                    if (route.name === "UserDashboard") iconName = focused ? 'person-circle' : 'person-circle-outline';
                    if (route.name === "MarketPlace") iconName = focused ? 'cart' : 'cart-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen options={{ headerShown: false }} name='Home' component={Home} />
            <Tab.Screen options={{ headerShown: false, title: "User Dashboard" }} name='UserDashboard' component={UserDashboard} />
            <Tab.Screen options={{ headerShown: false, title: "Marketplace" }} name='MarketPlace' component={MarketPlace} />
        </Tab.Navigator>
    );
};

export default MainContainer;
