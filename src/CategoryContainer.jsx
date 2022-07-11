import styled from '@emotion/styled';

import { useSelector } from 'react-redux';

import { Link, useLocation } from 'react-router-dom';

const CategoryContainerStyle = styled.div({
  margin: '0 auto',
  width: '50%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  justifyItems: 'center',
});

const Category = styled.div(
  ({ active }) => ({
    padding: '20px 0',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    '& a': {
      color: '#555555',
      textDecoration: 'none',
      '&:hover': {
        color: '#000',
        '&:after': {
          transform: 'scaleX(1)',
        },
      },
      '&:after': {
        display: 'block',
        content: '""',
        marginTop: '10px',
        borderBottom: '4px solid green',
        ...(active || {
          transform: 'scaleX(0)',
          transition: 'transform 200ms ease-in-out',
        }),
      },
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
            <Link to={`/categories/${id}`} state={{ categoryId: id }}>
              {name}
            </Link>
          </Category>
        ))
      }
    </CategoryContainerStyle>
  );
}
