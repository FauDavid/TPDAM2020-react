import React, {useContext, useState} from 'react';
import {Button, Card, Icon, Text} from '@ui-kitten/components';
import { View, } from 'react-native';

const styles = StyleSheet.create({
  container: {alignItems: 'center', flex: 1},
  card: {flex: 1, margin: 5},
  title: {
    fontWeight: 'bold',
  },
  item: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  modalView: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: '50%',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
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
  modalButton: {
    marginVertical: 10,
    borderRadius: 60,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: -50,
    zIndex: 999,
    borderRadius: 60,
    width: 60,
    height: 60,
  },
  baseText: {
    fontWeight: 'bold',
  },
  cardText: {textAlign: 'left', fontWeight: 'bold'},
});

export const Comprar = ({route}, {producto}) => {
  return(
  );
};

export default Comprar;
