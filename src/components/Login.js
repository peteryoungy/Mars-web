import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

function Login(props) {
    const { handleLoggedIn } = props;

    const onFinish = (values) => {
        console.log("Received values of form: ", values);

        const { username, password } = values;

        // Login API: {"post", data, url, headers}
        const opt = {
            method: "POST",
            url: `${process.env['REACT_APP_BASE_URL']}/signin`,
            data: {
                username: username,
                password: password,
            },
            headers: { "Content-Type": "application/json" },
        };
        axios(opt)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    const { data } = response;
                    // send the token to Main
                    handleLoggedIn(data);
                }
            })
            .catch((err) => {
                console.log("login failed: ", err.message);
                message.error("Login failed!");
            });
    };

    return (
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please input your Username!",
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your Password!",
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >
                    Log in
                </Button>
                Or <Link to="/register">register now!</Link>
            </Form.Item>
        </Form>
    );
}

export default Login;
