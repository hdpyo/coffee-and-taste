import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Menu = styled.div({

});

const MenuImage = styled.div({
  width: '200px',
  height: '200px',
  margin: '50px auto 20px auto',
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

const MenuName = styled.div({
  margin: '10px 0',
  fontSize: '1.1rem',
  color: '#555555',
  textAlign: 'center',
  wordBreak: 'keep-all',
});

const NoMenu = styled.h1({
  margin: '150px 0',
  textAlign: 'center',
  fontSize: '2rem',
});

export default function MenuList({ menus, selectedCategory }) {
  if (menus === undefined) {
    return (
      <MenuList>
        <NoMenu>메뉴를 준비중입니다!</NoMenu>
      </MenuList>
    );
  }

  return (
    <>
      {
        menus.map(({ id, imagePath, name }) => (
          <Menu key={name}>
            <MenuImage>
              <Link to={`/menus/${id}`} state={{ categoryId: selectedCategory }}>
                <img src={`https://coffee-and-taste.kro.kr${imagePath}`} alt={name} />
              </Link>
            </MenuImage>
            <MenuName>
              {name}
            </MenuName>
          </Menu>
        ))
      }
    </>
  );
}
