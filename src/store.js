import { applyMiddleware, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import { logger } from 'redux-logger';

import {
  deleteAllCartItems,
  deleteCartItem,
  deleteSelectedCartItems,
  fetchCart,
  fetchCategories,
  fetchMenu,
  fetchMenuGroups,
  fetchMenus,
  patchCartItemQuantity,
  postAddToCart,
  postLogin,
  postOrder,
  postSignUp,
  getLoggedUserInfo,
} from './services/api';

import { saveItem } from './services/localStorage';

// - 초기 상태 값
const initialState = {
  categories: [],
  menuGroups: [],
  menus: [],
  menu: {},
  menuQuantity: 1,
  loginFields: {
    email: '',
    password: '',
  },
  accessToken: '',
  signUpFields: {
    email: '',
    password: '',
    nickname: '',
    name: '',
    phoneNumber: '',
    birthDate: '',
  },
  cartMenus: [],
  checkedCartItems: [],
  loggedUserInfo: {
    id: '',
    email: '',
    nickname: '',
    name: '',
    phoneNumber: '',
    birthDate: '',
  },
};

// - 액션 생성 함수 정의
const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_MENU_GROUPS = 'SET_MENU_GROUPS';
const SET_MENUS = 'SET_MENUS';
const SET_MENU = 'SET_MENU';
const UPDATE_LOGIN_FIELDS = 'UPDATE_LOGIN_FIELDS';
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
const LOGOUT = 'LOGOUT';
const CLEAR_LOGIN_FIELDS = 'CLEAR_LOGIN_FIELDS';
const UPDATE_SIGNUP_FIELDS = 'UPDATE_SIGNUP_FIELDS';
const SET_CART_MENUS = 'SET_CART_MENUS';
const ADD_CHECKED_CART_ITEM = 'ADD_CHECKED_CART_ITEM';
const REMOVE_UNCHECKED_CART_ITEM = 'REMOVE_UNCHECKED_CART_ITEM';
const CLEAR_CHECKED_CART_ITEMS = 'CLEAR_CHECKED_CART_ITEMS';
const MENU_QUANTITY_PLUS_ONE = 'MENU_QUANTITY_PLUS_ONE';
const MENU_QUANTITY_MINUS_ONE = 'MENU_QUANTITY_MINUS_ONE';
const INITIALIZE_MENU_QUANTITY = 'INITIALIZE_MENU_QUANTITY';
const CART_MENU_QUANTITY_PLUS_ONE = 'CART_MENU_QUANTITY_PLUS_ONE';
const CART_MENU_QUANTITY_MINUS_ONE = 'CART_MENU_QUANTITY_MINUS_ONE';
const SET_LOGGED_USER_INFO = 'SET_LOGGED_USER_INFO';

export function updateLoginFields({ name, value }) {
  return {
    type: UPDATE_LOGIN_FIELDS,
    payload: { name, value },
  };
}

export function updateSignupFields({ name, value }) {
  return {
    type: UPDATE_SIGNUP_FIELDS,
    payload: { name, value },
  };
}

export function setAccessToken(accessToken) {
  return {
    type: SET_ACCESS_TOKEN,
    payload: { accessToken },
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function clearLoginFields() {
  return {
    type: CLEAR_LOGIN_FIELDS,
  };
}

export function requestSignUp() {
  return async (dispatch, getState) => {
    const {
      signUpFields: {
        name, nickname, birthDate, email, password, phoneNumber,
      },
    } = getState();

    try {
      await postSignUp({
        name, nickname, birthDate, email, password, phoneNumber,
      });
    } catch (e) {
      // TODO : 에러 처리
    }
  };
}

export function requestLogin() {
  return async (dispatch, getState) => {
    const { loginFields: { email, password } } = getState();

    try {
      const accessToken = await postLogin({ email, password });

      saveItem('accessToken', accessToken);

      dispatch(setAccessToken(accessToken));
    } catch (e) {
      // TODO : 에러 처리
    }
  };
}

export function setLoggedUserInfo(loggedUserInfo) {
  return {
    type: SET_LOGGED_USER_INFO,
    payload: { loggedUserInfo },
  };
}

export function requestLoggedUserInfo() {
  return async (dispatch, getState) => {
    const { accessToken } = getState();

    try {
      const loggedUserInfo = await getLoggedUserInfo({ accessToken });
      dispatch(setLoggedUserInfo(loggedUserInfo));
    } catch (e) {
      // TODO : 에러 처리
    }
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

export function setCartMenus(cartMenus) {
  return {
    type: SET_CART_MENUS,
    payload: { cartMenus },
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

export function loadCart() {
  return async (dispatch, getState) => {
    const { accessToken } = getState();
    const data = await fetchCart({ accessToken });

    dispatch(setCartMenus(data.cartMenus));
  };
}

export function addCheckedCartItem(checkedMenuId) {
  return {
    type: ADD_CHECKED_CART_ITEM,
    payload: { checkedMenuId },
  };
}

export function removeUncheckedCartItem(uncheckedMenuId) {
  return {
    type: REMOVE_UNCHECKED_CART_ITEM,
    payload: { uncheckedMenuId },
  };
}

export function clearCheckedCartItems() {
  return {
    type: CLEAR_CHECKED_CART_ITEMS,
  };
}

export function requestOrder() {
  return async (dispatch, getState) => {
    const { accessToken, checkedCartItems } = getState();

    try {
      await postOrder({ accessToken, checkedCartItems });

      dispatch(clearCheckedCartItems());
      dispatch(loadCart());
    } catch (e) {
      // TODO : 에러 처리
    }
  };
}

export function menuQuantityPlusOne() {
  return {
    type: MENU_QUANTITY_PLUS_ONE,
  };
}

export function menuQuantityMinusOne() {
  return {
    type: MENU_QUANTITY_MINUS_ONE,
  };
}

export function initializeMenuQuantity() {
  return {
    type: INITIALIZE_MENU_QUANTITY,
  };
}

export function requestAddToCart() {
  return async (dispatch, getState) => {
    const { accessToken, menu: { id: menuId }, menuQuantity } = getState();

    try {
      const responseStatus = await postAddToCart({ accessToken, menuId, quantity: menuQuantity });

      if (responseStatus === 201) {
        alert('메뉴를 장바구니에 담았습니다.');
      }
    } catch (err) {
      // TODO : 에러 처리
    }
  };
}

export function cartMenuQuantityPlusOne(menuId) {
  return {
    type: CART_MENU_QUANTITY_PLUS_ONE,
    payload: { menuId },
  };
}

export function cartMenuQuantityMinusOne(menuId) {
  return {
    type: CART_MENU_QUANTITY_MINUS_ONE,
    payload: { menuId },
  };
}

export function requestUpdateCartItemQuantity(menuId) {
  return async (dispatch, getState) => {
    const { accessToken, cartMenus } = getState();

    const { quantity } = cartMenus.find((item) => item.id === menuId);

    try {
      const data = await patchCartItemQuantity({ accessToken, menuId, quantity });
      if (data) {
        alert('수량을 변경하였습니다.');
        dispatch(clearCheckedCartItems())
          .then(
            dispatch(loadCart()),
          );
      }
    } catch (err) {
      // TODO : 에러 처리
    }
  };
}

export function requestRemoveCartItem(menuId) {
  return async (dispatch, getState) => {
    const { accessToken } = getState();

    try {
      const responseStatus = await deleteCartItem({ accessToken, menuId });

      if (responseStatus === 204) {
        alert('메뉴를 삭제했습니다.');
        dispatch(clearCheckedCartItems())
          .then(
            dispatch(loadCart()),
          );
      }
    } catch (err) {
      // TODO : 에러 처리
    }
  };
}

export function requestDeleteSelectedCartItem() {
  return async (dispatch, getState) => {
    const { accessToken, checkedCartItems } = getState();

    try {
      const responseStatus = await deleteSelectedCartItems({ accessToken, checkedCartItems });

      if (responseStatus === 204) {
        alert('선택한 메뉴를 삭제했습니다.');
        dispatch(clearCheckedCartItems())
          .then(
            dispatch(loadCart()),
          );
      }
    } catch (err) {
      // TODO : 에러 처리
    }
  };
}

export function requestDeleteAllCartItems() {
  return async (dispatch, getState) => {
    const { accessToken } = getState();

    try {
      const responseStatus = await deleteAllCartItems({ accessToken });

      if (responseStatus === 204) {
        alert('전체 메뉴를 삭제했습니다.');
        dispatch(clearCheckedCartItems())
          .then(
            dispatch(loadCart()),
          );
      }
    } catch (err) {
      // TODO : 에러 처리
    }
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

  if (action.type === UPDATE_SIGNUP_FIELDS) {
    const { name, value } = action.payload;
    return {
      ...state,
      signUpFields: {
        ...state.signUpFields,
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

  if (action.type === LOGOUT) {
    saveItem('accessToken', '');
    return {
      ...state,
      accessToken: '',
    };
  }

  if (action.type === CLEAR_LOGIN_FIELDS) {
    return {
      ...state,
      loginFields: {
        ...state.loginFields,
        email: '',
        password: '',
      },
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

  if (action.type === SET_CART_MENUS) {
    return {
      ...state,
      cartMenus: action.payload.cartMenus,
    };
  }

  if (action.type === ADD_CHECKED_CART_ITEM) {
    return {
      ...state,
      checkedCartItems: [
        ...state.checkedCartItems, action.payload.checkedMenuId,
      ],
    };
  }

  if (action.type === REMOVE_UNCHECKED_CART_ITEM) {
    return {
      ...state,
      checkedCartItems: [
        ...state.checkedCartItems.filter((item) => item !== action.payload.uncheckedMenuId),
      ],
    };
  }

  if (action.type === CLEAR_CHECKED_CART_ITEMS) {
    return {
      ...state,
      checkedCartItems: [],
    };
  }

  if (action.type === MENU_QUANTITY_PLUS_ONE) {
    return {
      ...state,
      menuQuantity: state.menuQuantity + 1,
    };
  }

  if (action.type === MENU_QUANTITY_MINUS_ONE) {
    return {
      ...state,
      menuQuantity: state.menuQuantity - 1,
    };
  }

  if (action.type === INITIALIZE_MENU_QUANTITY) {
    return {
      ...state,
      menuQuantity: 1,
    };
  }

  if (action.type === CART_MENU_QUANTITY_PLUS_ONE) {
    const { menuId } = action.payload;
    return {
      ...state,
      cartMenus: state.cartMenus.map((menu) => {
        if (menu.id === menuId) {
          return ({ ...menu, quantity: menu.quantity + 1 });
        }
        return menu;
      }),
    };
  }

  if (action.type === CART_MENU_QUANTITY_MINUS_ONE) {
    const { menuId } = action.payload;
    return {
      ...state,
      cartMenus: state.cartMenus.map((menu) => {
        if (menu.id === menuId) {
          return ({ ...menu, quantity: menu.quantity - 1 });
        }
        return menu;
      }),
    };
  }

  if (action.type === SET_LOGGED_USER_INFO) {
    const { loggedUserInfo } = action.payload;
    return {
      ...state,
      loggedUserInfo,
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
