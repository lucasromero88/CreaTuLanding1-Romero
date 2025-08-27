
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "../../../context/CartContext";

export const CartWidget = () => {
  const { getTotalQuanty } = useCart();
  const count = getTotalQuanty();

  const styleBubble = {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    padding: "2px 6px",
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 1,
  };

  const styleCart = {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
    backgroundColor: "steelblue",
    border: "none",
    padding: 10,
    borderRadius: 5,
  };

  return (
    <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
      <button style={styleCart}>
        <FaCartShopping size={24} />
        {count > 0 && <span style={styleBubble}>{count}</span>}
      </button>
    </Link>
  );
};
