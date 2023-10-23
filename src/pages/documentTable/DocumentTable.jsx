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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredData = jsonData.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (key === 'Renovacion automatica') {
        // Filter for boolean value
        const filterValue = filters[key].toLowerCase() === 'yes';
        return item[key] === filterValue;
      } else {
        // Filter for other fields (non-boolean)
        const filterValue = filters[key].toLowerCase();
        const itemValue = String(item[key]).toLowerCase();
        return itemValue.includes(filterValue);
      }
    });
  });

  return (
    <div>
      <h1>Document Table</h1>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Filters</Typography>
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
                  {filteredData.map((item) => (
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
