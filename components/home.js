import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button} from '@ui-kitten/components';
import {screens} from '../App';
import {useNavigation} from '@react-navigation/native';
import Usuario from './comprador';
import { StoreContext } from "../context/storeContext";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  button: {
    margin: 2,
    marginBottom: 10,
    width: 200,
  },
  buttonGhost: {
    margin: 2,
    marginTop: 5,
    width: 200,
    textDecorationLine: 'underline',
  },
  homeTittle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  ghostContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
});

export const Home = ({route}) => {
  const navigator = useNavigation();
  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
      <Text style={styles.homeTittle}>Bienvenido Comprador:</Text>
      <Text style={styles.homeTittle}> { route.params.logueado.nombre } </Text>
      <View style={styles.container}>
        <Button
          style={styles.button}
          appearance="outline"
          status="info"
          onPress={() => navigator.navigate(screens.listar, {route})}>
          LISTAR PRODUCTOS
        </Button>
        <Button
          style={styles.button}
          appearance="outline"
          status="info"
          onPress={() => navigator.navigate(screens.listaCategorias)}>
          VER CATEGORÍAS
        </Button>
        <Button
          style={styles.button}
          appearance="outline"
          status="info"
          onPress={() => navigator.navigate(screens.comprador)}>
          COMPRADORES
        </Button>
      </View>
    </View>
  );
};
