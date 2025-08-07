import "./productCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <div className="cardClass">
      <Link to={`/item/${item.id}`} className="cardLinks">
        <img className="imagenes" src={item.img} alt={item.name} />
        <div className="card-content">
          <h1>{item.name}</h1>
          <h3>${item.price}</h3>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;