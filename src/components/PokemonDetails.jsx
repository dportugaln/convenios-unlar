import React from "react";
import { IMG_URL } from "../constants/Index";
import { Dialog, DialogTitle, DialogContent, Typography, CardMedia, Grid } from "@mui/material";

const PokemonDetail = ({ open, onClose, pokemon }) => {
  if (!pokemon) return null;

  const getPokemonImgId = (id) => {
    switch (id.toString().length) {
      case 1:
        return `00${id}`;
      case 2:
        return `0${id}`;
      default:
        return id;
    }
  };

  const imgID = getPokemonImgId(pokemon.id);

  const halfMoves = Math.ceil(pokemon.moves.length / 2);
  const firstColumnMoves = pokemon.moves.slice(0, halfMoves);
  const secondColumnMoves = pokemon.moves.slice(halfMoves);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{pokemon.name}</DialogTitle>
      <DialogContent>
        <CardMedia
          component="img"
          sx={{ width: "100%" }}
          src={`${IMG_URL}/${imgID}.png`}
          alt="Pokemon"
        />
        <Typography align="center" variant="h6">Habilidades:</Typography>
        <ul>
          {pokemon.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
        <Typography align="center" variant="h6">Movimientos:</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ul>
              {firstColumnMoves.map((move, index) => (
                <li key={index}>{move.move.name}</li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} md={6}>
            <ul>
              {secondColumnMoves.map((move, index) => (
                <li key={index}>{move.move.name}</li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default PokemonDetail;
