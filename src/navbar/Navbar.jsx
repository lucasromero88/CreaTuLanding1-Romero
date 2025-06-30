import React from 'react'
import { CartWidget } from '../cartWidget/CartWidget'

export const Navbar = () => {
  return (
    <div>
        <h1>Punto de Vista | Tienda</h1>
        <ul>
            <li>Inicio</li>
            <li>Productos</li>
            <li><CartWidget bubbleCounter={5}/></li>
            <li>Sobre Nosotros</li>
            <li>Contactenos</li>
        </ul>

    </div>
  )
}
