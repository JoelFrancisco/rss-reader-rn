import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Home() {
  const { isLoading, error, data } = useQuery(["test"], async () => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    return data;
  });

  if (isLoading) {
    return (
      <View>
        <Text style={styles.text}>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text style={styles.text}>Ocorreu um erro</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#FFF"
  }
});

export default Home;