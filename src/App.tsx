import React, { FC, useEffect } from 'react';
import AppRouter from "./components/AppRouter";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import { Layout } from "antd";
import "./App.css"
import { AuthActionCreators } from "./store/reducers/auth/action-creators";
import { IUser } from "./models/iUser";

const App: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      dispatch(AuthActionCreators.setIsAuth(true))
      dispatch(AuthActionCreators.setUser({
        username: localStorage.getItem('username' || '')
      } as IUser))
    }
  }, [])

  return (
    <Layout className="App">
      <Navbar />
      <Layout.Content>
        <AppRouter/>
      </Layout.Content>
    </Layout>
  );
}

export default App;
