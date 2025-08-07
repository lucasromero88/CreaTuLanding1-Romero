
import { useState } from "react";

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#f2f2f2',
    borderRadius: '50px',
    padding: '5px',
    border: '1px solid #ddd',
  },
  button: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#e0e0e0',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  quantity: {
    fontSize: '18px',
    fontWeight: '600',
    minWidth: '30px',
    textAlign: 'center',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginLeft: '15px',
    transition: 'background-color 0.3s',
  }
};

const Contador = ({ stock, onAdd }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={styles.container}>
        <button 
          style={styles.button}
          onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
        >
          -
        </button>
        <span style={styles.quantity}>{quantity}</span>
        <button 
          style={styles.button}
          onClick={() => setQuantity(prev => (prev < stock ? prev + 1 : stock))}
        >
          +
        </button>
      </div>
      <button 
        style={styles.addButton}
        onClick={() => onAdd(quantity)}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
      >
        Agregar al Carrito
      </button>
    </div>
  );
};

export default Contador;