// src/components/ProductImages.jsx


import React from "react";

function ProductImages({ product, selectedImage, setSelectedImage }) {
  return (
    <div className="col-md-6">
      <div className="product-image-container text-center p-3">
        <img
          src={selectedImage}
          alt={product.name}
          className="img-fluid main-product-image rounded"
          style={{ maxHeight: "450px" }}
        />
      </div>
      <div className="thumbnail-container d-flex justify-content-center gap-2 mt-2">
        {product.images?.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${product.name} thumbnail ${idx + 1}`}
            className={`thumbnail-img ${
              selectedImage === img ? "selected-thumbnail" : ""
            }`}
            onClick={() => setSelectedImage(img)}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              border:
                selectedImage === img ? "2px solid #555" : "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>

    
  );
}

export default ProductImages;
