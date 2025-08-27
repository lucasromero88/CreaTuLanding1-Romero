import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Contador from "../../common/contador/Contador";
import { useCart } from "../../../context/CartContext";
import "./ItemDetailContainer.css";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [itemAdded, setItemAdded] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const snap = await getDoc(doc(db, "products", id));
        if (!snap.exists()) {
          if (!cancelled) {
            setErr("Producto no encontrado");
            setProduct(null);
          }
          return;
        }

        const data = snap.data();

        
        const normalized = {
          id: snap.id,
          name: data.name ?? data.title ?? "(sin nombre)",
          description: data.description ?? data.desc ?? "",
          price: data.price ?? 0,
          stock: data.stock ?? data.quantity ?? 0,
          img: (() => {
            const url = data.imageUrl ?? data.img ?? null;
            return typeof url === "string" && url.trim() !== "" ? url : null;
          })(),
        };

        if (!cancelled) {
          setProduct(normalized);
          setErr(null);
        }
      } catch (e) {
        if (!cancelled) setErr(e.message);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchProduct();
    return () => { cancelled = true; };
  }, [id]);

  const onAdd = (quantity) => {
    if (!product) return;
    // console.log(`Se agregaron ${quantity} unidades de ${product.name}.`);
    // setItemAdded(true);
    if (!product) return;
      const item = {
        id: product.id,
        title: product.name ?? product.title ?? "(sin nombre)",
        price: product.price ?? 0,
        imageUrl: product.img ?? product.imageUrl ?? null,
        stock: product.stock ?? 0,
      };
    addToCart(item, quantity);
    setItemAdded(true);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <h1>Cargando...</h1>
      </div>
    );
  }

  if (err) {
    return (
      <div className="loader-container">
        <h1>Error: {err}</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="loader-container">
        <h1>Producto no encontrado</h1>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <h1>{product.name}</h1>

      {product.img && (
        <img
          src={product.img}
          alt={product.name || "Producto"}
          className="detail-img"
          loading="lazy"
        />
      )}

      <p className="detail-desc">{product.description}</p>
      <h3 className="detail-price">Precio: ${product.price}</h3>
      <p>Stock disponible: {product.stock}</p>

      {itemAdded ? (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>¡Producto agregado!</p>
          <Link to="/cart" className="finish-button">
            Terminar compra
          </Link>
        </div>
      ) : (
        <Contador stock={product.stock} onAdd={onAdd} />
      )}
    </div>
  );
};

export default ItemDetailContainer;