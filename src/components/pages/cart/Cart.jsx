import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

const moneyAR = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n ?? 0);

const Cart = () => {
  const { cart, removeById, resetCart, getTotalAmount, getTotalQuanty } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <h2>Tu carrito está vacío</h2>
        <Link to="/" style={{ textDecoration: "underline" }}>
          Volver a comprar
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Carrito ({getTotalQuanty()} ítems)</h2>
      <div style={{ overflowX: "auto", marginTop: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: 8 }}>Producto</th>
              <th style={{ textAlign: "right", padding: 8 }}>Precio</th>
              <th style={{ textAlign: "right", padding: 8 }}>Cantidad</th>
              <th style={{ textAlign: "right", padding: 8 }}>Subtotal</th>
              <th style={{ padding: 8 }}></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((p) => (
              <tr key={p.id} style={{ borderTop: "1px solid #eee" }}>
                <td style={{ padding: 8 }}>
                  <Link to={`/item/${p.id}`} style={{ textDecoration: "none" }}>
                    {p.title ?? p.name ?? "(sin nombre)"}
                  </Link>
                </td>
                <td style={{ textAlign: "right", padding: 8 }}>{moneyAR(p.price)}</td>
                <td style={{ textAlign: "right", padding: 8 }}>{p.quantity}</td>
                <td style={{ textAlign: "right", padding: 8 }}>
                  {moneyAR((Number(p.price) || 0) * (p.quantity || 0))}
                </td>
                <td style={{ textAlign: "center", padding: 8 }}>
                  <button
                    onClick={() => removeById(p.id)}
                    style={{
                      border: "none",
                      background: "#f2f2f2",
                      padding: "6px 10px",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                  >
                    Quitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: "2px solid #ddd" }}>
              <td colSpan={3} style={{ textAlign: "right", padding: 8 }}>
                <b>Total</b>
              </td>
              <td style={{ textAlign: "right", padding: 8 }}>
                <b>{moneyAR(getTotalAmount())}</b>
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <button
          onClick={resetCart}
          style={{
            border: "1px solid #ddd",
            background: "white",
            padding: "10px 14px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Vaciar carrito
        </button>
        <Link to="/" style={{ alignSelf: "center" }}>
          Seguir comprando
        </Link>
        <div style={{ flex: 1 }} />
        <button
          onClick={() => navigate("/checkout")}
          style={{
            border: "none",
            background: "#3498db",
            color: "white",
            padding: "10px 16px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default Cart;
