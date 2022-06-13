import { Button, Form, Input } from 'antd';
import React, { FC, useState } from 'react';
import { useDispatch } from "react-redux";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";
import { useTypedSelector } from "../hooks/useTypedSelector";

const LoginForm: FC = () => {
  const dispatch = useDispatch()
  const { error, isLoading } = useTypedSelector(state => state.auth)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    dispatch(AuthActionCreators.login(userName, password))
  }

  return (
    <Form
      name="basic"
      labelCol={ { span: 8 } }
      wrapperCol={ { span: 16 } }
      initialValues={ { remember: true } }
      onFinish={ handleSubmit }
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={ [ { required: true, message: 'Please input your username!' } ] }
      >
        <Input value={userName}
        onChange={(e) => setUserName(e.target.value)}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={ [ { required: true, message: 'Please input your password!' } ] }
      >
        <Input.Password value={password}
        onChange={(e) => setPassword(e.target.value)}/>
      </Form.Item>

      <Form.Item wrapperCol={ { offset: 8, span: 16 } }>
        <Button type="primary" htmlType="submit" loading={ isLoading }>
          Submit
        </Button>
      </Form.Item>
      {
        error &&
          <div className="error">{ error }</div>
      }
    </Form>
  );
};

export default LoginForm;