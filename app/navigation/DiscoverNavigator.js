import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DiscoverScreen from "../screens/DiscoverScreen";

const Stack = createStackNavigator();

const DiscoverNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Discover" component={DiscoverScreen} />
  </Stack.Navigator>
);

export default DiscoverNavigator;
