import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CategoryDropdown({ categories = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('Categories');
  const navigate = useNavigate();

  const handleSelect = (category) => {
    setSelectedCategory(category);
    navigate(`/category/${category.toLowerCase()}`);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-secondary dropdown-toggle"
        type="button"
        id="categoryDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedCategory}
      </button>

      <ul
        className="dropdown-menu max-h-60 overflow-y-auto custom-scrollbar"
        aria-labelledby="categoryDropdown"
      >
        {categories.map((cat) => (
          <li key={cat}>
            <button
              className="dropdown-item"
              onClick={() => handleSelect(cat)}
              type="button"
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default CategoryDropdown;
