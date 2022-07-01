import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { loadCart } from './store';

export default function CartContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCart());
  });

  const cartMenus = useSelector((state) => state.cartMenus);

  return (
    <div>
      <h1>Cart</h1>
      <hr />
      {
        cartMenus.map(({
          menu: {
            name, englishName, price, imagePath,
          }, quantity,
        }) => (
          <div>
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
