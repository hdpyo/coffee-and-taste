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
