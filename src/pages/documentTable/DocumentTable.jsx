import React, { useState } from 'react';
import jsonData from '../../constants/data.json';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

const DocumentTable = () => {
  const [filters, setFilters] = useState({
    detalle: '',
    descripcion: '',
    fecha_firma: '',
    fecha_inicio: '',
    fecha_finalizacion: '',
    renovacion_automatica: '',
    id: '',
  });
  const [searchText, setSearchText] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const openDialog = (item) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  const formatTitle = (key) => {
    const formattedKey = key
      .split('_')
      .map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
          const prepositions = ['de', 'para', 'con', 'en', 'la', 'el', 'del'];
          if (prepositions.includes(word)) {
            return word;
          }
          return word.charAt(0).toLowerCase() + word.slice(1);
        }
      })
      .join(' ');
    return formattedKey;
  };
  
  const generatePropertyTitles = (item) => {
    return (
      <div>
        {Object.keys(item).map((key) => {
          if (key === 'renovacion_automatica' || (key === 'estado' && item[key] === 'Borrador')) {
            return null;
          }
          return (
            <div key={key}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                {formatTitle(key)}
              </Typography>
              <Typography>
                {typeof item[key] === 'object' ? item[key].nombre : item[key]}
              </Typography>
            </div>
          );
        })}
      </div>
    );
  };
  
  const filteredData = jsonData.filter((item) => {
    return Object.keys(filters).every((key) => {
      const filterValue = filters[key].toLowerCase();
      const itemValue = String(item[key]).toLowerCase();

      return itemValue.includes(filterValue);
    });
  });

  const searchedData = filteredData.filter((item) => {
    return (
      Object.values(item).some((itemValue) => {
        const itemValueStr = String(itemValue).toLowerCase();
        return itemValueStr.includes(searchText.toLowerCase());
      }) && item.estado !== 'Borrador'
    );
  });

  return (
    <div>
      <h1>Convenios</h1>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <TextField
                  label="Búsqueda"
                  variant="outlined"
                  fullWidth
                  value={searchText}
                  onChange={handleSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Filtros</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {Object.keys(filters).map((key) => (
                      <Grid item xs={12} sm={6} key={key}>
                        <TextField
                          label={key}
                          name={key}
                          variant="outlined"
                          fullWidth
                          value={filters[key]}
                          onChange={handleFilterChange}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <table
        className="table-bordered"
        style={{ textAlign: 'left', border: '1px solid grey', borderRadius: '10px', width: '100%' }}
      >
        <thead>
          <tr>
            <th style={{ border: '1px solid grey', padding: '8px' }}>Detalle</th>
            <th style={{ border: '1px solid grey', padding: '8px' }}>Descripción</th>
            <th style={{ border: '1px solid grey', padding: '8px' }}>Institución</th>
            <th style={{ border: '1px solid grey', padding: '8px' }}>Fecha finalización</th>
          </tr>
        </thead>
        <tbody>
          {searchedData.map((item) => (
            <tr
              key={item.id}
              onClick={() => openDialog(item)}
              style={{ border: '1px solid grey' }}
            >
              <td style={{ border: '1px solid grey', padding: '8px' }}>{item.detalle}</td>
              <td style={{ border: '1px solid grey', padding: '8px' }}>{item.descripcion}</td>
              <td style={{ border: '1px solid grey', padding: '8px' }}>{item.institucion}</td>
              <td style={{ border: '1px solid grey', padding: '8px' }}>{item.fecha_finalizacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
              <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>Details</DialogTitle>
                <DialogContent>
                  {selectedItem && generatePropertyTitles(selectedItem)}
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeDialog} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DocumentTable;
