import { applyMiddleware, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import { logger } from 'redux-logger';

import {
  fetchCategories, fetchMenu, fetchMenuGroups, fetchMenus, postLogin,
} from './services/api';

import { DEFAULT_SELECTED_CATEGORY_IS_NONE } from './constants';

// - 초기 상태 값
const initialState = {
  categories: [],
  menuGroups: [],
  menus: [],
  menu: {},
  selectedCategory: DEFAULT_SELECTED_CATEGORY_IS_NONE,
  loginFields: {
    email: '',
    password: '',
  },
  accessToken: '',
};

// - 액션 생성 함수 정의
const SELECT_CATEGORY = 'SELECT_CATEGORY';
const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_MENU_GROUPS = 'SET_MENU_GROUPS';
const SET_MENUS = 'SET_MENUS';
const SET_MENU = 'SET_MENU';
const UPDATE_LOGIN_FIELDS = 'UPDATE_LOGIN_FIELDS';
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export function updateLoginFields({ name, value }) {
  return {
    type: UPDATE_LOGIN_FIELDS,
    payload: { name, value },
  };
}

export function setAccessToken(accessToken) {
  return {
    type: SET_ACCESS_TOKEN,
    payload: { accessToken },
  };
}

export function requestLogin() {
  return async (dispatch, getState) => {
    const { loginFields: { email, password } } = getState();

    try {
      const accessToken = await postLogin({ email, password });

      dispatch(setAccessToken(accessToken));
    } catch (e) {
      // TODO : 에러 처리
    }
  };
}

export function selectCategory(categoryId) {
  return {
    type: SELECT_CATEGORY,
    payload: { categoryId },
  };
}

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    payload: { categories },
  };
}

export function setMenuGroups(menuGroups) {
  return {
    type: SET_MENU_GROUPS,
    payload: { menuGroups },
  };
}

export function setMenus(menus) {
  return {
    type: SET_MENUS,
    payload: { menus },
  };
}

export function setMenu(menu) {
  return {
    type: SET_MENU,
    payload: { menu },
  };
}

export function loadCategories() {
  return async (dispatch) => {
    const categories = await fetchCategories();

    dispatch(setCategories(categories));
  };
}

export function loadMenuGroups(categoryId) {
  return async (dispatch) => {
    const data = await fetchMenuGroups(categoryId);

    dispatch(setMenuGroups(data.menuGroups));
  };
}

export function loadMenuList(menuGroupId) {
  return async (dispatch) => {
    const data = await fetchMenus(menuGroupId);

    dispatch(setMenus(data.menus));
  };
}

export function loadMenu(menuId) {
  return async (dispatch) => {
    const data = await fetchMenu((menuId));

    dispatch(setMenu(data));
  };
}

// - 리듀서
function reducer(state = initialState, action = {}) {
  if (action.type === UPDATE_LOGIN_FIELDS) {
    const { name, value } = action.payload;
    return {
      ...state,
      loginFields: {
        ...state.loginFields,
        [name]: value,
      },
    };
  }

  if (action.type === SET_ACCESS_TOKEN) {
    return {
      ...state,
      accessToken: action.payload.accessToken,
    };
  }

  if (action.type === SELECT_CATEGORY) {
    return {
      ...state,
      selectedCategory: action.payload.categoryId,
    };
  }

  if (action.type === SET_CATEGORIES) {
    return {
      ...state,
      categories: action.payload.categories,
    };
  }

  if (action.type === SET_MENU_GROUPS) {
    return {
      ...state,
      menuGroups: action.payload.menuGroups,
    };
  }

  if (action.type === SET_MENUS) {
    return {
      ...state,
      menus: action.payload.menus,
    };
  }

  if (action.type === SET_MENU) {
    return {
      ...state,
      menu: action.payload.menu,
    };
  }

  return state;
}

// - 스토어
const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, ...middlewares)));

export default store;
