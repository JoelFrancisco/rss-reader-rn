import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./screens/Home";

const Drawer = createDrawerNavigator();
const queryClient = new QueryClient();

function App() {
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen 
              name="Home" 
              component={Home}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
*/

export default registerRootComponent(App);
