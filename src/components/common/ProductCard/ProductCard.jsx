import "./productCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  const { title, description, price, id, imageUrl, category } = item;
  const hasImage = typeof imageUrl === "string" && imageUrl.trim() !== "";

  return (
    <div className="cardClass">
      <Link to={`/item/${id}`} className="cardLinks">
        {hasImage && (
          <img
            className="imagenes"
            src={imageUrl}
            alt={title || "Producto"}
            loading="lazy"
          />
        )}
        <div className="card-content">
          <h1>{title}</h1>
          <h3>{category}</h3>
          <h3>{price}</h3>
          <h5>{description}</h5>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
