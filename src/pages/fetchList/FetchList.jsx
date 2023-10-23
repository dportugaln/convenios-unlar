import React, { useState } from "react"; import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import { appActions } from "../../redux/AppRedux";
import { IMG_URL } from "../../constants/Index";
import pdfIcon from '../../assets/images/pdf.png';
import api from '../../services/Api'
import PokemonDetail from '../../components/PokemonDetails'
import { Grid, Paper, Card, CardHeader, CardContent, TextField, Button, Stack, Typography, Checkbox } from "@mui/material";
import jsonData from '../../constants/data.json';

const Fetchlist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = jsonData.filter((item) => {
    const itemText = `${item.detalle} ${item.descripcion} ${item.fecha_firma} ${item.fecha_inicio} ${item.fecha_finalizacion} ${item.renovacion_automatica ? 'Yes' : 'No'} ${item.id}`;
    return itemText.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const tableStyle = {
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
  };

  const rowStyle = {
    backgroundColor: '#f0f0f0',
  };

  return (
    <div>
      <h1>Document Table</h1>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Document List" />
            <CardContent>
              <TextField
                label="Search Documents"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <table className="table table-bordered" style={tableStyle}>
                <thead>
                  <tr>
                    <th>Detalle</th>
                    <th>Descripcion</th>
                    <th>Fecha Firma</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Finalizacion</th>
                    <th>Renovacion Automatica</th>
                    <th>ID</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={item.id} style={index % 2 === 0 ? rowStyle : null}>
                      <td>{item.detalle}</td>
                      <td>{item.descripcion}</td>
                      <td>{item.fecha_firma}</td>
                      <td>{item.fecha_inicio}</td>
                      <td>{item.fecha_finalizacion}</td>
                      <td>{item.renovacion_automatica ? 'Yes' : 'No'}</td>
                      <td>{item.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};


export default Fetchlist;

/* import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { appActions } from "../../redux/AppRedux";
import { IMG_URL } from "../../constants/Index";
import pdfIcon from '../../assets/images/pdf.png';
import api from '../../services/Api'
import PokemonDetail from '../../components/PokemonDetails'
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const Fetchlist = () => {

  const [pokemons, setPokemons] = useState(null);
  const [next, setNext] = useState("");

  useEffect(() => {
    getPokemons()
  }, [])

  const dispatch = useDispatch();

  const getPokemons = async () => {
    try {
      dispatch(appActions.loading(true))
      const result = await api.GET(api.pokemons)
      if (result) {
        console.log('poke: ', result)
        setPokemons(result.results)
        setNext(result.next)
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(appActions.loading(false))
    }
  }

  const renderItem = (item) => {
    const path = item.url.split('/')
    const imgID = getPokemonImgId(path[6])
    return (
      <Card p={2} sx={{
        display: 'flex', height: 100, cursor: 'pointer',
        '&:hover': { backgroundColor: '#5acdbd', color: 'white' }
      }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            N° {imgID}
          </Typography>
          <Typography component="div" variant="h5">
            {item.name}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 100 }}
          src={pdfIcon}
          alt="Pokemon"
        />
      </Card>
    )
  }

  const getPokemonImgId = (id) => {
    console.log('long. ' + id.length)
    switch (id.length) {
      case 1:
        return `00${id}`
      case 2:
        return `0${id}`
      default:
        return id
    }
  }

  const loadMore = async () => {
    try {
      dispatch(appActions.loading(true))
      const result = await api.GET(next)
      if (result) {
        console.log('poke: ', result.results)
        setPokemons(prev => [...prev, ...result.results])
        setNext(result.next)
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(appActions.loading(false))
    }
  }

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = async (url) => {
    try {
      dispatch(appActions.loading(true));
      const response = await fetch(url);
      const pokemonData = await response.json();
      setSelectedPokemon(pokemonData);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(appActions.loading(false));
    }
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
    setIsModalOpen(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography component="div" variant="h5">
          Listado de convenios
        </Typography>
      </Grid>
      {
        pokemons && pokemons.map((p, index) => {
          return (
            <Grid item xs={4} key={index} onClick={() => handleOpenModal(p.url)}>
              {renderItem(p)}
            </Grid>
          )
        })
      }
      <Grid item xs={4} >
        <Card p={2} sx={{
          display: 'flex', height: 100, cursor: 'pointer',
          backgroundColor: '#317b52', '&:hover': { backgroundColor: '#5acdbd' }
        }}
          onClick={() => loadMore()}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5" sx={{ color: 'white' }}>
              Cargar más
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 100, p: 2 }}
            image={require('../../assets/images/pokeimg.png')}
            alt="Pokedex"
          />
        </Card>
      </Grid>
      <PokemonDetail open={isModalOpen} onClose={handleCloseModal} pokemon={selectedPokemon} />
    </Grid>
  );
};

export default Fetchlist; */