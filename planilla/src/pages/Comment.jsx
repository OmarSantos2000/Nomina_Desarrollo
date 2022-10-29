import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {styleSubOptions} from '../estilos/styleSubOptions.css'

    const Comment = () => {
    const widthTable =  {
        maxWidth: '800px', 
        margin: '0 auto', 
        borderColor: '#3e3131'
    }
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    const baseUrl = "https://localhost:7268/V1/Departamentos"

      const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
      }
    
      const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
      }
  
      const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
      }

      const seleccionardepartamento=(departamento, caso)=>{
        Setdepartamento(departamento);
        (caso === "Editar")?
        abrirCerrarModalEditar(): abrirCerrarModalEliminar();
      }

      const handleChange=e=>{
        const {name, value}=e.target;
        Setdepartamento({
          ...departamento,
          [name]: value
        });
      }

      const [departamento, Setdepartamento] = useState({
        nombre_Depto: '',
      })
    
    const obtenerdepartamentos=async()=>{
        await axios.get(baseUrl)
          .then(response => {
            setData(response.data);
          }).catch(error => {
          })
        }

    const ingresardepartamento=async()=>{
        delete departamento.departamentoId;
        await axios.post(baseUrl, departamento)
        .then(response => {
            abrirCerrarModalInsertar();
            obtenerdepartamentos();
        }).catch(error => {
        })
        }

    const editardepartamento=async()=>{
        await axios.put(baseUrl+"/"+departamento.departamentoId, departamento)
        .then(response => {
            abrirCerrarModalEditar();
            obtenerdepartamentos();
        }).catch(error => {
        })
        }

    const eliminardepartamento=async()=>{
        await axios.delete(baseUrl+"/"+departamento.departamentoId)
        .then(response => {
            setData(data.filter(departamento=>
            departamento.id !== response.data.departamentoId));
            abrirCerrarModalEliminar();
            obtenerdepartamentos();
        }).catch(error => {
        })
        }

        useEffect(()=>{
            obtenerdepartamentos();
        },[]);
        const [data, setData] = useState([]);
        
    return (
        <div className="App contenedor-principal">
        <br></br>
        <div className="w-100 text-center">
            <button className='btn btn-success' onClick={()=>abrirCerrarModalInsertar()}>Insertar Departamento</button>
        </div>
        <br></br>
        <table style={widthTable} className = "table table-bordered d-md-table d-none">
        {/*Cabecera*/}
        <thead className="text-center"> 
        <tr>
          <th>ID</th>
          <th>departamento</th>
          <th>ACCIONES</th>
        </tr> 
        </thead> 
        {/*Cuerpo de datos*/}
        <tbody className="text-center">
          {data.map(departamento=>(
            <tr key= {departamento.id}>
              <td>{departamento.departamentoId}</td>
              <td>{departamento.nombre_Depto}</td>
              <td>
              <button className='btn btn-primary' onClick={()=>seleccionardepartamento(departamento, "Editar")}>Editar</button>{" "}
              <button className='btn btn-danger' onClick={()=>seleccionardepartamento(departamento, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>    
        </table>

        <Modal isOpen={modalInsertar}>
            <ModalHeader>
                Registrar departamento
            </ModalHeader>     
            <ModalBody>
                <div className='form-group'>
                </div>
                    <label>Nombre del departamento: </label>
                    <br />
                    <input type='text' className='form-control' name='nombre_Depto' onChange={handleChange}></input>
                    <br />
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-primary' onClick={()=>ingresardepartamento()}>Insertar</button>
                <button className='btn btn-danger' onClick={()=>abrirCerrarModalInsertar()}>Cerrar</button>
            </ModalFooter>
        </Modal> 

    <Modal isOpen={modalEditar}>
      <ModalHeader>
          Editar datos del departamento
      </ModalHeader>  
      <ModalBody>
        <div className='form-group'>
          </div>
            <label>ID: </label>
            <br />
            <input type='text' className='form-control' name='departamentoId' readOnly value={departamento && departamento.departamentoId} ></input>
            <br />
            <label>Nombre del departamento: </label>
            <br />
            <input type='text' className='form-control' name='nombre_Depto' onChange={handleChange} value={departamento && departamento.nombre_Depto}></input>
            <br />
      </ModalBody>
      <ModalFooter>
          <button className='btn btn-primary' onClick={()=>editardepartamento()}>Editar</button>
          <button className='btn btn-danger' onClick={()=>abrirCerrarModalEditar()}>Cerrar</button>
      </ModalFooter>
      </Modal>
      
      <Modal isOpen={modalEliminar}>
        <ModalHeader>
            Eliminar departamento
        </ModalHeader>
        <ModalBody>
        <div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"></svg>
        <div>
        ¿Estás seguro de eliminar el departamento: {departamento && departamento.nombre_Depto}?
        </div> 

        </div>
        </ModalBody>
        <ModalFooter>
            <button className='btn btn-danger' onClick={()=>eliminardepartamento()}>Si</button>
            <button className='btn btn-primary' onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </ModalFooter>
      </Modal>
    </div>
    );
};

export default Comment;