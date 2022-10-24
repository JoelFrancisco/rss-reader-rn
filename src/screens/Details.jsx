import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Linking, Dimensions, PixelRatio } from 'react-native';
import { Text } from 'react-native-paper';
import { parse } from 'rss-to-json';

function Details({ route, navigation }) {
  const { url } = route.params;

  const [err, setErr] = useState();
  const [loading, setLoading] = useState(false);
  const [parsed, setParsed] = useState(false);

  function handleFetchingError() {
    setLoading(false);
    setErr(true);
  }

  async function getRssData() {
    try {
      const rss = await parse(url);

      if (rss) {
        setParsed(rss);
        setLoading(false);
      } else {
        handleFetchingError();
      }
    }
    catch(err) {
      handleFetchingError();
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
              <Text style={{ marginBottom: 10, color: '#8e44ad', fontWeight: '800' }}variant='titleSmall'>{item.title}</Text>
              <Text style={{ color: '#2c3e50' }}variant='bodySmall'>{item.description}</Text>
              <Text style={{ marginTop: 5, color: '#2c3e50', fontWeight: '800' }} variant='labelSmall'onPress={() => Linking.openURL(item.link)}>{item.link}</Text>
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
    width: Dimensions.get('window').width * 0.95,
    height: 200,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
    color: '#2c3e50',
    backgroundColor: '##ecf0f1',
    borderColor: '#9b59b6',
    borderWidth: 2.5,
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  textInfo: {
    flex: 1,
    color: "#2c3e50"
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
