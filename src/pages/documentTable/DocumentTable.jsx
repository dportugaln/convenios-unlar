// Importa dependencias y componentes necesarios de React y Material-UI.
import React, { useState, useEffect } from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Card, CardContent,
  Grid, TextField, Typography, InputAdornment, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, Divider, Slide, Fade,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { fetchConvenios } from '../../constants/Index'; // Función para obtener datos de convenios.

const FILES_URL = process.env.REACT_APP_URL_FILES; // URL base para archivos desde variables de entorno.

const DocumentTable = () => {
  // Estado para almacenar los datos de los convenios.
  const [data, setData] = useState([]);

  // Estado para manejar los filtros de búsqueda avanzados.
  const [filters, setFilters] = useState({
    detalle_convenio: '',
    descripcion_convenio: '',
    fecha_firma: '',
    fecha_inicio: '',
    fecha_finalizacion: '',
    renovacion_automatica: '',
    id: '',
  });

  // Estado para el texto de búsqueda general.
  const [searchText, setSearchText] = useState('');

  // Estados para manejar el diálogo de detalles.
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Estado para manejar errores.
  const [error, setError] = useState(null);

  // useEffect para cargar los datos al montar el componente.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const convenios = await fetchConvenios(); // Llama a la API.
        setData(convenios); // Actualiza el estado con los datos obtenidos.
      } catch (error) {
        setError(error.message); // Maneja errores de carga.
      }
    };

    fetchData();
  }, []);

  // Maneja cambios en los filtros avanzados.
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Maneja cambios en el texto de búsqueda general.
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Abre el diálogo y selecciona un ítem.
  const openDialog = (item) => {
    item.path = item.path !== '' ? `${FILES_URL}/${item.path}` : ''; // Construye la URL de archivo si está disponible.
    setSelectedItem(item);
    setDialogOpen(true);
  };

  // Cierra el diálogo y deselecciona el ítem.
  const closeDialog = () => {
    setDialogOpen(false); // Cambia el estado del diálogo a cerrado
    setSelectedItem(null); // Limpia el elemento seleccionado
  };


  // Formatea las claves de las propiedades para mostrarlas de forma legible.
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

  // Genera títulos y valores para las propiedades de un ítem.
  const generatePropertyTitles = (item) => {
    const fieldsToDisplay = {
      detalle_convenio: 'Detalle',
      descripcion_convenio: 'Descripción',
      fecha_firma: 'Fecha de firma',
      tipo_convenio: 'Tipo de convenio',
      tipo_vigencia: 'Vigencia',
      tipo_objeto: 'Objeto',
      dependencias_denominacion: 'Dependencia',
      nro_expediente: 'Expediente N.º',
      nro_norma: 'Ordenanza N.º',
      cuc: 'Código Único de Convenio (CUC)',
      estado: 'Estado',
      institucion_denominacion: 'Institución',
      pais: 'País',
      provincia: 'Provincia',
      departamento: 'Departamento',
      localidad: 'Localidad',
      path: 'Convenio firmado'
    };

    return (
      <div>
        {Object.keys(fieldsToDisplay).map((key) => {
          const displayName = fieldsToDisplay[key];
          const value = item[key];

          // Excluir los datos vacíos
          if (value === null || value === '' || (key === 'nro_norma' && value === null)) {
            return null;
          }

          return (
            <div key={key}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                {displayName}
              </Typography>
              <Typography>
                {/* Si el campo es 'path', mostrar el botón de descarga */}
                {key === 'path' && value ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.open(`${FILES_URL}/${value}`, '_blank')}
                  >
                    Descargar PDF
                  </Button>
                ) : (
                  key === 'nro_norma' && value === null ? 'Sin ordenanza' : value
                )}
              </Typography>
            </div>
          );
        })}
      </div>
    );
  };


  // Filtra los datos en función de los filtros avanzados.
  const filteredData = data.filter((item) =>
    Object.keys(filters).every((key) => {
      const filterValue = filters[key].toLowerCase();
      const itemValue = String(item[key] || '').toLowerCase();
      return itemValue.includes(filterValue);
    })
  );

  // Filtra los datos en función del texto de búsqueda general.
  const searchedData = filteredData.filter((item) =>
    Object.values(item).some((itemValue) => {
      const itemValueStr = String(itemValue || '').toLowerCase();
      return itemValueStr.includes(searchText.toLowerCase());
    })
  );


  // Renderiza el componente principal con tabla, filtros y diálogo.
  return (
    <div>
      {/* Título principal */}
      <h1
        style={{
          color: 'white',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        Convenios
      </h1>

      {/* Contenedor principal */}
      <Grid container spacing={3} className="animated-container">
        <Grid item xs={12}>
          <Card>
            <CardContent>
              {/* Barra de búsqueda */}
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

              {/* Filtros */}
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

              {/* Tabla de datos */}
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
                      <th>Estado</th>
                      <th>Acciones</th> {/* Nueva columna para las acciones */}
                    </tr>
                    <tr>
                      <th colSpan="5">
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
                          <td>{item.estado}</td>
                          <td>
                            {item.path ? (
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevenir la apertura del diálogo al hacer clic en el botón.
                                  window.open(`${FILES_URL}/${item.path}`, '_blank'); // Abrir la URL en una nueva pestaña.
                                }}
                                color="primary"
                                aria-label="descargar pdf"
                              >
                                <PictureAsPdfIcon />
                              </IconButton>
                            ) : (
                              <Typography variant="caption" color="textSecondary">
                                Sin archivo
                              </Typography>
                            )}
                          </td>
                        </tr>
                        {index < searchedData.length - 1 && (
                          <tr>
                            <td colSpan="5">
                              <Divider />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>

                </table>
              )}

              {/* Diálogo de detalles */}
              <Dialog
                open={dialogOpen}
                onClose={closeDialog}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
                BackdropProps={{
                  onClick: closeDialog, // Cierra el diálogo al hacer clic fuera de él
                }}
              >
                <DialogTitle id="dialog-title">Detalle</DialogTitle>
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
