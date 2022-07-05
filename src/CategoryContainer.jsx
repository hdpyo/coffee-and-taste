import styled from '@emotion/styled';

import { useSelector } from 'react-redux';

import { Link, useLocation } from 'react-router-dom';

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
      borderBottom: '4px solid green',
    },
  },
});

const Category = styled.div(
  ({ active }) => ({
    padding: '20px 0',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    '& a': {
      ...(active && {
        borderBottom: '4px solid green',
      }),
    },
  }),
);

export default function CategoryContainer() {
  const categories = useSelector((state) => state.categories);

  const location = useLocation();
  if (!location.state) {
    location.state = '';
  }
  const selectedCategory = location.state.categoryId;

  return (
    <CategoryContainerStyle>
      {
        categories.map(({ id, name }) => (
          <Category key={id} active={selectedCategory === id}>
            <Link to={`/categories/${id}/menu-groups`} state={{ categoryId: id }}>
              {name}
            </Link>
          </Category>
        ))
      }
    </CategoryContainerStyle>
  );
}
