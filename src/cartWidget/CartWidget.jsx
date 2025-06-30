import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";

export const CartWidget = ( {bubbleCounter = 0} ) => {

    const styleBubble = {
        position: 'absolute',
        top: '-5',
        right: '-5',
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '50%',
        padding: '2px 5px',
        fontWeigth: 'bold',
        fontSize: '12px',
    }

    const styleCart = {
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        backgroundColor: 'steelblue',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
    }

    const [bubbleInc, setBubbleInc] = useState(0);

    const incrementBubble = () => {
        setBubbleInc(bubbleInc + 1);
    }

  return (
    <div>
        {/* <h2>Icono del carrito</h2>
        <h3>Burbuja</h3> */}
        <button style={styleCart} onClick={incrementBubble}><FaCartShopping size={24}/></button>

        {bubbleCounter > 0 && (
          <span className="bubble" style={styleBubble}>{bubbleInc}</span>
        )}
    </div>
  )
}
