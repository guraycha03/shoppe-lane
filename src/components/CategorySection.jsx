// src/components/CategorySection.jsx


import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const base = import.meta.env.BASE_URL;

const categories = [
  
  { name: 'Home', image: `https://res.cloudinary.com/dyjd4nbrf/image/upload/v1753797552/home_ktmdlm.jpg`, path: '/bestsellers' },
  { name: 'Women', image: `https://res.cloudinary.com/dyjd4nbrf/image/upload/v1753797610/women_gmvg1o.jpg`, path: '/category/home' },
  { name: 'Men', image: `${import.meta.env.BASE_URL}images/categories/kids.jpg`, path: '/category/kids' },
  { name: 'Kids', image: `${import.meta.env.BASE_URL}images/categories/lifestyle.jpg`, path: '/category/lifestyle' },
  { name: 'Essentials', image: `${import.meta.env.BASE_URL}images/categories/essentials.jpg`, path: '/essentials' },
  { name: 'Beauty', image: `${import.meta.env.BASE_URL}images/categories/men.jpg`, path: '/category/men' },
  { name: 'Accessories', image: `https://res.cloudinary.com/dyjd4nbrf/image/upload/v1753797345/accessories_xsezct.jpg`, path: '/category/accessories' },
  { name: 'Lifestyle', image: `${import.meta.env.BASE_URL}images/categories/sale.jpg`, path: '/sale' },
  { name: 'Stationery', image: `${import.meta.env.BASE_URL}images/categories/women.jpg`, path: '/category/women' },
  { name: 'Gift Ideas', image: `${import.meta.env.BASE_URL}images/categories/sale.jpg`, path: '/sale' },
  { name: 'Office Supplies', image: `${import.meta.env.BASE_URL}images/categories/women.jpg`, path: '/category/women' },
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
