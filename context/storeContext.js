import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';

export const API_URL =
  'https://api.mercadolibre.com/sites/MLA/search?q=Motorola%20G6';

export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([
    {nombre: 'Categoria 1', color: 'red', id: Math.random().toString(10)},
    {nombre: 'Categoria 2', color: 'blue', id: Math.random().toString(10)},
    {nombre: 'Categoria 3', color: 'green', id: Math.random().toString(10)},
    {nombre: 'Categoria 4', color: 'yellow', id: Math.random().toString(10)},
  ]);
  const [categoriasProductos, setCategoriasProductos] = useState({});
  const [compradores, setCompradores] = useState([
    {
      nombre: 'Fausto David',
      email: 'faus.david.7@gmail.com',
      id: Math.random().toString(10),
    },
    {
      nombre: 'Diego Acosta',
      email: 'diegomartinfrsf@gmail.com',
      id: Math.random().toString(10),
    },
  ]);
  const [compradoresProductos, setCompradoresProductos] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setProductos(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const agregarProductoACategoria = (categoria, producto) => {
    if (!categoria?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }

    const categoriaProductos = categoriasProductos[categoria.id] ?? [];
    if (!categoriaProductos.includes(producto.id)) {
      //Si no esta lo agregamos
      const newCategoriasProductos = {
        ...categoriasProductos,
        [categoria.id]: [...categoriaProductos, producto.id],
      };
      setCategoriasProductos(newCategoriasProductos);
    }
  };

  const quitarProductoDeCategoria = (categoria, producto) => {
    if (!categoria?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }
    const categoriaProductos = categoriasProductos[categoria.id] ?? [];
    if (categoriaProductos.includes(producto.id)) {
      //Si esta lo quitamos
      setCategoriasProductos({
        ...categoriasProductos,
        [categoria.id]: categoriaProductos.filter((pid) => pid !== producto.id),
      });
    }
  };

  const obtenerCategoriasDelProducto = (producto) => {
    const categoriasId = Object.keys(categoriasProductos);
    const categoriasIdDelProducto = categoriasId.reduce(
      (acc, cur) =>
        categoriasProductos[cur].includes(producto.id) ? [...acc, cur] : acc,
      [],
    );
    const results = categorias.filter((c) =>
      categoriasIdDelProducto.includes(c.id),
    );
    return results;
  };

  const agregarProductoAComprador = (comprador, producto) => {
    if (!comprador?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }
    const compradorProducto = compradoresProductos[comprador.id] ?? [];
    if (!compradorProducto.includes(producto.id)) {
      //Si no esta lo agregamos
      const newCompradoresProductos = {
        ...compradoresProductos,
        [comprador.id]: [...compradorProducto, producto.id],
      };
      setCompradoresProductos(newCompradoresProductos);
    }
  };

  const obtenerCompradoresDelProducto = (producto) => {
    const compradoresId = Object.keys(compradoresProductos);
    const compradoresIdDelProducto = compradoresId.reduce(
      (acc, cur) =>
        compradoresProductos[cur].includes(producto.id) ? [...acc, cur] : acc,
      [],
    );
    const results = compradores.filter((c) =>
      compradoresIdDelProducto.includes(c.id),
    );
    return results;
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        productos,
        setProductos,
        categorias,
        setCategorias,
        compradores,
        setCompradores,
        agregarProductoACategoria,
        quitarProductoDeCategoria,
        obtenerCategoriasDelProducto,
        obtenerCompradoresDelProducto,
        agregarProductoAComprador,
      }}>
      {children}
    </StoreContext.Provider>
  );
};
