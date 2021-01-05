import React, {useContext, useState} from 'react';
import {Button, Card, Icon, Text} from '@ui-kitten/components';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {StoreContext} from '../context/storeContext';
import useOrientation, {SCREEN} from '../hooks/useOrientation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BottomSheetModal from './bottomSheetModal';

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
    borderColor: 'darkgray',
    borderWidth: 1,
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

export const Comprador = () => {
  const {compradores, setCompradores} = useContext(StoreContext);
  const [nuevoCompradorVisible, setNuevoCompradorVisible] = useState(false);
  const [editarCompradorVisible, setEditarCompradorVisible] = useState(false);
  const [nombreNuevoComprador, setNombreNuevoComprador] = useState('');
  const [emailNuevoComprador, setEmailNuevoComprador] = useState('');
  const [emailComprador, setEmailComprador] = useState('');
  const [nombreComprador, setNombreComprador] = useState('');
  const [idComprador, setIdComprador] = useState('');
  const screenDirection = useOrientation();
  const [pantallaInicio, setPantallaInicio] = useState(true);

  const crearComprador = () => {
    if (!nombreNuevoComprador.trim()) {
      alert('Por favor ingrese un nombre');
      return;
    }
    if (!emailNuevoComprador.trim()) {
      alert('Por favor ingrese un email');
      return;
    }

    setCompradores([
      ...compradores,
      {
        nombre: nombreNuevoComprador,
        email: emailNuevoComprador,
        id: Math.random(),
      },
    ]);

    alert('Se añadió un nuevo comprador');

    setNombreNuevoComprador('');
    setEmailNuevoComprador('');
    setNuevoCompradorVisible(false);
  };

  const editarComprador = (itemEditado) => {
    if (!nombreComprador.trim()) {
      alert('Por favor ingrese un nombre');
      return;
    }
    if (!emailComprador.trim()) {
      alert('Por favor ingrese un email');
      return;
    }
    alert('Se editó el comprador');

    const NewData = compradores.map((item) => {
      if (item.id === itemEditado) {
        item.nombre = nombreComprador;
        item.email = emailComprador;
        return item;
      }
      return item;
    });
    setCompradores(NewData);
  };

  const quitarComprador = (itemEditado) => {
    Alert.alert(
      'Quitar comprador',
      '¿Estás seguro que desea quitar el comprador?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => quitarDeLaLista(itemEditado)},
      ],
      {cancelable: false},
    );
  };

  const quitarDeLaLista = (itemEditado) => {
    const filteredData = compradores.filter((item) => item.id !== itemEditado);
    setCompradores(filteredData);
    setEditarCompradorVisible(false);
  };

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({item}) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => {
        setEditarCompradorVisible(true);
        setEmailComprador(item.email);
        setNombreComprador(item.nombre);
        setIdComprador(item.id);
      }}>
      <Item title={item.nombre} />
    </TouchableHighlight>
  );

  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
      <View style={styles.container}>
        <Text style={styles.baseText}>
          {'\n'}
          Toque en un item para editarlo
          {'\n'}
        </Text>

        <BottomSheetModal
          visible={nuevoCompradorVisible}
          onClosePressed={() => setNuevoCompradorVisible(false)}
          title={'Añadir un comprador'}>
          <>
            {pantallaInicio && (
              <PantallaNuevo
                nombreNuevoComprador={nombreNuevoComprador}
                setNombreNuevoComprador={setNombreNuevoComprador}
                setEmailNuevoComprador={setEmailNuevoComprador}
                emailNuevoComprador={emailNuevoComprador}
                setPrimeraPantalla={setPantallaInicio}
                crearComprador={crearComprador}
              />
            )}
          </>
        </BottomSheetModal>

        <BottomSheetModal
          visible={editarCompradorVisible}
          onClosePressed={() => setEditarCompradorVisible(false)}
          title={'Editar un comprador'}>
          <>
            {pantallaInicio && (
              <PantallaEditar
                nombreComprador={nombreComprador}
                setNombreComprador={setNombreComprador}
                setEmailComprador={setEmailComprador}
                emailComprador={emailComprador}
                idComprador={idComprador}
                setIdComprador={setIdComprador}
                setPrimeraPantalla={setPantallaInicio}
                editarComprador={editarComprador}
                quitarComprador={quitarComprador}
              />
            )}
          </>
        </BottomSheetModal>

        <Button
          style={styles.button}
          accessoryLeft={PlusIcon}
          onPress={() => setNuevoCompradorVisible(true)}
        />

        <SafeAreaView style={styles.container}>
          <FlatList
            data={compradores}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </SafeAreaView>
      </View>
    </View>
  );
} ;

const PantallaNuevo = ({
  nombreNuevoComprador,
  setNombreNuevoComprador,
  setEmailNuevoComprador,
  emailNuevoComprador,
  setPrimeraPantalla,
  crearComprador,
}) => {
  return (
    <>
      <TextInput
        placeholder="Nombre comprador"
        style={styles.textInput}
        value={nombreNuevoComprador}
        onChangeText={(nuevoTexto) => {
          setNombreNuevoComprador(nuevoTexto);
        }}
      />
      <TouchableOpacity onPress={() => setPrimeraPantalla(false)}>
        <TextInput
          placeholder="Email comprador"
          style={styles.textInput}
          value={emailNuevoComprador}
          onChangeText={(nuevoTexto) => {
            setEmailNuevoComprador(nuevoTexto);
          }}
        />
      </TouchableOpacity>
      <Button style={styles.modalButton} onPress={() => crearComprador()}>
        Crear comprador
      </Button>
    </>
  );
};

const PantallaEditar = ({
  nombreComprador,
  setNombreComprador,
  setEmailComprador,
  emailComprador,
  idComprador,
  setPantallaEditar,
  editarComprador,
  quitarComprador,
}) => {
  return (
    <>
      <TextInput
        placeholder="Nombre comprador"
        style={styles.textInput}
        value={nombreComprador}
        onChangeText={(nuevoTexto) => {
          setNombreComprador(nuevoTexto);
        }}
      />
      <TouchableOpacity onPress={() => setPantallaEditar(false)}>
        <TextInput
          placeholder="Email comprador"
          style={styles.textInput}
          value={emailComprador}
          onChangeText={(nuevoTexto) => {
            setEmailComprador(nuevoTexto);
          }}
        />
      </TouchableOpacity>
      <Button
        style={styles.modalButton}
        onPress={() => editarComprador(idComprador)}>
        Editar comprador
      </Button>
      <Button
        style={styles.modalButton}
        onPress={() => quitarComprador(idComprador)}>
        Quitar comprador
      </Button>
    </>
  );
};

const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;
const EditIcon = (props) => <Icon {...props} name="edit-outline" />;

export default Comprador;
