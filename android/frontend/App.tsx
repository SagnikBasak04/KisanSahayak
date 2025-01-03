import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import { useFonts } from 'expo-font';
import Home from './src/screens/Home';
import { Provider } from 'react-redux';
import { store } from './store';
import MainContainer from './src/MainContainer';
import { RootStackParamList } from './src/types';
import { AuthContextProvider } from './src/context/AuthContext';
import ProductDetails from './src/screens/ProductDetails';
import MarketplaceSell from './src/screens/MarketPlaceSell';
import MyListings from './src/screens/MyListings';
import History from './src/screens/History';
import PersonalizedDashboard from './src/screens/PersonalizedDashboard';
import DashboardList from './src/screens/RegionalDashboardList';
import RegionalDashboard from './src/screens/RegionalDashboard';
import Contribute from './src/screens/Contribute';
import { EnrollmentContextProvider } from './src/context/EnrollmentContext';
import { ElevatedUserContextProvider } from './src/context/ElevatedUserContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  let [fontsLoaded] = useFonts({
    poppins: require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  });

  return (
    <Provider store={store}>
      <AuthContextProvider>
        <EnrollmentContextProvider>
          <ElevatedUserContextProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen options={{ headerShown: true }} name="Login" component={Login} />
                <Stack.Screen name="MainContainer" options={{ title: "KisanSahayak" }} component={MainContainer} />
                <Stack.Screen name="ProductDetails" options={{ title: "Product Details" }} component={ProductDetails} />
                <Stack.Screen name="Sell" options={{ title: "Sell Item" }} component={MarketplaceSell} />
                <Stack.Screen name="MyListings" options={{ title: "Creator Dashboard" }} component={MyListings} />
                <Stack.Screen name="History" options={{ title: "History" }} component={History} />
                <Stack.Screen name="PersonalizedDashboard" options={{ title: "Personalized Dashboard" }} component={PersonalizedDashboard} />
                <Stack.Screen name="OthersDashboard" options={{ title: "Others Dashboard" }} component={DashboardList} />
                <Stack.Screen name="RegionalDashboard" options={{ title: "Regional Dashboard" }} component={RegionalDashboard} />
                <Stack.Screen name="Contribute" options={{ title: "Contribute" }} component={Contribute} />
              </Stack.Navigator>
            </NavigationContainer>
          </ElevatedUserContextProvider>
        </EnrollmentContextProvider>
      </AuthContextProvider>
    </Provider>
  );
}

export default App;