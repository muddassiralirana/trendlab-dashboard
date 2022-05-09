import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_FAIL,
} from './states';

const adminInfoFromStorage = localStorage.getItem('authUser')
  ? JSON.parse(localStorage.getItem('authUser'))
  : null;

const initialState = {
  isSuccess: false,
  isLoading: false,
  authUser: adminInfoFromStorage,
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADMIN_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    case ADMIN_REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    case ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        authUser: action.payload.authUser,
      };
    case ADMIN_LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    case ADMIN_LOGOUT:
      return {
        ...state,
        authUser: null,
      };

    case ADMIN_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADMIN_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        authUser: action.payload.previousInfo,
      };
    case ADMIN_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
};

export default AdminReducer;
