import styled from '@emotion/styled';

import { BsFillDashCircleFill, BsPlusCircleFill } from 'react-icons/bs';
import { VscClose } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

const CartContainerStyle = styled.div({
  width: '800px',
  margin: '0 auto', // TODO : margin-top 없이는 Header 와 딱 붙게 됨. grid 로 변경?
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

const CartItemImage = styled.div({
  width: '100px',
  height: '100px',
  margin: '10px auto',
  overflow: 'hidden',
  borderRadius: '50%',
  '& img': {
    width: '100%',
    height: '100%',
  },
});

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

const OrderButton = styled.button(
  ({ active }) => ({
    width: '30%',
    height: '3rem',
    fontSize: '1.3rem',
    borderRadius: '30px',
    transition: 'background-color .7s, color .3s',
    ...(active
      ? {
        color: '#00704a',
        cursor: 'pointer',
        background: 'transparent',
        border: '2px solid #00704a',
        '&:hover': {
          color: '#fff',
          backgroundColor: '#00704a',
          textDecoration: 'underline',
        },

      }
      : {
        color: '#fff',
        cursor: 'not-allowed',
        background: '#E9E9ED',
        border: '2px solid #fff',
      }
    ),
  }),

);

const SelectAllItemsCheckboxDiv = styled.div({
  display: 'flex',
  alignItems: 'center',
  '& span': {
    fontSize: '1.2rem',
  },
});

const SelectAllItemsCheckbox = styled.input({
  width: '30px',
  height: '30px',
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
  checkOrUncheckAllItems,
}) {
  let totalPayment = 0;
  let totalQuantity = 0;

  const handleChange = (isChecked, checkedItemId) => {
    onChange({ isChecked, checkedItemId });
  };

  const alertNoQuantityToOrder = () => {
    alert('주문할 메뉴를 먼저 선택해주세요.');
  };

  if (!cartMenus.length) {
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
      <SelectAllItemsCheckboxDiv>
        <SelectAllItemsCheckbox
          type="checkbox"
          checked={
            checkedCartItems.length === 0 ? false
              : checkedCartItems.length === cartMenus.length
          }
          onChange={(e) => checkOrUncheckAllItems(e.target.checked, cartMenus)}
        />
        <span>전체 선택</span>
      </SelectAllItemsCheckboxDiv>
      <RemoveButtonDiv>

        <RemoveSelectedItemsButton
          onClick={() => removeSelectedCartItems(totalQuantity)}
        >
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
            id: menuId, name, englishName, price, imagePath,
          },
          quantity,
        }) => {
          if (checkedCartItems.includes(id)) {
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
                    onChange={(e) => handleChange(e.target.checked, id)}
                    checked={checkedCartItems.includes(id)}
                  />
                  <VscClose
                    size="30"
                    cursor="pointer"
                    onClick={() => removeCartItem(id)}
                  />
                </CartButtonGroup>
                <CartItem>
                  <CartItemImage>
                    <Link to={`/menus/${menuId}`}>
                      <img src={`https://coffee-and-taste.kro.kr${imagePath}`} alt={name} />
                    </Link>
                  </CartItemImage>
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
                          onClick={() => decreaseQuantityOne(id, quantity)}
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
        <OrderButton
          active={totalQuantity > 0}
          onClick={totalQuantity ? onClick : alertNoQuantityToOrder}
        >
          주문하기
        </OrderButton>
      </OrderDiv>
    </CartContainerStyle>
  );
}
