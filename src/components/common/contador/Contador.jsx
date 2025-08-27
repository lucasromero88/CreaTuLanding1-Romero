import { useEffect, useState } from "react";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#f2f2f2",
    borderRadius: "50px",
    padding: "5px",
    border: "1px solid #ddd",
  },
  button: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#e0e0e0",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  quantity: {
    fontSize: "18px",
    fontWeight: "600",
    minWidth: "30px",
    textAlign: "center",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    marginLeft: "15px",
    transition: "background-color 0.3s",
  },
};

const Contador = ({ stock = 0, onAdd }) => {
  const [quantity, setQuantity] = useState(stock > 0 ? 1 : 0);

  useEffect(() => {
    setQuantity((q) => {
      if (stock <= 0) return 0;
      return q === 0 ? 1 : Math.min(q, stock);
    });
  }, [stock]);

  const disabledAdd = stock <= 0 || quantity <= 0;
  const canDecrement = stock > 0 && quantity > 1;
  const canIncrement = stock > 0 && quantity < stock;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={styles.container}>
        <button
          style={{ ...styles.button, opacity: canDecrement ? 1 : 0.5, cursor: canDecrement ? "pointer" : "not-allowed" }}
          disabled={!canDecrement}
          onClick={() => setQuantity((prev) => Math.max(prev - 1, 0))}
        >
          -
        </button>

        <span style={styles.quantity}>{quantity}</span>

        <button
          style={{ ...styles.button, opacity: canIncrement ? 1 : 0.5, cursor: canIncrement ? "pointer" : "not-allowed" }}
          disabled={!canIncrement}
          onClick={() => setQuantity((prev) => Math.min(prev + 1, stock))}
        >
          +
        </button>
      </div>

      <button
        style={{
          ...styles.addButton,
          opacity: disabledAdd ? 0.6 : 1,
          cursor: disabledAdd ? "not-allowed" : "pointer",
        }}
        disabled={disabledAdd}
        onClick={() => onAdd(quantity)}
        onMouseOver={(e) => {
          if (!disabledAdd) e.currentTarget.style.backgroundColor = "#2980b9";
        }}
        onMouseOut={(e) => {
          if (!disabledAdd) e.currentTarget.style.backgroundColor = "#3498db";
        }}
      >
        {stock <= 0 ? "Sin stock" : "Agregar al Carrito"}
      </button>
    </div>
  );
};

export default Contador;
