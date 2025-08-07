export const products = [
   
    {
      id: "1",
      name: "Gafas Steffani",
      img: "https://res.cloudinary.com/dtbbnfylm/image/upload/v1754523764/imagen-carrusel-3_x6i582.jpg",
      price: 1850,
      category: "Gafas estandar",
      description: "Gafas para mejor vision y comodidad. Diseño ergonómico y ligero.",
      stock: 15
    },
    {
      id: "2",
      name: "Gafas Urbanos",
      img: "https://res.cloudinary.com/dtbbnfylm/image/upload/v1754523764/imagen-carrusel-4_qnaagh.jpg",
      price: 2000,
      category: "Gafas mecánicas",
      description: "Gafas de sol con lentes polarizados. Protección UV400 y diseño moderno.",
      stock: 8
    },
    {
      id: "3",
      name: "Gafas Ruanna",
      img: "https://res.cloudinary.com/dtbbnfylm/image/upload/v1754523764/imagen-carrusel-2_sbepvi.jpg",
      price: 122000,
      category: "gafas de sol",
      description: "Gadas estetéticas con lentes de alta calidad. Diseño elegante y moderno.",
      stock: 20
    },
    {
      id: "4",
      name: "Gafas Rusty",
      img: "https://res.cloudinary.com/dtbbnfylm/image/upload/v1754523764/imagen-carrusel-1_lo7xpp.jpg",
      price: 100100,
      category: "Gafas de sol",
      description: "Gafas  Rusty con lentes de alta calidad. Diseño elegante y moderno.",
      stock: 5
    }
  ];
  

  export const getProducts = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 1000); 
    });
  };
  
  
  export const getProductById = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.find(prod => prod.id === id));
      }, 500);
    });
  };
  
  
  export const getProductsByCategory = (category) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.filter(prod => prod.category === category));
      }, 500);
    });
  };