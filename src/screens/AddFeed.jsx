import React, { useContext, useState } from "react";
import { View, StyleSheet, Alert, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { executeSql } from "../db";
import FeedContext from "../contexts/FeedContext";

function AddFeed({ route }) {
  const oldName = route.params?.name;
  const oldUrl = route.params?.url;
  const id = route.params?.id;

  const [name, setName] = useState(oldName);
  const [url, setUrl] = useState(oldUrl);

  const { feeds, setFeeds } = useContext(FeedContext);

  async function save() {
    try {
      if (id) {
        await executeSql("UPDATE feeds SET name = ?, url = ? WHERE id = ?", [name, url, id]);

        const items = [...feeds];

        items.forEach(feed => {
          if (feed.id == id) {
            feed.name = name;
            feed.url = url;
          }
        });

        setFeeds([...items])
        Alert.alert("Feed atualizado com sucesso")
      }
      else {
        const { insertId = null } = await executeSql("INSERT INTO feeds (name, url) VALUES(?, ?)", [name, url]);
        setFeeds([{ id: insertId, name, url },...feeds])
        Alert.alert("Feed salvo com sucesso")
      }
    } 
    catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.inputs}
        value={name} 
        label="Nome"
        mode="outlined"
        onChangeText={text => setName(text)}
        outlineColor="#8e44ad"
      />
      <TextInput 
        style={styles.inputs}
        value={url} 
        label="URL" 
        mode="outlined"
        onChangeText={text => setUrl(text)}
        outlineColor="#8e44ad"
      />

      <Button 
        style={styles.saveButton} 
        icon="content-save" 
        mode="contained" 
        onPress={save}
        buttonColor="#8e44ad"
      >
          Salvar
        </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFF",
    flexDirection: 'column'
  },

  inputs: {
    width: Dimensions.get('window').width * 0.95,
    marginTop: 5,
    marginBottom: 5
  },

  saveButton: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.60
  }
});

export default AddFeed;