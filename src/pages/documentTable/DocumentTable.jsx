import React, { useState, useEffect } from 'react';
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
  Divider,
  Slide,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { fetchConvenios } from '../../constants/Index'; // Importa la función modularizada

const DocumentTable = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    detalle_convenio: '',
    descripcion_convenio: '',
    fecha_firma: '',
    fecha_inicio: '',
    fecha_finalizacion: '',
    renovacion_automatica: '',
    id: '',
  });
  const [searchText, setSearchText] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const convenios = await fetchConvenios(); // Llama a la función de la API
        setData(convenios);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

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
        }
        const prepositions = ['de', 'para', 'con', 'en', 'la', 'el', 'del'];
        return prepositions.includes(word) ? word : word.charAt(0).toLowerCase() + word.slice(1);
      })
      .join(' ');
    return formattedKey;
  };

  const generatePropertyTitles = (item) => (
    <div>
      {Object.keys(item).map((key) => {
        if (key === 'renovacion_automatica' || (key === 'estado' && item[key] === 'Borrador') || item[key] === null) {
          return null;
        }
        return (
          <div key={key}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              {formatTitle(key)}
            </Typography>
            <Typography>
              {item[key] !== null && typeof item[key] === 'object' ? item[key].nombre : item[key]}
            </Typography>
          </div>
        );
      })}
    </div>
  );

  const filteredData = data.filter((item) =>
    Object.keys(filters).every((key) => {
      const filterValue = filters[key].toLowerCase();
      const itemValue = String(item[key] || '').toLowerCase();
      return itemValue.includes(filterValue);
    })
  );

  const searchedData = filteredData.filter((item) =>
    Object.values(item).some((itemValue) => {
      const itemValueStr = String(itemValue || '').toLowerCase();
      return itemValueStr.includes(searchText.toLowerCase());
    })
  );

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div>
      <h1
        style={{
          color: 'white',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        Convenios
      </h1>

      <Grid container spacing={3} className="animated-container">
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
                          label={formatTitle(key)}
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
              {error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                <table
                  className="table-borderBottomed"
                  style={{ textAlign: 'left', marginTop: '1rem' }}
                >
                  <thead>
                    <tr>
                      <th>Detalle</th>
                      <th>Descripción</th>
                      <th>Institución</th>
                      <th>Fecha finalización</th>
                    </tr>
                    <tr>
                      <th colSpan="4">
                        <Divider />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedData.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <tr onClick={() => openDialog(item)}>
                          <td>{item.detalle_convenio}</td>
                          <td>{item.descripcion_convenio}</td>
                          <td>{item.institucion_denominacion}</td>
                          <td>{item.fecha_finalizacion}</td>
                        </tr>
                        {index < searchedData.length - 1 && (
                          <tr>
                            <td colSpan="4">
                              <Divider />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              )}
              <Dialog
                open={dialogOpen}
                onClose={closeDialog}
                TransitionComponent={Transition}
              >
                <DialogTitle>Detalles</DialogTitle>
                <DialogContent>
                  {selectedItem && generatePropertyTitles(selectedItem)}
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeDialog} color="primary">
                    Cerrar
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
