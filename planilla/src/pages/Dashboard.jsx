import React, { useState } from 'react';
import {
    FaBars,
    FaUserAlt,
    FaThList,
    FaBusinessTime,
}from "react-icons/fa";
import {BiLogOut} from "react-icons/bi"
import {VscGraphLine} from "react-icons/vsc";
import {BsTable} from "react-icons/bs";
import { NavLink } from 'react-router-dom';


const Dashboard = ({children}) => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const cerrarSesion = () => setIsOpen (
        localStorage.removeItem('user'),
        window.location.href='./'
    );
    const menuItem=[
        {
            path:"/",
            name:"Empleados",
            icon:<FaUserAlt/>
        },
        {
            path:"/analytics",
            name:"Cargos",
            icon:<FaBusinessTime/>
        },
        {
            path:"/comment",
            name:"Departamentos",
            icon:<VscGraphLine/>
        },
        {
            path:"/product",
            name:"Calculos",
            icon:<BsTable/>
        },/*
        {
            path:"/productList",
            name:"5",
            icon:<FaThList/>
        }*/
    ]
    return (
        <div className="container-fluid px-0 mx-0">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar container-icon">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Menú</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <div className="w-100 h-100 mx-0 px-0 container-menu">
                <div className="nav-bar w-100 px-4">
                    <div className="col-12 h-100">
                        <div className="row h-100">
                            <div className="col-0 col-sm-4 px-0 d-none d-sm-block">
                            </div>    
                            <div className="col-0 col-sm-4 px-0 d-none d-sm-block text-center">
                               
                            </div>    
                            <div className="col-12 col-sm-4 px-0 center-v h-100">
                                <div className="w-100 center-r">
                                   <span onClick={cerrarSesion}>Cerrar Sesión <span className="icon-logout"><BiLogOut/></span></span> 
                                </div>
                            </div>    
                        </div>    
                    </div>   
                </div>
                <div className="menu w-100">{children}</div>
           </div>
        </div>
    );
};

export default Dashboard;