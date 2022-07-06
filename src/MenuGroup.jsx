import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const MenuGroupStyle = styled.div({
  margin: '40px 0',
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gridGap: '1rem',
});

const MenuGroupImage = styled.div({
  width: '200px',
  height: '200px',
  margin: '50px auto 30px auto',
  overflow: 'hidden',
  borderRadius: '50%',
  isolation: 'isolate',
  '& img': {
    width: '100%',
    height: '100%',
    transition: '1s',
    '&:hover': {
      transform: 'scale(1.2, 1.2)',
    },
  },
});

const MenuGroupNoImage = styled.div(
  {
    margin: '50px auto 30px auto',
    borderRadius: '50%',
    width: '200px',
    height: '200px',
    background: '#1E3932',
  },
);

const MenuGroupName = styled.div({
  margin: '10px 0',
  fontSize: '1.1rem',
  color: '#555555',
  textAlign: 'center',
});

export default function MenuGroup({ menuGroups, selectedCategory }) {
  return (
    <MenuGroupStyle>
      {
        menuGroups.map(({ id, name, representativeImagePath }) => (
          <div key={id}>
            {
              representativeImagePath ? (
                <MenuGroupImage>
                  <Link to={`/menu-groups/${id}`} state={{ categoryId: selectedCategory }}>
                    <img src={`https://coffee-and-taste.kro.kr${representativeImagePath}`} alt={name} />
                  </Link>
                </MenuGroupImage>
              ) : (
                <MenuGroupNoImage />
              )
            }
            <MenuGroupName>
              {name}
            </MenuGroupName>
          </div>
        ))
      }
    </MenuGroupStyle>
  );
}
