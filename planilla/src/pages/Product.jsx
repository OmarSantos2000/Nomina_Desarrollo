import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {styleSubOptions} from '../estilos/styleSubOptions.css'

    const Product = () => {
      const widthTable =  {
        maxWidth: '1000px', 
        margin: '0 auto', 
        borderColor: '#3e3131'
    }
    var listadoEmpleados = []; 
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    const [modalVerEmpleados, setModalVerEmpleados]=useState(false);
    const baseUrl = "https://localhost:7268/V1/Nominas"

      const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
      }
    
      const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
      }
  
      const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
      }

      const abrirCerrarModalVerEmpleados=()=>{
        setModalVerEmpleados(!modalVerEmpleados);
        }

      const seleccionarnomina=(nomina, caso)=>{
        Setnomina(nomina);
        (caso === "Editar")?
        abrirCerrarModalEditar(): abrirCerrarModalEliminar();
      }

      const verEmpleados=(nomina) => {
        abrirCerrarModalVerEmpleados();
      	}

      const handleChange=e=>{
        const {name, value}=e.target;
        Setnomina({
          ...nomina,
          [name]: value
        });
      }

      const [nomina, Setnomina] = useState({
        horas: '',
        valorHora: '',
        sueldo: '',
      })
    
    const obtenernominas=async()=>{
        await axios.get(baseUrl)
          .then(response => {
            setData(response.data);
          }).catch(error => {
          })
        }

    const ingresarnomina=async()=>{
        delete nomina.nominaId;
        nomina.horas=parseInt(nomina.horas);
        nomina.valorHora=parseInt(nomina.valorHora);
        nomina.sueldo = nomina.horas * nomina.valorHora;
        await axios.post(baseUrl, nomina)
        .then(response => {
            abrirCerrarModalInsertar();
            obtenernominas();
        }).catch(error => {
        })
        }

    const editarnomina=async()=>{
        nomina.horas=parseInt(nomina.horas);
        nomina.valorHora=parseInt(nomina.valorHora);
        nomina.sueldo = nomina.horas * nomina.valorHora;
        await axios.put(baseUrl+"/"+nomina.nominaId, nomina)
        .then(response => {
            abrirCerrarModalEditar();
            obtenernominas();
        }).catch(error => {
        })
        }

    const eliminarnomina=async()=>{
        await axios.delete(baseUrl+"/"+nomina.nominaId)
        .then(response => {
            setData(data.filter(nomina=>
            nomina.id !== response.data.nominaId));
            abrirCerrarModalEliminar();
            obtenernominas();
        }).catch(error => {
        })
        }

        useEffect(()=>{
            obtenernominas();
        },[]);
        const [data, setData] = useState([]);
        
    return (
        <div className="App contenedor-principal">
        <br></br>
        <div className="w-100 text-center">
            <button className='btn btn-success' onClick={()=>abrirCerrarModalInsertar()}>Insertar nomina</button>
        </div>
        <br></br>
        <table className = "table table-bordered d-md-table d-none" style={widthTable}>
        {/*Cabecera*/}
        <thead className="text-center"> 
        <tr>
          <th>ID</th>
          <th>Horas</th>
          <th>Valor de hora</th>
          <th>Sueldo</th>
          <th>ACCIONES</th>
          <th>Empleados</th>
        </tr> 
        </thead> 
        {/*Cuerpo de datos*/}
        <tbody className="text-center">
          {data.map(nomina=>(
            <tr key= {nomina.id}>
              <td>{nomina.nominaId}</td>
              <td>{nomina.horas}</td>
              <td>{nomina.valorHora}</td>
              <td>{nomina.horas * nomina.valorHora}</td>
              <td>
              <button className='btn btn-primary' onClick={()=>seleccionarnomina(nomina, "Editar")}>Editar</button>{" "}
              <button className='btn btn-danger' onClick={()=>seleccionarnomina(nomina, "Eliminar")}>Eliminar</button>
              </td>
              <td>
                <button className='btn btn-primary' onClick={()=>verEmpleados(nomina)}>Ver empleados</button>
              </td>
            </tr>
          ))}
        </tbody>    
        </table>

        <Modal isOpen={modalInsertar}>
            <ModalHeader>
                Registrar nómina
            </ModalHeader>     
            <ModalBody>
                <div className='form-group'>
                </div>
                    <label>Horas: </label>
                    <br />
                    <input type='text' className='form-control' name='horas' onChange={handleChange}></input>
                    <br />
                    <label>Valor de hora: </label>
                    <br />
                    <input type='text' className='form-control' name='valorHora' onChange={handleChange}></input>
                    <br />
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-primary' onClick={()=>ingresarnomina()}>Insertar</button>
                <button className='btn btn-danger' onClick={()=>abrirCerrarModalInsertar()}>Cerrar</button>
            </ModalFooter>
        </Modal> 

    <Modal isOpen={modalEditar}>
      <ModalHeader>
          Editar datos del nómina
      </ModalHeader>  
      <ModalBody>
        <div className='form-group'>
          </div>
            <label>ID: </label>
            <br />
            <input type='text' className='form-control' name='id' readOnly value={nomina && nomina.nominaId} ></input>
            <br />
            <label>Horas: </label>
            <br />
            <input type='text' className='form-control' name='horas' onChange={handleChange} value={nomina && nomina.horas}></input>
            <br />
            <label>Valor de hora: </label>
            <br />
            <input type='text' className='form-control' name='valorHora' onChange={handleChange} value={nomina && nomina.valorHora}></input>
            <br />
            <label>Sueldo: </label>
            <br />
            <input type='text' className='form-control' name='sueldo' readOnly onChange={handleChange} value={nomina && nomina.sueldo}></input>
            <br />
      </ModalBody>
      <ModalFooter>
          <button className='btn btn-primary' onClick={()=>editarnomina()}>Editar</button>
          <button className='btn btn-danger' onClick={()=>abrirCerrarModalEditar()}>Cerrar</button>
      </ModalFooter>
      </Modal>
      
      <Modal isOpen={modalEliminar}>
        <ModalHeader>
            Eliminar nómina
        </ModalHeader>
        <ModalBody>
        <div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"></svg>
        <div>
        ¿Estás seguro de eliminar al nómina: {nomina && nomina.nominaId}?
        </div> 

        </div>
        </ModalBody>
        <ModalFooter>
            <button className='btn btn-danger' onClick={()=>eliminarnomina()}>Si</button>
            <button className='btn btn-primary' onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalVerEmpleados}>
            <ModalHeader className="w-100 text-center">
                Empleados de la nomina
            </ModalHeader>     
            <ModalBody>
                <div className='form-group'>
                </div>
                    <label>Horas: </label>
                    <br />
                    <input type='text' className='form-control' name='horas' onChange={handleChange}></input>
                    <br />
                    <label>Valor de hora: </label>
                    <br />
                    <input type='text' className='form-control' name='valorHora' onChange={handleChange}></input>
                    <br />
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-danger' onClick={()=>abrirCerrarModalVerEmpleados()}>Cerrar</button>
            </ModalFooter>
        </Modal> 

    </div>
    );
};

export default Product;