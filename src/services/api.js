import axios from 'axios';

const BASE_URL = 'https://coffee-and-taste.kro.kr/api';

async function fetchData(url) {
  return axios.get(url)
    .then((response) => response.data);
}

export async function fetchCategories() {
  return fetchData(`${BASE_URL}/categories`);
}

export async function fetchMenuGroups(categoryId) {
  return fetchData(`${BASE_URL}/categories/${categoryId}/menu-groups`);
}

export async function fetchMenus(menuGroupId) {
  return fetchData(`${BASE_URL}/menu-groups/${menuGroupId}/menus`);
}

export async function fetchMenu(menuId) {
  return fetchData(`${BASE_URL}/menus/${menuId}`);
}

export async function fetchCart({ accessToken }) {
  const url = `${BASE_URL}/cart/cart-menus`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return data;
}

export async function postSignUp({
  name, nickname, birthDate, email, password, phoneNumber,
}) {
  const url = `${BASE_URL}/members`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name, nickname, birthDate, email, password, phoneNumber,
    }),
  });
  const { id } = await response.json();
  return id;
}

export async function postLogin({ email, password }) {
  const url = `${BASE_URL}/auth/login`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const { accessToken } = await response.json();
  return accessToken;
}

export async function postAddToCart({ accessToken, menuId, quantity }) {
  const url = `${BASE_URL}/cart/cart-menus`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      menuId,
      quantity,
    }),
  });

  return response.status;
}

export async function postOrder({ accessToken, checkedCartItems }) {
  const url = `${BASE_URL}/cart/order`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      cartMenuIds: checkedCartItems,
    }),
  });

  const data = await response.json();
  return data;
}

export async function patchCartItemQuantity({ accessToken, menuId, quantity }) {
  const url = `${BASE_URL}/cart/cart-menus/${menuId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ quantity }),
  });

  const data = await response.json();
  return data;
}

export async function deleteCartItem({ accessToken, menuId }) {
  const url = `${BASE_URL}/cart/cart-menus/${menuId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.status;
}

export async function deleteSelectedCartItems({ accessToken, checkedCartItems }) {
  const url = `${BASE_URL}/cart/cart-menus/`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      cartMenuIds: checkedCartItems,
    }),
  });

  return response.status;
}

export async function deleteAllCartItems({ accessToken }) {
  const url = `${BASE_URL}/cart/cart-menus/all`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.status;
}
