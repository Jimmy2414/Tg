import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, query, where, addDoc, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';
import InfiniteScroll from 'react-infinite-scroller';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
} from 'reactstrap';
import './App.css';

function App() {
  const [user, setUser] = useState('');
  const [input, setInput] = useState(true);
  const [lista, setLista] = useState([]);
  const [user1, setUser1] = useState({
    Nombre: '',
    Razon_Social: '',
    Nit: '',
    Telefono: '',
    Codigo: '',
  });

  const guardarDatos = async e => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'usuario'), {
        ...user1,
      });
      setUser1({
        Nombre: '',
        Razon_Social: '',
        Nit: '',
        Telefono: '',
        Codigo: '',
      });
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Usuario Creado',
        showConfirmButton: false,
        timer: 1500,
      });
      setInput(!input);
    } catch (e) {
      console.log(e);
    }
  };
  function handleChange(e) {
    setUser1({
      ...user1,
      [e.target.name]: e.target.value,
    });
  }
  console.log(user1);
  useEffect(() => {
    const getInfo = async () => {
      try {
        const q = query(collection(db, 'usuario'));
        const querySnapshot = await getDocs(q);

        const docs = [];
        querySnapshot.forEach(el => {
          docs.push({ ...el.data() });
        });
        setLista(docs);
      } catch (e) {
        console.log(e);
      }
    };
    getInfo();
  }, []);

  const [dropdown, setDropdown] = useState(false);
  const desplegar = () => {
    setDropdown(!dropdown);
  };
  const [dropdown1, setDropdown1] = useState(false);
  const desplegar1 = () => {
    setDropdown1(!dropdown1);
  };

  function prueba(e) {
    setInput(!input);
  }
  const handleenter = e => {
    if (e.key === 'Enter') {
      pruebasearch(e);
    }
  };

  const [filter, setFilter] = useState('');
  const filtro = e => {
    setFilter(`${e.target.value}`);
  };
  console.log(filter);

  function pruebasearch(evt) {
    if (filter === 'nombre') {
      const result = lista.map(e => e.Nombre.toLowerCase());

      const filtername = result.filter(e =>
        e.includes(evt.target.value.toLowerCase())
      );

      const User = [];
      if (filter.length === 0 || filter[0] === 'Sin Resultados') {
        User.push({ nombre: 'Sin Resultados' });
        setUser(User);
        setDropdown(true);
      } else {
        User.pop();

        console.log(filtername);
        const filterobj = filtername.map(function (item) {
          return { nombre: item };
        });

        setUser(filterobj);
        setDropdown(true);
      }
    } else if (filter === 'nit') {
      const resultnit = lista.map(e => e.Nit);
      console.log(resultnit);
      const filternit = resultnit.filter(e => e.includes(evt.target.value));
      const User = [];
      if (filternit.length === 0 || filternit[0] === 'Sin Resultados') {
        User.push({ nombre: 'Sin Resultados' });
        setUser(User);
        setDropdown(true);
      } else {
        User.pop();

        console.log(filternit);
        const filterobj = filternit.map(function (item) {
          return { nombre: item };
        });

        setUser(filterobj);
        setDropdown(true);
      }
    } else if (filter === 'razon') {
      const resultrazon = lista.map(e => e.Razon_Social.toLowerCase());
      console.log(resultrazon);
      const filterrazon = resultrazon.filter(e =>
        e.includes(evt.target.value.toLowerCase())
      );
      const User = [];
      if (filterrazon.length === 0 || filterrazon[0] === 'Sin Resultados') {
        User.push({ nombre: 'Sin Resultados' });
        setUser(User);
        setDropdown(true);
      } else {
        User.pop();

        console.log(filterrazon);
        const filterobj = filterrazon.map(function (item) {
          return { nombre: item };
        });

        setUser(filterobj);
        setDropdown(true);
      }
    }
  }
  console.log(user);

  function info(evt) {
    const data = lista.find(
      e => e.Nombre.toLowerCase() === evt.target.value.toLowerCase()
    );
    if (data) {
      Swal.fire(`Nombre:${data.Nombre}
    Razon Social:${data.Razon_Social}`);
    }

    console.log(data);
    if (data === undefined) {
      const data1 = lista.find(e => e.Nit === evt.target.value);
      console.log(data1);
      Swal.fire(`Nombre:${data1.Nombre}
  Razon Social:${data1.Razon_Social}`);
    }
  }

  const [curretPage, setCurrentPage] = useState(1);
  const [userPerPage, setuserPerPage] = useState(20);
  const indexOfLastUsers = curretPage * userPerPage;
  const indexOfFirstUsers = indexOfLastUsers - userPerPage;
  const currentUser = lista.slice(indexOfFirstUsers, indexOfLastUsers);

  const paginado = () => {
    setCurrentPage(curretPage + 1);
  };

  window.onscroll = function () {
    setCurrentPage(curretPage + 1);
  };
  useEffect(() => {
    window.addEventListener('scroll', paginado);
  }, []);

  return (
    <div className="App">
      <br />
      <Input type="text" placeholder="Busqueda por..." onKeyPress={handleenter}>
        {' '}
      </Input>{' '}
      <div class="opciones1">
        <select defaultValue="Filtros" onChange={filtro}>
          <option disabled>Filtros</option>
          <option value="nit">Nit</option>
          <option value="nombre">Nombre</option>
          <option value="razon">Razon Social</option>
        </select>
      </div>
      <Dropdown isOpen={dropdown} toggle={desplegar}>
        <DropdownToggle caret>Resultados</DropdownToggle>
        <DropdownMenu id="drop">
          <DropdownItem onClick={prueba}>NuevoUsuario</DropdownItem>
          <input hidden={input} placeholder="prueba"></input>

          <div id="Layer1" class="scroll">
            {user.length < 0
              ? currentUser.map(e => (
                  <div onClick={info} value={e.Nombre}>
                    {e.Nombre}
                  </div>
                ))
              : user
              ? user.map(e => (
                  <div onClick={info} value={e.nombre}>
                    {e.nombre}
                  </div>
                ))
              : null}
          </div>
        </DropdownMenu>
        {/* <button onClick={paginado}>abajo</button> */}
      </Dropdown>
      <div hidden={input} className="form-popup">
        <div id={'content'}>
          <form className="form-container" onSubmit={guardarDatos}>
            <input
              type="text"
              onChange={handleChange}
              placeholder={'Ingresar Nombre'}
              name="Nombre"
              required
            />
            <input
              type="text"
              onChange={handleChange}
              placeholder={'Ingresar Razon Social'}
              name="Razon_Social"
              required
            />

            <input
              type="number"
              onChange={handleChange}
              placeholder={'Ingresar Nit'}
              name="Nit"
              required
            />
            <input
              type="number"
              onChange={handleChange}
              placeholder={'Ingresar Telefono'}
              name="Telefono"
              required
            />
            <input
              type="number"
              onChange={handleChange}
              placeholder={'Ingresar Codigo'}
              name="Codigo"
              required
            />
            <input className={'btn'} type="submit" value="Crear Usuario" />
            <button onClick={prueba} className={'btn cancel'}>
              Cerrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
