import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GenreScreen from "../screens/GenreScreen";
const Stack = createStackNavigator();

const GenreNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Genres" component={GenreScreen} />
  </Stack.Navigator>
);

export default GenreNavigator;
