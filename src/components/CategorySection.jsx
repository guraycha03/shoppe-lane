// src/components/CategorySection.jsx


import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const base = import.meta.env.BASE_URL;

const categories = [
  { name: 'Accessories', image: `${import.meta.env.BASE_URL}images/categories/accessories.jpg`, path: '/category/accessories' },
  { name: 'Beauty', image: `${import.meta.env.BASE_URL}images/categories/beauty.jpg`, path: '/category/beauty' },
  { name: 'Bestsellers', image: `${import.meta.env.BASE_URL}images/categories/bestsellers.jpg`, path: '/bestsellers' },
  { name: 'Essentials', image: `${import.meta.env.BASE_URL}images/categories/essentials.jpg`, path: '/essentials' },
  { name: 'Home', image: `${import.meta.env.BASE_URL}images/categories/home.jpg`, path: '/category/home' },
  { name: 'Kids', image: `${import.meta.env.BASE_URL}images/categories/kids.jpg`, path: '/category/kids' },
  { name: 'Lifestyle', image: `${import.meta.env.BASE_URL}images/categories/lifestyle.jpg`, path: '/category/lifestyle' },
  { name: 'Men', image: `${import.meta.env.BASE_URL}images/categories/men.jpg`, path: '/category/men' },
  { name: 'On Sale', image: `${import.meta.env.BASE_URL}images/categories/sale.jpg`, path: '/sale' },
  { name: 'Women', image: `${import.meta.env.BASE_URL}images/categories/women.jpg`, path: '/category/women' },
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
