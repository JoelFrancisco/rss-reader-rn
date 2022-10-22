import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, PixelRatio, Dimensions } from "react-native";
import { List } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import FeedContext from "../contexts/FeedContext";

function Home({ navigation }) {
  const { feeds } = useContext(FeedContext);

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
      <FlatList
        data={feeds}
        keyExtractor={(item) => item.id} 
        ItemSeparatorComponent={({ highlighted }) => (
          <View style={[styles.rowSeparator, highlighted && styles.rowSeparatorHide]} />
        )}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            style={styles.listContainer}
            onPress={() => navigation.navigate("Details", item)}
            onLongPress={() => navigation.navigate("AddFeed", item)}
          />
        )}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width * 0.75,
    height: 50,
    color: '#8e44ad',
    backgroundColor: '##ecf0f1',
    borderColor: '#9b59b6',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  textInfo: {
    flex: 1,
    color: "#000"
  },
  rowSeparator: {
    backgroundColor: "#cdcdcd",
    height: 1 / PixelRatio.get(), // altura automática do separador
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
});

export default Home;