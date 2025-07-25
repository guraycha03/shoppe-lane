// src/components/ImageGallery.jsx

const THUMBNAILS_TO_SHOW = 4;
const allImages = [product.image, ...(product.images || [])].filter(
  (img, index, self) => self.indexOf(img) === index
);

const visibleImages = allImages.slice(scrollIndex, scrollIndex + THUMBNAILS_TO_SHOW);

const scrollThumbnails = (direction) => {
  const newIndex = scrollIndex + direction;
  const total = (product.images?.length || 0) + 1;
  if (newIndex >= 0 && newIndex <= total - THUMBNAILS_TO_SHOW) {
    setScrollIndex(newIndex);
  }
};


<div className="d-flex flex-column flex-md-row align-items-center justify-content-center">

<div className="d-flex flex-column align-items-center order-2 order-md-1 mt-3 mt-md-0">
  <div className="d-flex flex-row flex-md-column gap-2 align-items-center" ref={thumbnailWrapperRef}>
    {visibleImages.map((img, idx) => (
      <img
        key={idx + scrollIndex}
        src={img}
        alt={`Thumbnail ${idx}`}
        onClick={() => setMainImage(img)}
        style={{
          width: '100px',
          height: '100px',
          objectFit: 'cover',
          borderRadius: '0.5rem',
          border: img === mainImage ? '2px solid #8B6F52' : '1px solid #ccc',
          cursor: 'pointer',
        }}
      />
    ))}
  </div>             

  {allImages.length > THUMBNAILS_TO_SHOW && (
    <div className="d-flex gap-2 mt-2 flex-row">
      <button className="btn btn-sm btn-light" onClick={() => scrollThumbnails(-1)} disabled={scrollIndex === 0}>
        <i className="bi bi-chevron-left"></i>
      </button>
      <button className="btn btn-sm btn-light" onClick={() => scrollThumbnails(1)} disabled={scrollIndex + THUMBNAILS_TO_SHOW >= allImages.length}>
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  )}
</div>
<div className="text-center flex-grow-1 order-1 order-md-2 px-2 px-md-4">
  {mainImage ? (
    <img
      src={mainImage}
      alt={product?.name || 'Product Image'}
      className="img-fluid rounded"
      style={{
        height: '420px',
        width: '100%',
        objectFit: 'contain',
        background: '#F3F1ED',
        padding: '1.5rem',
        borderRadius: '1rem',
      }}
    />
  ) : (
    <div
      style={{
        height: '420px',
        width: '100%',
        background: '#F3F1ED',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '1rem',
      }}
    >
      <span className="text-muted">Image not available</span>
    </div>
  )}
</div>

</div>