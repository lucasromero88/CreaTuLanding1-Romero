import { useEffect, useState } from "react";
import { getProducts } from "../../../products"; 
import ProductCard from "../../common/productCard/ProductCard";
import "./ItemListContainer.css"; 

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getProducts() 
      .then((response) => {
        setItems(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  
  if (isLoading) {
    return (
      <div className="loader-container">
        <h1>Cargando productos...</h1>
      </div>
    );
  }

 
  return (
    <div className="items-container">
      {items.map((item) => {
        return <ProductCard key={item.id} item={item} />;
      })}
    </div>
  );
};

export { ItemListContainer };