import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import {Button} from '@ui-kitten/components';
import {screens} from '../App';
import {useNavigation} from '@react-navigation/native';
import Comprador from './comprador';
import React, {useContext, useState} from 'react';
import {StoreContext} from '../context/storeContext';


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
  modalButton: {
    marginVertical: 10,
    borderRadius: 60,
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
  textInput: {
    height: 40,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginVertical: 10,
  },
});



export const Login = ({navigation}) => {

  const [emailComprador, setEmailComprador] = useState('');
  const {compradores, setCompradores} = useContext(StoreContext);
  const ingresar = () => {
    if (!emailComprador.trim()) {
      alert('Por favor ingrese un email');
      return;
    }
    compradores.map((logueado) => {
      if (logueado.email === emailComprador) {
        navigation.navigate(screens.homepage,{logueado},);
      }
    });

  };

  return(
    <PantallaLogin
      setEmailComprador={setEmailComprador}
      emailComprador={emailComprador}
      ingresar={ingresar}
    />
  );

};

const PantallaLogin = ({
                         setEmailComprador,
                         emailComprador,
                         ingresar,
                       }) => {
  return (
    <>
      <TextInput
        placeholder="Email comprador"
        style={styles.textInput}
        value={emailComprador}
        onChangeText={(nuevoTexto) => {
          setEmailComprador(nuevoTexto);
        }}
        />
      <Button
        style={styles.modalButton}
        onPress={() => ingresar()}>
        INGRESAR
      </Button>
      </>
      );
};



