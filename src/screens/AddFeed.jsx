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
      }
      else {
        const { insertId = null } = await executeSql("INSERT INTO feeds (name, url) VALUES(?, ?)", [name, url]);
        setFeeds([{ id: insertId, name, url },...feeds])
      }
    } 
    catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput value={name} label="Nome" onChangeText={text => setName(text)}/>
      <TextInput value={url} label="URL" onChangeText={text => setUrl(text)}/>

      <Button mode="contained" onPress={save}>Save</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    flexDirection: 'column'
  },
});

export default AddFeed;