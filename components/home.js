import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button} from '@ui-kitten/components';
import {screens} from '../App';
import {useNavigation} from '@react-navigation/native';
import Usuario from './comprador';
import {StoreContext} from '../context/storeContext';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
  },
  ghostContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
});

export const Home = ({route}) => {
  const navigator = useNavigation();
  const logueado = route.params.logueado;
  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.homeTittle}>
        Bienvenido Comprador: {route.params.logueado.nombre}
      </Text>
      <View style={styles.container}>
        <Button
          style={styles.button}
          appearance="outline"
          status="info"
          onPress={() => navigator.navigate(screens.listar, {logueado})}>
          Listar productos
        </Button>
        <Button
          style={styles.button}
          appearance="outline"
          status="info"
          onPress={() => navigator.navigate(screens.listaCategorias)}>
          Ver categorías
        </Button>
        <Button
          style={styles.button}
          appearance="outline"
          status="info"
          onPress={() => navigator.navigate(screens.comprador)}>
          Compradores
        </Button>
      </View>
    </View>
  );
};
