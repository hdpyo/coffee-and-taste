import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  loadCart, addCheckedCartItem, removeUncheckedCartItem, requestOrder,
} from './store';

export default function CartContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCart());
  }, []);

  const cartMenus = useSelector((state) => state.cartMenus);

  const checkedItemHandler = (isChecked, checkedItemId) => {
    if (isChecked) {
      dispatch(addCheckedCartItem(checkedItemId));
    } else if (!isChecked) {
      dispatch(removeUncheckedCartItem(checkedItemId));
    }
  };

  const handleChange = (event) => {
    const { checked, value } = event.target;
    checkedItemHandler(checked, value);
  };

  const handleClickOrder = () => {
    dispatch(requestOrder());
  };

  if (cartMenus.length === 0) {
    return (
      <div>
        <h1>Cart</h1>
        <hr />
        <div>장바구니에 담긴 메뉴가 없습니다!</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Cart</h1>
      <hr />
      <button type="button" onClick={handleClickOrder}>주문하기</button>
      {
        cartMenus.map(({
          id,
          menu: {
            name, englishName, price, imagePath,
          },
          quantity,
        }) => (
          <div>
            <input type="checkbox" name="menuId" value={id} onChange={handleChange} />
            <span>
              메뉴 이름 :
              {name}
            </span>
            <span>
              영어 이름 :
              {englishName}
            </span>
            <span>
              가격 :
              {price}
            </span>
            <span>
              수량 :
              {quantity}
            </span>
            <img src={`https://coffee-and-taste.kro.kr${imagePath}`} alt={name} />
          </div>
        ))
      }
    </div>
  );
}
