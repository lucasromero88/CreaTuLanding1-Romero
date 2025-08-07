import React from 'react'
import { CartWidget } from "../../common/cartWidget/CartWidget";
import './Navbar.css'

export const Navbar = () => {
  return (
    <div>
        {/* <h1>Punto de Vista | Tienda</h1> */}
        {/* <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Productos</a></li>
            <li><CartWidget bubbleCounter={5}/></li>
            <li><a href="#">Sobre Nosotros</a></li>
            <li><a href="#">Contactenos</a></li>
        </ul> */}
        {/* <nav className="navbar navbar-expand-lg navbar-light shadow-sm px-4">
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center gap-3">
                <li className="nav-item">
                <a className="nav-link" href="#">Inicio</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Productos</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Sobre Nosotros</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Contáctenos</a>
                </li>
                <li className="nav-item">
                <CartWidget bubbleCounter={5} />
                </li>
            </ul>
            </div>
        </nav> */}
        <nav className="navbar navbar-expand-lg navbar-light shadow-sm px-4">
            <div className="container-fluid">
                <figure className="logo">
                    <a href="index.html"><img src="https://res.cloudinary.com/dtbbnfylm/image/upload/v1753049832/logo_lyrsw3.png" alt="Logo de óptica Punto de Vista"/></a>
                </figure>
                <button
                    className="navbar-toggler custom-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav align-items-center gap-3">
                        <li className="nav-item">
                        <a className="nav-link" href="#">Inicio</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Productos</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Servicios</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Sobre Nosotros</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Contáctenos</a>
                        </li>
                        <li className="nav-item">
                        <CartWidget bubbleCounter={5} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </div>
  )
}
