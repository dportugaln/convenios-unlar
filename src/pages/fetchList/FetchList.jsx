import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { appActions } from "../../redux/AppRedux";
import { IMG_URL } from "../../constants/Index";
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
          src={`${IMG_URL}/${imgID}.png`}
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

export default Fetchlist;


/*import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { appActions } from "../../redux/AppRedux";
import { IMG_URL } from "../../constants/Index";
import api from '../../services/Api';
import PokemonDetail from '../../components/PokemonDetails';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Button } from "@mui/material";

const FetchList = () => {
  const [pokemons, setPokemons] = useState(null);
  const [next, setNext] = useState("");

  useEffect(() => {
    getPokemons();
  }, []);

  const dispatch = useDispatch();

  const getPokemons = async () => {
    try {
      dispatch(appActions.loading(true));
      const result = await api.GET(api.pokemons);
      if (result) {
        console.log('poke: ', result);
        setPokemons(result.results);
        setNext(result.next);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(appActions.loading(false)  );
    }
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
      dispatch(appActions.loading(true));
      const result = await api.GET(next);
      if (result) {
        console.log('poke: ', result.results);
        setPokemons(prev => [...prev, ...result.results]);
        setNext(result.next);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(appActions.loading(false));
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
    <div>
      <Typography component="div" variant="h5">
        Mi Pokedex
      </Typography>
      <List>
        {pokemons && pokemons.map((p, index) => (
          <ListItem key={index} button onClick={() => handleOpenModal(p.url)}>
            <ListItemAvatar>
              <Avatar>
                <img src={`${IMG_URL}/${getPokemonImgId(p.url)}.png`} alt="Pokemon" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`N° ${getPokemonImgId(p.url)}`}
              secondary={p.name}
            />
          </ListItem>
        ))}
      </List>
      <Button onClick={loadMore} variant="contained" color="primary">
        Cargar más
      </Button>
      <PokemonDetail open={isModalOpen} onClose={handleCloseModal} pokemon={selectedPokemon} />
    </div>
  );
};

export default FetchList;
*/

