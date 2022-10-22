import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Linking, Dimensions, PixelRatio } from 'react-native';
import { Text } from 'react-native-paper';
import { parse } from 'rss-to-json';

function Details({ route, navigation }) {
  const { id, name, url } = route.params;

  const [err, setErr] = useState();
  const [loading, setLoading] = useState(false);
  const [parsed, setParsed] = useState(false);

  async function getRssData() {
    try {
      const rss = await parse(url);
      setParsed(rss);
      setLoading(false);
    }
    catch(err) {
      setErr(true)
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true)
    getRssData();
  }, [])

  if (loading) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (err) {
    return (
      <View>
        <Text>Ocorreu um erro</Text>
      </View>
    )
  }

  //items -> title, description, link

  return (
    <View style={styles.container}>
      { parsed?.items != null ? (
        <FlatList
          data={parsed.items}
          keyExtractor={(item) => item.link} 
          ItemSeparatorComponent={({ highlighted }) => (
            <View style={[styles.rowSeparator, highlighted && styles.rowSeparatorHide]} />
          )}
          renderItem={({ item }) => (
            <View style={styles.listContainer}>
              <Text style={{ marginBottom: 10, color: '#8e44ad' }}variant='titleSmall'>{item.title}</Text>
              <Text style={{ color: '#2c3e50' }}variant='bodySmall'>{item.description}</Text>
              <Text style={{ marginTop: 5, color: '#2c3e50' }} variant='labelSmall'onPress={() => Linking.openURL(item.link)}>{item.link}</Text>
            </View>
          )}
          style={{ flex: 1 }}
        />
      ) : null}
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
    height: 200,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
    color: '#000',
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


export default Details;