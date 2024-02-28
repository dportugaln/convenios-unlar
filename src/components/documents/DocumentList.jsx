import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonGroup, Button } from '@mui/material';

import Skeleton from '@mui/material/Skeleton';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { allDocs } from '../../redux/actions/documents/docsActions';

import { setAlertOpen, setOperationResult } from '../../redux/appRedux';

const TablenNotes = () => {

  const navigate = useNavigate();

  const docs = useSelector((state) => state.docsReducer.docs);
  const operationResult = useSelector( (state) => state.app.operationResult );
  const dispatcher = useDispatch();

  const [idDocDelete, setIdDocDelete] = useState(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatcher(setOperationResult(0));
    dispatcher(allDocs())
  }, [])

  useEffect( () => {
    if(operationResult===0)
      dispatcher(setAlertOpen(false));
  }, [])

  const handleDelete = (idDoc) => {
    setIdDocDelete(idDoc);
    setOpen(true);
  };



  const handleClose = () => {
    setOpen(false);
  };

  // const setSekeleton = () => {
  const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] //..some array

  const items = elements.map((val, i) => (
    <TableRow key={`skeleton-row-${i}`}>
      <TableCell> <Skeleton variant="text" /> </TableCell>
      <TableCell> <Skeleton variant="text" /> </TableCell>
      <TableCell> <Skeleton variant="text" /> </TableCell>
      <TableCell> <Skeleton variant="text" /> </TableCell>
      <TableCell> <Skeleton variant="text" /> </TableCell>
    </TableRow>
  ));


  return (
    <>

{/*       <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Detalle</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Institución</TableCell>
            <TableCell>Fecha finalización</TableCell>
          </TableRow>
        </TableHead>
        <TableBody> */}
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Denominación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {

            docs.length < 1 ?

              items

              :

/*               docs.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.detalle_convenio}</TableCell>
                  <TableCell>{row.descripcion_convenio}</TableCell>
                  <TableCell>{row.institucion_denominacion}</TableCell>
                  <TableCell>{row.fecha_finalizacion}</TableCell>
                </TableRow>
              )) */
              docs.map((row) => (
                <TableRow key={row.codigo}>
                  <TableCell>{row.codigo}</TableCell>
                  <TableCell>{row.denominacion}</TableCell>
                </TableRow>
              ))

          }
        </TableBody>
      </Table>



    </>
  )
}

export default TablenNotes