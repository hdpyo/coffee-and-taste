import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const MenuGroupStyle = styled.div({
  margin: '40px 0',
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gridGap: '1rem',
});

const MenuGroupImage = styled.div(
  {
    margin: '50px auto 30px auto',
    borderRadius: '50%',
    width: '200px',
    height: '200px',
  },
  ({ url }) => (url ? ({
    background: `url("https://coffee-and-taste.kro.kr${url}") center/100% no-repeat`,
  }) : ({
    border: '2px solid green',
    backgroundColor: '#1E3932',
  })),
);

const MenuGroupName = styled.div({
  margin: '10px 0',
  textAlign: 'center',
  '& a': {
    fontSize: '1.3rem',
    color: '#555555',
    textDecoration: 'none',
    '&:hover': {
      color: '#000',
    },
  },
});

export default function MenuGroup({ menuGroups, selectedCategory }) {
  return (
    <MenuGroupStyle>
      {
        menuGroups.map(({ id, name, representativeImagePath }) => (
          <div key={id}>
            <MenuGroupImage url={representativeImagePath} />
            <MenuGroupName>
              <Link to={`/menu-groups/${id}`} state={{ categoryId: selectedCategory }}>
                {name}
              </Link>
            </MenuGroupName>
          </div>
        ))
      }
    </MenuGroupStyle>
  );
}
