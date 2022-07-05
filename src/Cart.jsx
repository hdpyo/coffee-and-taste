import styled from '@emotion/styled';

import { BsFillDashCircleFill, BsPlusCircleFill } from 'react-icons/bs';
import { VscClose } from 'react-icons/vsc';

const CartContainerStyle = styled.div({
  width: '800px',
  margin: '0 auto',
});

const RemoveButtonDiv = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const RemoveSelectedItemsButton = styled.button({
  border: 'none',
  backgroundColor: 'inherit',
  padding: '10px 15px',
  color: '#006633',
  fontSize: '16px',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const RemoveAllItemButton = styled.button({
  border: 'none',
  backgroundColor: 'inherit',
  padding: '10px 15px',
  fontSize: '16px',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const ItemContainer = styled.div({
  border: '1px solid #e1e1e8',
  margin: '20px 0',
  borderRadius: '30px',
  padding: '20px 20px',
});

const CartTitle = styled.h1({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: '#321414',
  lineHeight: '4rem',
  paddingLeft: '10px',
});

const CartNoItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '300px',
  '&': {
    fontSize: '2rem',
  },
});

const CartButtonGroup = styled.div({
  marginTop: '-5px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& input[type=checkbox]': {
    width: '30px',
    height: '30px',
    cursor: 'pointer',
  },
  '& svg': {
    zIndex: '1',
  },
});

const CartItem = styled.div({
  marginTop: '-45px',
  marginBottom: '-10px',
  display: 'grid',
  gridTemplateColumns: '30% auto',
});

const CartItemImage = styled.div(
  ({ url }) => ({
    margin: '10px auto',
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    ...(url && {
      background: `url("https://coffee-and-taste.kro.kr${url}") center/100% no-repeat`,
    }),
  }),
);

const CartItemInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '10px',
  width: '100%',
  margin: '0 auto',
});

const ItemName = styled.h1({
  fontSize: '1.1rem',
  fontWeight: '600',
});

const ItemEnglishName = styled.h2({
  fontSize: '1.0rem',
  fontWeight: '350',
  color: 'rgba(179, 179, 179)',
});

const ItemPrice = styled.h3({
  fontSize: '1.0rem',
});

const ItemQuantityUl = styled.ul({
  listStyle: 'none',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 2fr 2fr',
  alignContent: 'center',
});

const ItemQuantityLi = styled.li(
  ({ active }) => ({
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.3rem',
    lineHeight: '2rem',
    '& svg': {
      fontSize: '1.7rem',
      cursor: 'pointer',
      ...(active && {
        opacity: '0.5',
        cursor: 'not-allowed',
      }),
    },
    '& button': {
      width: '5rem',
      height: '2rem',
      color: '#00704a',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      background: 'transparent',
      border: '2px solid #00704a',
      borderRadius: '30px',
      outline: 'none',
      cursor: 'pointer',
      transition: 'background-color .7s, color .7s',
      '&:hover': {
        color: '#fff',
        backgroundColor: '#00704a',
        textDecoration: 'underline',
      },
    },
  }),
);

const TotalQuantityAndPriceDiv = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '1rem',
});

const TotalQuantityDiv = styled.div({
  fontSize: '1.5rem',
  '& span': {
    color: '#006633',
    fontWeight: '700',
  },
});

const TotalPriceDiv = styled.div({
  fontSize: '2rem',
  '& span': {
    fontWeight: '700',
  },
});

const OrderDiv = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '3rem 0',
});

const OrderButton = styled.button({
  width: '30%',
  height: '3rem',
  color: '#00704a',
  fontSize: '1.3rem',
  borderRadius: '30px',
  background: 'transparent',
  border: '2px solid #00704a',
  outline: 'none',
  cursor: 'pointer',
  transition: 'background-color .7s, color .7s',
  '&:hover': {
    color: '#fff',
    backgroundColor: '#00704a',
    textDecoration: 'underline',
  },
});

export default function Cart({
  cartMenus,
  checkedCartItems,
  removeSelectedCartItems,
  removeAllCartItems,
  onChange,
  onClick,
  removeCartItem,
  increaseQuantityOne,
  decreaseQuantityOne,
  updateItemQuantity,
}) {
  let totalPayment = 0;
  let totalQuantity = 0;

  const handleChange = (event) => {
    const { checked, value } = event.target;
    onChange({ checked, value });
  };

  if (cartMenus.length === 0) {
    return (
      <CartContainerStyle>
        <CartTitle>장바구니</CartTitle>
        <hr />
        <CartNoItem>
          장바구니에 담긴 메뉴가 없습니다.
        </CartNoItem>
      </CartContainerStyle>
    );
  }

  return (
    <CartContainerStyle>
      <CartTitle>장바구니</CartTitle>
      <hr />
      <RemoveButtonDiv>
        <RemoveSelectedItemsButton onClick={removeSelectedCartItems}>
          선택 삭제
        </RemoveSelectedItemsButton>
        <span>|</span>
        <RemoveAllItemButton onClick={removeAllCartItems}>
          전체 삭제
        </RemoveAllItemButton>
      </RemoveButtonDiv>
      {
        cartMenus.map(({
          id,
          menu: {
            name, englishName, price, imagePath,
          },
          quantity,
        }) => {
          if (checkedCartItems.includes(String(id))) {
            totalPayment += (price * quantity);
            totalQuantity += quantity;
          }

          return (
            (
              <ItemContainer>
                <CartButtonGroup>
                  <input
                    type="checkbox"
                    name="menuId"
                    value={id}
                    onChange={handleChange}
                  />
                  <VscClose
                    size="30"
                    cursor="pointer"
                    onClick={() => removeCartItem(id)}
                  />
                </CartButtonGroup>
                <CartItem>
                  <CartItemImage url={imagePath} />
                  <CartItemInfo>
                    <ItemName>{name}</ItemName>
                    <ItemEnglishName>{englishName}</ItemEnglishName>
                    <ItemPrice>
                      {price ? price.toLocaleString('ko-KR') : null}
                      원
                    </ItemPrice>
                    <ItemQuantityUl>
                      <ItemQuantityLi active={quantity === 1}>
                        <BsFillDashCircleFill
                          onClick={() => decreaseQuantityOne(id)}
                        />
                      </ItemQuantityLi>
                      <ItemQuantityLi>
                        <span>{quantity}</span>
                      </ItemQuantityLi>
                      <ItemQuantityLi>
                        <BsPlusCircleFill
                          onClick={() => increaseQuantityOne(id)}
                        />
                      </ItemQuantityLi>
                      <ItemQuantityLi>
                        <button type="button" onClick={() => updateItemQuantity(id)}>변경</button>
                      </ItemQuantityLi>
                      <ItemQuantityLi>
                        <span>
                          {(quantity * price).toLocaleString('ko-KR')}
                          원
                        </span>
                      </ItemQuantityLi>
                    </ItemQuantityUl>
                  </CartItemInfo>
                </CartItem>
              </ItemContainer>
            )
          );
        })
      }
      <hr />
      <TotalQuantityAndPriceDiv>
        <TotalQuantityDiv>
          총
          {' '}
          <span>{totalQuantity}</span>
          개
        </TotalQuantityDiv>
        <TotalPriceDiv>
          <span>{totalPayment.toLocaleString('ko-KR')}</span>
          원
        </TotalPriceDiv>
      </TotalQuantityAndPriceDiv>
      <OrderDiv>
        <OrderButton onClick={onClick}>주문하기</OrderButton>
      </OrderDiv>
    </CartContainerStyle>
  );
}
