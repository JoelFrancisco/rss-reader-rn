import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import React, { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import FeedContext from "./contexts/FeedContext";

import Home from "./screens/Home";
import AddFeed from "./screens/AddFeed";

import openDB from "./db";
import { executeSql } from "./db";
import Details from "./screens/Details";

const Drawer = createDrawerNavigator();
const queryClient = new QueryClient();

function App() {
  const [feeds, setFeeds] = useState([]);

  async function recuperarFeeds() {
    try {
      const { rows } = await executeSql("SELECT * FROM feeds ORDER BY id DESC");
      const deserialized = rows._array;
      setFeeds(deserialized);
    } 
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    recuperarFeeds();
  }, [])

  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <FeedContext.Provider value={{ feeds, setFeeds }}>
          <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen 
                name="Home" 
                component={Home}
              />

              <Drawer.Screen 
                name="AddFeed" 
                component={AddFeed}
              />

              <Drawer.Screen 
                name="Details" 
                component={Details}
              />
            </Drawer.Navigator>
          </NavigationContainer>
        </FeedContext.Provider>
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
