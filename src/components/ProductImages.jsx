import React, { useRef, useState } from "react";
import "../App.css";
import "./ProductImages.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProductImages({ product, selectedImage, setSelectedImage }) {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);

  const thumbnails = product.images || [];
  const visibleThumbnails = thumbnails.slice(visibleIndex, visibleIndex + 3);

  const scroll = (direction) => {
    if (direction === "left" && visibleIndex > 0) {
      setVisibleIndex(visibleIndex - 1);
    } else if (direction === "right" && visibleIndex < thumbnails.length - 3) {
      setVisibleIndex(visibleIndex + 1);
    }
  };

  return (
    <div className="product-images-wrapper">
      {/* Thumbnails with arrows */}
      <div className="thumbnail-scroll-wrapper">
        <button className="arrow-btn left" onClick={() => scroll("left")}>
          <ChevronLeft />
        </button>

        <div className="thumbnail-scroll-container">
          {visibleThumbnails.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              onClick={() => setSelectedImage(img)}
              className={`thumbnail-img ${selectedImage === img ? "selected-thumbnail" : ""}`}
            />
          ))}
        </div>

        <button className="arrow-btn right" onClick={() => scroll("right")}>
          <ChevronRight />
        </button>
      </div>

      {/* Main Product Image */}
      <div className="main-image-container">
        <img
          src={selectedImage}
          alt={product.name}
          className="main-product-image img-fluid rounded"
        />
      </div>
    </div>
  );
}

export default ProductImages;
