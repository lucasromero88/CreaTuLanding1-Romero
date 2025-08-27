import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { db } from "../../../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const moneyAR = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n ?? 0);

const Checkout = () => {
  const { cart, getTotalAmount, resetCart } = useCart();

  const [buyer, setBuyer] = useState({ name: "", phone: "", email: "", email2: "" });
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [err, setErr] = useState(null);

  const total = getTotalAmount();

  const onChange = (e) => {
    const { name, value } = e.target;
    setBuyer((b) => ({ ...b, [name]: value }));
  };

  const validate = () => {
    if (!buyer.name.trim()) return "El nombre es obligatorio";
    if (!buyer.phone.trim()) return "El teléfono es obligatorio";
    if (!buyer.email.trim()) return "El email es obligatorio";
    if (buyer.email !== buyer.email2) return "Los emails no coinciden";
    const re = /\S+@\S+\.\S+/;
    if (!re.test(buyer.email)) return "Email inválido";
    if (cart.length === 0) return "El carrito está vacío";
    return null;
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setErr(v);
      return;
    }

    setProcessing(true);
    setErr(null);

    try {
      for (const item of cart) {
        const ref = doc(db, "products", item.id);
        const snap = await getDoc(ref);
        if (!snap.exists()) throw new Error(`Producto no encontrado: ${item.id}`);
        const current = snap.data();
        const currentStock = Number(current.stock ?? 0);
        if ((item.quantity ?? 0) > currentStock) {
          throw new Error(
            `Sin stock suficiente para "${current.title ?? current.name ?? item.id}". Disponible: ${currentStock}`
          );
        }
      }

      const order = {
        buyer: { name: buyer.name, phone: buyer.phone, email: buyer.email },
        items: cart.map((p) => ({
          id: p.id,
          title: p.title ?? p.name ?? "(sin nombre)",
          price: Number(p.price) || 0,
          quantity: p.quantity || 0,
        })),
        total,
        createdAt: serverTimestamp(),
      };

      const ordersRef = collection(db, "orders");
      const { id } = await addDoc(ordersRef, order);

      for (const item of cart) {
        const ref = doc(db, "products", item.id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const current = snap.data();
          const currentStock = Number(current.stock ?? 0);
          await updateDoc(ref, { stock: Math.max(currentStock - (item.quantity || 0), 0) });
        }
      }

      resetCart();
      setOrderId(id);
    } catch (e) {
      console.error(e);
      setErr(e.message);
    } finally {
      setProcessing(false);
    }
  };

  if (orderId) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <h2>¡Gracias por tu compra!</h2>
        <p>Guardá tu número de orden:</p>
        <pre
          style={{
            background: "#f6f8fa",
            display: "inline-block",
            padding: "8px 12px",
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          {orderId}
        </pre>
        <div style={{ marginTop: 16 }}>
          <Link to="/" style={{ textDecoration: "underline" }}>
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Checkout</h2>
      <p style={{ color: "#555" }}>
        Total a pagar: <b>{moneyAR(total)}</b>
      </p>

      {err && (
        <div
          style={{
            background: "#ffecec",
            color: "#b10000",
            padding: "10px 12px",
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          {err}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: 520, display: "grid", gap: 12 }}>
        <div>
          <label>Nombre y Apellido</label>
          <input
            type="text"
            name="name"
            value={buyer.name}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>
        <div>
          <label>Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={buyer.phone}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={buyer.email}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>
        <div>
          <label>Repetir Email</label>
          <input
            type="email"
            name="email2"
            value={buyer.email2}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>

        <div style={{ marginTop: 8, display: "flex", gap: 10 }}>
          <Link to="/" style={{ alignSelf: "center" }}>
            Seguir comprando
          </Link>
          <div style={{ flex: 1 }} />
          <button
            type="submit"
            disabled={processing || cart.length === 0}
            style={{
              border: "none",
              background: processing ? "#7f8c8d" : "#27ae60",
              color: "white",
              padding: "10px 16px",
              borderRadius: 8,
              cursor: processing ? "not-allowed" : "pointer",
              fontWeight: 600,
              minWidth: 160,
            }}
          >
            {processing ? "Procesando..." : "Comprar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
