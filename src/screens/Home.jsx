import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, PixelRatio, Dimensions, Alert } from "react-native";
import { List } from "react-native-paper";

import FeedContext from "../contexts/FeedContext";

function Home({ navigation }) {
  const { feeds } = useContext(FeedContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={feeds}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View>
            <Text>Lista vazia...</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            titleStyle={{ fontWeight: "600", color: "#2c3e50", fontSize: 20 }}
            style={styles.listContainer}
            onPress={() => navigation.navigate("Details", item)}
            onLongPress={() => navigation.navigate("AddFeed", item)}
            right={() => (
              <List.Icon
                icon="pencil-box"
                color="#8e44ad"
                onPress={() => navigation.navigate("AddFeed", item)}
              />
            )}
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
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.95,
    height: 50,
    color: '#8e44ad',
    backgroundColor: '#ecf0f1',
    borderColor: '#9b59b6',
    borderWidth: 2.5,
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  textInfo: {
    flex: 1,
    color: "#000"
  },
});

export default Home;
