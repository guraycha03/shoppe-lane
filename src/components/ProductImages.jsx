// src/components/ProductImages.jsx
import React from "react";
import "../App.css"; // or your correct CSS file path

function ProductImages({ product, selectedImage, setSelectedImage }) {
  const allImages = Array.from(
    new Set([product.image, ...(product.images || [])])
  );

  return (
    <div className="product-images">
      {/* Thumbnails */}
      <div className="product-thumbnails">
        {allImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${product.name} thumbnail ${idx + 1}`}
            onClick={() => setSelectedImage(img)}
            className={`product-thumbnail ${selectedImage === img ? "active" : ""}`}
          />
        ))}
      </div>

      {/* Main image */}
      <div className="main-image">
        <img
          src={selectedImage}
          alt={product.name}
          className="img-fluid"
        />
      </div>
    </div>

  );
}

export default ProductImages;
