import { registerRootComponent } from "expo";

import React, { useState, useEffect } from "react";
import { IconButton, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import FeedContext from "./contexts/FeedContext";

import Home from "./screens/Home";
import AddFeed from "./screens/AddFeed";

import { executeSql } from "./db";
import Details from "./screens/Details";

const Stack = createNativeStackNavigator();
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
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen 
                name="Home" 
                component={Home}
                options={({ navigation }) => ({
                  title: "Início",
                  headerTintColor: "#2c3e50",
                  headerRight: () => (
                    <IconButton
                      icon="plus-box"
                      size={28}
                      onPress={() => navigation.navigate("AddFeed")}
                      iconColor="#8e44ad"
                    />
                  )
                })}
              />

              <Stack.Screen 
                name="AddFeed" 
                component={AddFeed}
                options={{ headerTintColor: "#2c3e50", title: 'Adicionar novo feed' }}
              />

              <Stack.Screen 
                name="Details" 
                component={Details}
                options={{ headerTintColor: "#2c3e50", title: 'Detalhes' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </FeedContext.Provider>
      </QueryClientProvider>
    </PaperProvider>
  );
}

export default registerRootComponent(App);
