import React from 'react';
import {Button, Card, Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import {screens} from '../App';
import { useNavigation } from "@react-navigation/native";

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

export const Usuario = () => {
  const navigator = useNavigation();
  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
      <View style={styles.container}>
        <Button
          style={styles.button}
          appearance="outline"
          status="info"
          onPress={() => navigator.navigate(screens.modificarUsuario)}>
          MODIFICAR USUARIO
        </Button>
        <Button
          style={styles.button}
          appearance="outline"
          status="info"
          onPress={() => navigator.navigate(screens.altaUsuario)}>
          ALTA USUARIO
        </Button>
        <Button
          style={styles.button}
          appearance="outline"
          status="info"
          onPress={() => navigator.navigate(screens.bajaUsuario)}>
          BAJA USUARIO
        </Button>
      </View>
    </View>
  );
};

export default Usuario;
