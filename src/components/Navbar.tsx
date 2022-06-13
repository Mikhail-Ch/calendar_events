import React from 'react';
import { Layout, Menu, Row, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { RouteNames } from "../router";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";

const Navbar = () => {
  const router = useHistory()
  const dispatch = useDispatch()
  const { isAuth, user } = useTypedSelector(state => state.auth)

  return (
    <Layout.Header>
      <Row justify="end" align={ "middle" }>
        {
          isAuth
            ?
            <>
              <Row align="middle">
                <Avatar icon={ <UserOutlined/> } alt={ user.username }/>
                <span style={{color: '#fff', padding: '0 10px'}}>{ user.username }</span>
              </Row>
              <Menu theme="dark" mode="horizontal" selectable={ false }>
                <Menu.Item key={ 1 } onClick={ () => dispatch(AuthActionCreators.logout()) }>
                  Logout
                </Menu.Item>
              </Menu>
            </>
            :
            <Menu theme="dark" mode="horizontal" selectable={ false }>
              <Menu.Item key={ 2 } onClick={ () => router.push(RouteNames.LOGIN) }>
                Login
              </Menu.Item>
            </Menu>
        }
      </Row>
    </Layout.Header>
  );
};

export default Navbar;