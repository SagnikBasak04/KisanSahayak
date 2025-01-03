import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  MainContainer: undefined;
  Sell: undefined;
  MyListings: undefined;
  ProductDetails: { productId: string };
  History: undefined;
  PersonalizedDashboard: undefined;
  OthersDashboard: undefined;
  RegionalDashboard: { district: string };
  Contribute: undefined;
};

export type Product = {
  _id: string;
  product_name: string;
  seller_name: string;
  seller_type: string;
  updatedAt: string;
  price: number;
  image_url: string;
};

export type RegionalDashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RegionalDashboard'>;