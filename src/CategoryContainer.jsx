import styled from '@emotion/styled';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { useState } from 'react';

const CategoryContainerStyle = styled.div({
  margin: '0 auto',
  width: '40%',
  display: 'grid',
  background: 'beige 100%',
  gridTemplateColumns: 'repeat(3, 1fr)',
  justifyItems: 'center',
  '& a': {
    color: '#555555',
    textDecoration: 'none',
    '&:hover': {
      color: '#000',
      borderBottom: '2px solid green',
    },
  },
});

const Category = styled.div(({ active }) => ({
  padding: '20px 0',
  fontSize: '1.8rem',
  fontWeight: 'bold',
  ...(active && {
    borderBottom: '4px solid green',
  }),
}));

export default function CategoryContainer() {
  const categories = useSelector((state) => state.categories);

  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <CategoryContainerStyle>
      {
        categories.map((category) => (
          <Link
            to={`/categories/${category.id}/menu-groups`}
            onClick={() => setActiveCategory(category.id)}
          >
            <Category key={category.id} active={activeCategory === category.id}>
              {category.name}
            </Category>
          </Link>
        ))
      }
    </CategoryContainerStyle>
  );
}
