import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MovieScreen from "../screens/MovieScreen";
const Stack = createStackNavigator();

const MoviesNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Movies" component={MovieScreen} />
  </Stack.Navigator>
);

export default MoviesNavigator;
