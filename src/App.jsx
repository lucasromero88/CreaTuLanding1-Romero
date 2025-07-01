import { ItemListContainer } from './itemListContainer/ItemListContainer'
import { Navbar } from './navbar/Navbar'

function App() {

  return (
    <div>
      <Navbar />
      <ItemListContainer tituloSaludo="Bienvenido a la tienda de Punto de Vista | Optica" />
    </div>
  )
}

export default App
