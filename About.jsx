import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {styleSubOptions} from '../estilos/styleSubOptions.css'

    const About = () => {
      const widthTable =  {
        maxWidth: '1400px', 
        margin: '0 auto', 
        borderColor: '#3e3131'
    } 
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    const baseUrl = "https://localhost:7268/V1/Empleados"

      const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
      }
    
      const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
      }
  
      const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
      }

      const seleccionarempleado=(empleado, caso)=>{
        Setempleado(empleado);
        (caso === "Editar")?
        abrirCerrarModalEditar(): abrirCerrarModalEliminar();
      }

      const handleChange=e=>{
        const {name, value}=e.target;
        Setempleado({
          ...empleado,
          [name]: value
        });
      }

      const [empleado, Setempleado] = useState({
        nombres: '',
        apellidos: '',
        telefono: '',
        direccion: '',
        nominaId: '',
        cargoId: '',
      })
    
    const obtenerEmpleados=async()=>{
        await axios.get(baseUrl)
          .then(response => {
            setData(response.data);
          }).catch(error => {
          })
        }

    const ingresarEmpleado=async()=>{
        delete empleado.empleadoId;
        empleado.telefono=parseInt(empleado.telefono);
        empleado.cargoId=parseInt(empleado.cargoId);
        empleado.nominaId=parseInt(empleado.nominaId);
        await axios.post(baseUrl, empleado)
        .then(response => {
            abrirCerrarModalInsertar();
            obtenerEmpleados();
        }).catch(error => {
        })
        }

    const editarEmpleado=async()=>{
        empleado.telefono=parseInt(empleado.telefono);
        empleado.cargoId=parseInt(empleado.cargoId);
        empleado.nominaId=parseInt(empleado.nominaId);
        await axios.put(baseUrl+"/"+empleado.empleadoId, empleado)
        .then(response => {
            abrirCerrarModalEditar();
            obtenerEmpleados();
        }).catch(error => {
        })
        }

    const eliminarEmpleado=async()=>{
        await axios.delete(baseUrl+"/"+empleado.empleadoId)
        .then(response => {
            setData(data.filter(empleado=>
            empleado.id !== response.data.empleadoId));
            abrirCerrarModalEliminar();
            obtenerEmpleados();
        }).catch(error => {
        })
        }

        useEffect(()=>{
            obtenerEmpleados();
        },[]);
        const [data, setData] = useState([]);
        
    return (
        <div className="App contenedor-principal">
        <br></br>
        <div className="w-100 text-center">
            <button className='btn btn-success' onClick={()=>abrirCerrarModalInsertar()}>Insertar Empleado</button>
        </div>
        <br></br>
        <table className = "table table-bordered d-md-table d-none" style={widthTable}>
        {/*Cabecera*/}
        <thead className="text-center"> 
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Direccion</th>
          <th>Cargo</th>
          <th>Sueldo</th>
          <th>Télefono</th>
          <th>ACCIONES</th>
        </tr> 
        </thead> 
        {/*Cuerpo de datos*/}
        <tbody className="text-center">
          {data.map(empleado=>(
            <tr key= {empleado.id}>
              <td>{empleado.nombres}</td>
              <td>{empleado.apellidos}</td>
              <td>{empleado.direccion}</td>
              <td>{empleado.cargo.nombre_cargo}</td>
              <td>{empleado.nomina.sueldo}</td>
              <td>{empleado.telefono}</td> 
              <td>
              <button className='btn btn-primary' onClick={()=>seleccionarempleado(empleado, "Editar")}>Editar</button>{" "}
              <button className='btn btn-danger' onClick={()=>seleccionarempleado(empleado, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>    
        </table>

        <Modal isOpen={modalInsertar}>
            <ModalHeader>
                Registrar empleado
            </ModalHeader>     
            <ModalBody>
                <div className='form-group'>
                </div>
                    <label>Nombre: </label>
                    <br />
                    <input type='text' className='form-control' name='nombres' onChange={handleChange}></input>
                    <br />
                    <label>Apellido: </label>
                    <br />
                    <input type='text' className='form-control' name='apellidos' onChange={handleChange}></input>
                    <br />
                    <label>Télefono: </label>
                    <br />
                    <input type='text' className='form-control' name='telefono' onChange={handleChange}></input>
                    <br />
                    <label>Dirección: </label>
                    <br />
                    <input type='text' className='form-control' name='direccion' onChange={handleChange}></input>
                    <br />
                    <label>Id del cargo: </label>
                    <br />
                    <input type='text' className='form-control' name='cargoId' onChange={handleChange}></input>
                    <br />
                    <label>Id de nómina: </label>
                    <br />
                    <input type='text' className='form-control' name='nominaId' onChange={handleChange}></input>
                    <br />
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-primary' onClick={()=>ingresarEmpleado()}>Insertar</button>
                <button className='btn btn-danger' onClick={()=>abrirCerrarModalInsertar()}>Cerrar</button>
            </ModalFooter>
        </Modal> 

    <Modal isOpen={modalEditar}>
      <ModalHeader>
          Editar datos del empleado
      </ModalHeader>  
      <ModalBody>
        <div className='form-group'>
          </div>
            <label>ID: </label>
            <br />
            <input type='text' className='form-control' name='id' readOnly value={empleado && empleado.empleadoId} ></input>
            <br />
            <label>Nombre: </label>
            <br />
            <input type='text' className='form-control' name='nombres' onChange={handleChange} value={empleado && empleado.nombres}></input>
            <br />
            <label>Apellidos: </label>
            <br />
            <input type='text' className='form-control' name='apellidos' onChange={handleChange} value={empleado && empleado.apellidos}></input>
            <br />
            <label>Télefono: </label>
            <br />
            <input type='text' className='form-control' name='telefono' onChange={handleChange} value={empleado && empleado.telefono}></input>
            <br />
            <label>Dirección: </label>
            <br />
            <input type='text' className='form-control' name='direccion' onChange={handleChange} value={empleado && empleado.direccion}></input>
            <br />
            <label>Id del cargo: </label>
            <br />
            <input type='text' className='form-control' name='cargoId' onChange={handleChange} value={empleado && empleado.cargoId}></input>
            <br />
            <label>Id de nómina: </label>
            <br />
            <input type='text' className='form-control' name='nominaId' onChange={handleChange} value={empleado && empleado.nominaId}></input>
            <br />
      </ModalBody>
      <ModalFooter>
          <button className='btn btn-primary' onClick={()=>editarEmpleado()}>Editar</button>
          <button className='btn btn-danger' onClick={()=>abrirCerrarModalEditar()}>Cerrar</button>
      </ModalFooter>
      </Modal>
      
      <Modal isOpen={modalEliminar}>
        <ModalHeader>
            Eliminar empleado
        </ModalHeader>
        <ModalBody>
        <div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"></svg>
        <div>
        ¿Estás seguro de eliminar al empleado: {empleado && empleado.nombres.concat(" "+empleado.apellidos)}?
        </div> 

        </div>
        </ModalBody>
        <ModalFooter>
            <button className='btn btn-danger' onClick={()=>eliminarEmpleado()}>Si</button>
            <button className='btn btn-primary' onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </ModalFooter>
      </Modal>
    </div>
    );
};

export default About;