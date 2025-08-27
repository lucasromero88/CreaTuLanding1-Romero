import React from 'react'
import { CartWidget } from "../../common/cartWidget/CartWidget";
import './Navbar.css'
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light shadow-sm px-4">
            <div className="container-fluid">
                <figure className="logo">
                    <Link to="/"><img src="https://res.cloudinary.com/dtbbnfylm/image/upload/v1753049832/logo_lyrsw3.png" alt="Logo de óptica Punto de Vista"/></Link>
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
                            <Link className="nav-link" to="/category/gafas-estandar">Gafas estandar</Link>
                        </li>
                        <li className='nav-item'> 
                            <Link className='nav-link' to="/category/gafas-de-sol">Gafas de sol</Link>
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
