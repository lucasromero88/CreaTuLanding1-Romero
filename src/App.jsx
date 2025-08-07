// import { ItemListContainer } from './pages/itemListContainer/ItemListContainer'
// import { Navbar } from './layout/navbar/Navbar'

// function App() {

//   return (
//     <div>
//       <Navbar />
//       <ItemListContainer tituloSaludo="Bienvenido a la tienda de Punto de Vista | Optica" />
//     </div>
//   )
// }

// export default App


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemListContainer } from "./components/pages/itemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/pages/ItemDetailContainer/ItemDetailContainer";
import { Navbar } from "./components/layout/navbar/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;