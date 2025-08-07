import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../../../products";
import Contador from "../../common/contador/Contador";   
import "./ItemDetailContainer.css";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [itemAdded, setItemAdded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getProductById(id)
      .then((res) => setProduct(res))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [id]);

  const onAdd = (quantity) => {
    console.log(`Se agregaron ${quantity} unidades de ${product.name}. (Esto aún no se guarda en ningún lado)`);
    setItemAdded(true);
  };

  if (isLoading) {
    return <div className="loader-container"><h1>Cargando...</h1></div>;
  }
  if (!product) {
    return <div className="loader-container"><h1>Producto no encontrado</h1></div>;
  }

  return (
    <div className="detail-container">
      <h1>{product.name}</h1>
      <img src={product.img} alt={product.name} className="detail-img" />
      <p className="detail-desc">{product.description}</p>
      <h3 className="detail-price">Precio: ${product.price}</h3>
      <p>Stock disponible: {product.stock}</p>
      
      {itemAdded ? (
        <div style={{marginTop: '20px', textAlign: 'center'}}>
          <p>¡Producto "agregado" a la consola!</p>
          <Link to="/cart" className="finish-button">Terminar compra</Link>
        </div>
      ) : (
        <Contador stock={product.stock} onAdd={onAdd} />
      )}
    </div>
  );
};

export default ItemDetailContainer;