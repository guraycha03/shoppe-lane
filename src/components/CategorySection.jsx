// src/components/CategorySection.jsx


import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const basePath = import.meta.env.BASE_URL;

const categories = [
  { name: 'Beauty', image: `${basePath}images/categories/beauty.jpg`, path: '/category/beauty' },
  { name: 'Women', image: `${basePath}images/categories/women.jpg`, path: '/category/women' },
  { name: 'Men', image: `${basePath}images/categories/men.jpg`, path: '/category/men' },
  { name: 'Kids', image: `${basePath}images/categories/kids.jpg`, path: '/category/kids' },
  { name: 'Accessories', image: `${basePath}images/categories/accessories.jpg`, path: '/category/accessories' },
  { name: 'Home', image: `${basePath}images/categories/home.jpg`, path: '/category/home' },
  { name: 'Lifestyle', image: `${basePath}images/categories/lifestyle.jpg`, path: '/category/lifestyle' },
  { name: 'Essentials', image: `${basePath}images/categories/essentials.jpg`, path: '/essentials' },
  { name: 'On Sale', image: `${basePath}images/categories/sale.jpg`, path: '/sale' },
  { name: 'Bestsellers', image: `${basePath}images/categories/bestsellers.jpg`, path: '/bestsellers' },
];

function CategorySection() {
  const navigate = useNavigate();

  return (
    <section className="category-section container my-5">
      <h2 className="text-center mb-4">Shop by Category</h2>
      <div className="row g-4">
        {categories.map((cat, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3">
            <div className="category-card" onClick={() => navigate(cat.path)}>
              <img src={cat.image} alt={cat.name} className="img-fluid category-image" />
              <div className="category-overlay">
                <h5 className="category-title">{cat.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
