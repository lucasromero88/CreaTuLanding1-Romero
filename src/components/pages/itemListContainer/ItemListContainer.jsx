import { useEffect, useState } from "react";
// import { getProducts } from "../../../products"; 
import ProductCard from "../../common/productCard/ProductCard";
import "./ItemListContainer.css"; 
// import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const { name } = useParams(); // {}.name

  useEffect(() => {
    // setIsLoading(true);

    // getProducts() 
    //   .then((response) => {
    //     setItems(response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });

    let productoCollection = collection(db, "products");
    let consulta = productoCollection
    if (name) {
      let filtrado = query(productoCollection, where( "category", "==", name));
      consulta = filtrado
    }
    

    let getProducts = getDocs(consulta);
    getProducts.then((res) => {
      let array = res.docs.map((elemento) => {
        return {
          id: elemento.id,
          ...elemento.data(),
        };
      });
      setItems(array);
  });

  }, [name]);

  
  // if (isLoading) {
  //   return (
  //     <div className="loader-container">
  //       <h1>Cargando productos...</h1>
  //     </div>
  //   );
  // }

 
  return (
    <div className="items-container">
      {items.map((item) => {
        return <ProductCard key={item.id} item={item} />;
      })}
    </div>
  );
};

export { ItemListContainer };