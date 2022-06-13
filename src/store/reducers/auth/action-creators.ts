import { IUser } from "../../../models/iUser";
import { AuthActionEnum, SerUserAction, SetAuthAction, SetErrorAction, SetLoadingAction } from "./types";
import { AppDispatch } from "../../index";
import axios from "axios";
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
  setUser: (user: IUser): SerUserAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
  setIsAuth: (auth: boolean): SetAuthAction => ({ type: AuthActionEnum.SET_AUTH, payload: auth }),
  setError: (error: string): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload: error }),
  setIsLoading: (loading: boolean): SetLoadingAction => ({ type: AuthActionEnum.SET_IS_LOADING, payload: loading }),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true))
      const response = await UserService.getUsers()
      const user = response.data.find(user => user.username === username && user.password === password)
      if (user) {
        localStorage.setItem('auth', 'true')
        localStorage.setItem('username', user.username)
        dispatch(AuthActionCreators.setUser(user))
        dispatch(AuthActionCreators.setIsAuth(true))
      } else {
        dispatch(AuthActionCreators.setError("User not found"))
      }
      dispatch(AuthActionCreators.setIsLoading(false))
    } catch (e) {
      dispatch(AuthActionCreators.setError("Произошла ошибка"))
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
      localStorage.removeItem('auth')
      localStorage.removeItem('username')
      dispatch(AuthActionCreators.setUser({} as IUser))
      dispatch((AuthActionCreators.setIsAuth(false)))
  }
};

