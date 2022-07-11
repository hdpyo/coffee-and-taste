import styled from '@emotion/styled';

import { BsFillDashCircleFill, BsPlusCircleFill } from 'react-icons/bs';

const MenuImage = styled.div({
  width: '250px',
  height: '250px',
  margin: '30px auto',
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

const MenuName = styled.h1({
  textAlign: 'center',
  fontSize: '1.7rem',
  fontWeight: '500',
  paddingBottom: '.5rem',
});

const MenuEnglishName = styled.h2({
  textAlign: 'center',
  fontSize: '1.3rem',
  color: 'rgba(179, 179, 179)',
  paddingBottom: '.5rem',
});

const MenuDescription = styled.p({
  margin: '15px 0',
  fontSize: '1.2rem',
  paddingTop: '.5rem',
  lineHeight: '1.6rem',
  '& span': {
    wordBreak: 'keep-all',
  },
});

const MenuPrice = styled.h3({
  textAlign: 'right',
  margin: '10px 0',
  fontSize: '2rem',
  fontWeight: '500',
  padding: '1rem 0',
});

const MenuQuantity = styled.div(
  ({ active }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      cursor: 'pointer',
    },
    '& svg:first-of-type': {
      ...(active && {
        opacity: '0.3',
        cursor: 'not-allowed',
      }),
    },
  }),
);

const Quantity = styled.span({
  fontSize: '2rem',
  padding: '0.5rem 2rem',
  margin: '0 1rem',
});

const ButtonDiv = styled.div({
  margin: '30px 0',
  display: 'flex',
  justifyContent: 'space-around',
});

const OrderButton = styled.button({
  width: '30%',
  height: '3rem',
  padding: '0.5rem',
  fontSize: '1.5rem',
  color: '#00704a',
  background: 'transparent',
  border: '2px solid #00704a',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color .7s, color .7s',
  '&:hover': {
    color: '#fff',
    backgroundColor: '#00704a',
    textDecoration: 'underline',
  },
});

const CartButton = styled.button({
  width: '30%',
  height: '3rem',
  padding: '0.5rem',
  fontSize: '1.5rem',
  color: '#00704a',
  background: 'transparent',
  border: '2px solid #00704a',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color .7s, color .7s',
  '&:hover': {
    color: '#fff',
    backgroundColor: '#00704a',
    textDecoration: 'underline',
  },
});

export default function MenuDetail({
  menuQuantity,
  menu: {
    description, englishName, imagePath, name, price,
  },
  onClickAddCart,
  onClickIncreaseQuantity,
  onClickDecreaseQuantity,
}) {
  return (
    <>
      <MenuImage>
        <img src={`https://coffee-and-taste.kro.kr${imagePath}`} alt={name} />
      </MenuImage>
      <MenuName>{name}</MenuName>
      <MenuEnglishName>{englishName}</MenuEnglishName>
      <hr />
      <MenuDescription>
        {description ? description.split('\n').map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        )) : null}
      </MenuDescription>
      <MenuPrice>
        {price ? price.toLocaleString('ko-KR') : null}
        원
      </MenuPrice>
      <MenuQuantity active={menuQuantity === 1}>
        <BsFillDashCircleFill size="40" onClick={() => onClickDecreaseQuantity(menuQuantity)} />
        <Quantity>{menuQuantity}</Quantity>
        <BsPlusCircleFill size="40" onClick={onClickIncreaseQuantity} />
      </MenuQuantity>
      <ButtonDiv>
        <OrderButton>주문하기</OrderButton>
        <CartButton onClick={onClickAddCart}>장바구니에 담기</CartButton>
      </ButtonDiv>
    </>
  );
}
