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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = jsonData.filter((item) => {
    return Object.keys(filters).every((key) => {
      const filterValue = filters[key].toLowerCase();
      const itemValue = String(item[key]).toLowerCase();

      return itemValue.includes(filterValue);
    });
  });

  const searchedData = filteredData.filter((item) => {
    return Object.values(item).some((itemValue) => {
      const itemValueStr = String(itemValue).toLowerCase();
      return itemValueStr.includes(searchText.toLowerCase());
    });
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
              <table className="table table-bordered">
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
                  {searchedData.map((item) => (
                    <tr key={item.id}>
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

export default DocumentTable;
