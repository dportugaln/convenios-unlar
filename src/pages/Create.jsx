import React, { Component } from 'react';

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
      <div>
        <h2>Formulario de Creación de Usuario</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Nombre Completo:</label>
            <input
              type="text"
              name="nombreCompleto"
              value={this.state.nombreCompleto}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>DNI:</label>
            <input
              type="text"
              name="dni"
              value={this.state.dni}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Cargo:</label>
            <input
              type="text"
              name="cargo"
              value={this.state.cargo}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Dependencia:</label>
            <input
              type="text"
              name="dependencia"
              value={this.state.dependencia}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Res. N°:</label>
            <input
              type="text"
              name="resolucionNumero"
              value={this.state.resolucionNumero}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Correo Electrónico:</label>
            <input
              type="email"
              name="correoElectronico"
              value={this.state.correoElectronico}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Nombre del Personal Autorizado:</label>
            <input
              type="text"
              name="nombrePersonalAutorizado"
              value={this.state.nombrePersonalAutorizado}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>DNI del Personal Autorizado:</label>
            <input
              type="text"
              name="dniPersonalAutorizado"
              value={this.state.dniPersonalAutorizado}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Contacto del Personal Autorizado:</label>
            <input
              type="text"
              name="contactoPersonalAutorizado"
              value={this.state.contactoPersonalAutorizado}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit">Crear Usuario</button>
        </form>
      </div>
    );
  }
}
export default CreateUserForm;