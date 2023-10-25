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

  const generateFormattedJSON = (item) => {
    return JSON.stringify(item, null, 2);
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
                    <th>Descripción</th>
                    <th>Institución</th>
                    <th>Fecha finalización</th>
                  </tr>
                </thead>
                <tbody>
                  {searchedData.map((item) => (
                    <tr key={item.id} onClick={() => openDialog(item)}>
                      <td>{item.detalle}</td>
                      <td>{item.descripcion}</td>
                      <td>{item.institucion}</td>
                      <td>{item.fecha_finalizacion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>Details</DialogTitle>
                <DialogContent>
                  {selectedItem && (
                    <pre>{generateFormattedJSON(selectedItem)}</pre>
                  )}
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
