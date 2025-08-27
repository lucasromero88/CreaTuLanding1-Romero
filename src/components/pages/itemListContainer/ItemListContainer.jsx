import { useEffect, useState } from "react";
import ProductCard from "../../common/ProductCard/ProductCard";
import "./ItemListContainer.css";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";

const SLUG_TO_DB = {
  "gafas-de-sol": "Gafas de sol",
  "gafas-estandar": "Gafas estandar",
};

const ItemListContainer = () => {
  const params = useParams();
  const rawParam = (params.name ?? params.categoryId ?? "").trim().toLowerCase() || null;
  
  const categoryValue = rawParam ? (SLUG_TO_DB[rawParam] ?? rawParam) : null;

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setErr(null);

        const baseRef = collection(db, "products");
        const ref = categoryValue
          ? query(baseRef, where("category", "==", categoryValue))
          : baseRef;

        const snap = await getDocs(ref);
        const data = snap.docs.map((d) => {
          const raw = d.data();
          const img = raw.imageUrl ?? raw.img ?? null;
          return {
            id: d.id,
            title: raw.title ?? raw.name ?? "(sin título)",
            description: raw.description ?? "",
            price: raw.price ?? 0,
            imageUrl: (typeof img === "string" && img.trim() !== "") ? img : null,
            category: raw.category ?? null,
          };
        });

        if (!cancelled) setItems(data);
      } catch (e) {
        if (!cancelled) setErr(e.message);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchProducts();
    return () => { cancelled = true; };
  }, [categoryValue]);

  if (isLoading) return <div className="loader-container"><h1>Cargando productos…</h1></div>;
  if (err) return <div className="loader-container"><h1>Error: {err}</h1></div>;
  if (items.length === 0)
    return (
      <div className="items-container">
        <p>No se encontraron productos {categoryValue ? `para "${categoryValue}"` : ""}.</p>
      </div>
    );

  return (
    <div className="items-container">
      {items.map((item) => <ProductCard key={item.id} item={item} />)}
    </div>
  );
};

export { ItemListContainer };
