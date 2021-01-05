import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button} from '@ui-kitten/components';
import {screens} from '../App';

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
  baseText: {
    fontWeight: 'bold',
  },
});

export const Comprar = ({route: {params}, ...props}) => {
  const {productoComprador} = params;
  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
      <View style={styles.container}>
        <Text style={styles.baseText}> Producto: {productoComprador.producto.title} </Text>
        <Text style={styles.baseText}> Precio: {productoComprador.producto.price} </Text>
        <Text style={styles.baseText}> Comprado por: {productoComprador.logueado.nombre} </Text>
        <Button
          style={styles.button}
          appearance="outline"
          status="info"
          onPress={() => navigator.navigate(screens.comprador)}>
          COMPRAR
        </Button>
      </View>
    </View>
  );
};

export default Comprar;
