import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Menu = styled.div({

});

const MenuImage = styled.div(
  ({ url }) => ({
    margin: '50px auto 20px auto',
    borderRadius: '50%',
    width: '200px',
    height: '200px',
    ...(url && {
      background: `url("https://coffee-and-taste.kro.kr${url}") center/100% no-repeat`,
    }),
  }),
);

const MenuName = styled.div({
  margin: '10px 0',
  fontSize: '16px',
  textAlign: 'center',
  wordBreak: 'keep-all',
  '& a': {
    fontSize: '1.1rem',
    color: '#555555',
    textDecoration: 'none',
    '&:hover': {
      color: '#000',
    },
  },
});

const NoMenu = styled.h1({
  margin: '150px 0',
  textAlign: 'center',
  fontSize: '2rem',
});

export default function MenuList({ menus, menuGroupId, selectedCategory }) {
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
            <MenuImage url={imagePath} />
            <MenuName>
              <Link to={`/menu-groups/${menuGroupId}/menus/${id}`} state={{ categoryId: selectedCategory }}>
                {name}
              </Link>
            </MenuName>
          </Menu>
        ))
      }
    </>
  );
}
