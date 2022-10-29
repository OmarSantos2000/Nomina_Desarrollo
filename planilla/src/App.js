import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert } from 'reactstrap';
import Sidebar from './components/Sidebar.jsx'
import axios from 'axios';

const user = localStorage.getItem('user');
var baseUrl = `https://localhost:7268/V1/Logins`;


class App extends Component {
    
  state={
    form:{
        username: '',
        password: '',
        },
    visible: false,
    mensaje: '',
    loginVisible: user === 'authorized' ? false : true, 
    }

handleChange = async e=>{
    await this.setState({
        form:{
            ...this.state.form,
            [e.target.name]: e.target.value
        }
    });
    this.state.mensaje = '';
    this.toggle();
}

iniciarSesion = () =>{
    if(this.state.form.username == ''){
        this.state.mensaje = "Por favor, ingrese un usuario"            
        this.toggle();
        return
    }
    if(this.state.form.password == ''){
        this.state.mensaje = "Por favor, ingrese una contraseña"
        this.toggle();
        return
    }

    localStorage.setItem('user', 'authorized');
    const user = localStorage.getItem('user')
    this.cambioPantalla();   
}

toggle(){       
    this.setState({
        mensaje: this.state.mensaje,
        visible: this.state.mensaje !== '' ? true : false,
    })
}

cambioPantalla(){
    let user = localStorage.getItem('user');
    this.setState({
        loginVisible: user === 'authorized' ? false : true,
    })
}


  render() {
    return (

      <div className="body">
      <div className="containerPrincipal" hidden={!this.state.loginVisible}>
              <Alert color="danger" role="alert" isOpen={this.state.visible}>
               {this.state.mensaje}
              </Alert>
          <div className="containerSecundario">
          <div className="form-group">
              <label>Usuario: </label>
              <br />
              <input
              type="text"
              className="form-control"
              name="username"
              onChange={this.handleChange}
              />
              <br />
              <label>Contraseña: </label>
              <br />
              <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
              />
              <br />
              <button className="btn btn-primary" onClick={()=> this.iniciarSesion()}>Iniciar Sesión</button>
          </div>
          </div>
      </div>
      <div hidden={this.state.loginVisible} className="px-0 mx-0">
      <Sidebar>
      </Sidebar>
      </div>
    </div>


    );
}
};

export default App;