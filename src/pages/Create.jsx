import React, { Component } from 'react';
import { Grid, Paper, Card, CardHeader, CardContent, TextField, Button, Stack, Typography, Checkbox } from "@mui/material";
import '../App.css'

class CreateUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreCompleto: '',
      dni: '',
      cargo: '',
      dependencia: '',
      resolucionNumero: '',
      correoElectronico: '',
      nombrePersonalAutorizado: '',
      dniPersonalAutorizado: '',
      contactoPersonalAutorizado: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario a través de una solicitud a tu servidor
    console.log('Datos del usuario a crear:', this.state);
  }

  render() {
    return (
      <Card>
                  <CardHeader title="Formulatio de solicitud de usuario" />

        
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Nombre completo:</label>
              <input
                type="text"
                name="nombreCompleto"
                value={this.state.nombreCompleto}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>DNI:</label>
              <input
                type="text"
                name="dni"
                value={this.state.dni}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Cargo:</label>
              <input
                type="text"
                name="cargo"
                value={this.state.cargo}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Dependencia:</label>
              <input
                type="text"
                name="dependencia"
                value={this.state.dependencia}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Res. N°:</label>
              <input
                type="text"
                name="resolucionNumero"
                value={this.state.resolucionNumero}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Correo electrónico:</label>
              <input
                type="email"
                name="correoElectronico"
                value={this.state.correoElectronico}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Nombre del personal autorizado:</label>
              <input
                type="text"
                name="nombrePersonalAutorizado"
                value={this.state.nombrePersonalAutorizado}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>DNI del personal autorizado:</label>
              <input
                type="text"
                name="dniPersonalAutorizado"
                value={this.state.dniPersonalAutorizado}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Contacto del personal autorizado:</label>
              <input
                type="text"
                name="contactoPersonalAutorizado"
                value={this.state.contactoPersonalAutorizado}
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit">Crear usuario</button>
          </form>
        </div>
      
      </Card>
    );
  }
}

export default CreateUserForm;
