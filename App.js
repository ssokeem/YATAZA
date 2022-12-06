import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./Main";
import Position from "./Position";
import Gender from "./Gender";
import Age from "./Age";
import EmotionScreen from "./Emotion";
import CategoryScreen from "./Category";
import RecommendationScreen from "./Recommendation";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Sending"]);

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Position" component={Position} />
        <Stack.Screen name="Gender" component={Gender} />
        <Stack.Screen name="Age" component={Age} />
        <Stack.Screen name="Emotion" component={EmotionScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Recommendation" component={RecommendationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
