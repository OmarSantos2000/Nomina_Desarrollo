import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {styleSubOptions} from '../estilos/styleSubOptions.css'

    const Analytics = () => {
        const widthTable =  {
            maxWidth: '1200px', 
            margin: '0 auto', 
            borderColor: '#3e3131'
        }
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    const baseUrl = "https://localhost:7268/V1/Cargos"

      const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
      }
    
      const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
      }
  
      const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
      }

      const seleccionarcargo=(cargo, caso)=>{
        Setcargo(cargo);
        (caso === "Editar")?
        abrirCerrarModalEditar(): abrirCerrarModalEliminar();
      }

      const handleChange=e=>{
        const {name, value}=e.target;
        Setcargo({
          ...cargo,
          [name]: value
        });
      }

      const [cargo, Setcargo] = useState({
        nombre_cargo: '',
        departamentoId: '',
      })
    
    const obtenercargos=async()=>{
        await axios.get(baseUrl)
          .then(response => {
            setData(response.data);
          }).catch(error => {
          })
        }

    const ingresarcargo=async()=>{
        delete cargo.cargoId;
        cargo.departamentoId=parseInt(cargo.departamentoId);
        await axios.post(baseUrl, cargo)
        .then(response => {
            abrirCerrarModalInsertar();
            obtenercargos();
        }).catch(error => {
        })
        }

    const editarcargo=async()=>{
        cargo.departamentoId=parseInt(cargo.departamentoId);
        await axios.put(baseUrl+"/"+cargo.cargoId, cargo)
        .then(response => {
            abrirCerrarModalEditar();
            obtenercargos();
        }).catch(error => {
        })
        }

    const eliminarcargo=async()=>{
        await axios.delete(baseUrl+"/"+cargo.cargoId)
        .then(response => {
            setData(data.filter(cargo=>
            cargo.id !== response.data.cargoId));
            abrirCerrarModalEliminar();
            obtenercargos();
        }).catch(error => {
        })
        }

        useEffect(()=>{
            obtenercargos();
        },[]);
        const [data, setData] = useState([]);
        
    return (
        <div className="App contenedor-principal">
        <br></br>
        <div className="w-100 text-center">
            <button className='btn btn-success' onClick={()=>abrirCerrarModalInsertar()}>Insertar Cargo</button>
        </div>
        <br></br>
        <table className = "table table-bordered d-md-table d-none" style={widthTable}>
        {/*Cabecera*/}
        <thead className="text-center"> 
        <tr>
          <th>ID</th>
          <th>Cargo</th>
          <th>Departamento</th>
          <th>ACCIONES</th>
        </tr> 
        </thead> 
        {/*Cuerpo de datos*/}
        <tbody className="text-center">
          {data.map(cargo=>(
            <tr key= {cargo.id}>
              <td>{cargo.cargoId}</td>
              <td>{cargo.nombre_cargo}</td>
              <td>{cargo.departamento.nombre_Depto}</td>
              <td>
              <button className='btn btn-primary' onClick={()=>seleccionarcargo(cargo, "Editar")}>Editar</button>{" "}
              <button className='btn btn-danger' onClick={()=>seleccionarcargo(cargo, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>    
        </table>

        <Modal isOpen={modalInsertar}>
            <ModalHeader>
                Registrar cargo
            </ModalHeader>     
            <ModalBody>
                <div className='form-group'>
                </div>
                    <label>Nombre del cargo: </label>
                    <br />
                    <input type='text' className='form-control' name='nombre_cargo' onChange={handleChange}></input>
                    <br />
                    <label>Id del departamento: </label>
                    <br />
                    <input type='text' className='form-control' name='departamentoId' onChange={handleChange}></input>
                    <br />
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-primary' onClick={()=>ingresarcargo()}>Insertar</button>
                <button className='btn btn-danger' onClick={()=>abrirCerrarModalInsertar()}>Cerrar</button>
            </ModalFooter>
        </Modal> 

    <Modal isOpen={modalEditar}>
      <ModalHeader>
          Editar datos del cargo
      </ModalHeader>  
      <ModalBody>
        <div className='form-group'>
          </div>
            <label>ID: </label>
            <br />
            <input type='text' className='form-control' name='cargoId' readOnly value={cargo && cargo.cargoId} ></input>
            <br />
            <label>Nombre del cargo: </label>
            <br />
            <input type='text' className='form-control' name='nombre_cargo' onChange={handleChange} value={cargo && cargo.nombre_cargo}></input>
            <br />
            <label>Id del departamento: </label>
            <br />
            <input type='text' className='form-control' name='departamentoId' onChange={handleChange} value={cargo && cargo.departamentoId}></input>
            <br />
      </ModalBody>
      <ModalFooter>
          <button className='btn btn-primary' onClick={()=>editarcargo()}>Editar</button>
          <button className='btn btn-danger' onClick={()=>abrirCerrarModalEditar()}>Cerrar</button>
      </ModalFooter>
      </Modal>
      
      <Modal isOpen={modalEliminar}>
        <ModalHeader>
            Eliminar cargo
        </ModalHeader>
        <ModalBody>
        <div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"></svg>
        <div>
        ¿Estás seguro de eliminar el cargo: {cargo && cargo.nombre_cargo}?
        </div> 

        </div>
        </ModalBody>
        <ModalFooter>
            <button className='btn btn-danger' onClick={()=>eliminarcargo()}>Si</button>
            <button className='btn btn-primary' onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </ModalFooter>
      </Modal>
    </div>
    );
};

export default Analytics;