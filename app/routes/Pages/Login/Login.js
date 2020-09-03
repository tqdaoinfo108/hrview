import React, { useState,useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import {
    Form,
    FormGroup,
    FormText,
    Input,
    CustomInput,
    Button,
    Label,
    Media,
    EmptyLayout,
    ThemeConsumer
} from './../../../components';

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

const Login = (props) => {
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");

    const [isRedirect, setIsRedirect] = useState(false)

    const value = { userName, passWord };

    useEffect( () => {
        const checkLogin = async () => {
            let token = await localStorage.getItem('token');
            token = JSON.parse(token);
            if (token.length > 0){
                setIsRedirect(true);
            }
        }
        checkLogin();
    });

      
//https://hrdotnet.azurewebsites.net/
    const onSubmit = () => {
        axios.post('https://localhost:5000/api/authencation/login', value)
            .then(res => {
                    localStorage.setItem('token', JSON.stringify(res.data.token));
                    localStorage.setItem('fullName', JSON.stringify(res.data.fullName));
                    localStorage.setItem('companyID',JSON.stringify(res.data.companyID));
                    setIsRedirect(true);
            });
    }

    const contentError = (message) => (
        <Media>
            <Media middle left className="mr-3">
                <i className="fa fa-fw fa-2x fa-close"></i>
            </Media>
            <Media body>
                <Media heading tag="h6">
                    Danger!
                </Media>
                <p>
                    message
                </p>

            </Media>
        </Media>
    );

    if (isRedirect) {
        return <Redirect to={"/dashboards/projects"} />
    }

    return (
        <EmptyLayout>
            <EmptyLayout.Section center>
                { /* START Header */}
                <HeaderAuth
                    title="Đăng nhập vào hệ thống"
                />
                { /* END Header */}
                { /* START Form */}
                <Form className="mb-3">
                    <FormGroup>
                        <Label for="emailAdress">
                            Email Adress
                    </Label>
                        <Input type="email" value={userName} name="userName" id="emailAdress" onChange={(e) => setUserName(e.target.value)} placeholder="Enter email..." className="bg-white" />
                        <FormText color="muted">
                            We&amp;ll never share your email with anyone else.
                    </FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">
                            Password
                    </Label>
                        <Input type="password" value={passWord} name="passWord" id="password" onChange={(e) => setPassWord(e.target.value)} placeholder="Password..." className="bg-white" />
                    </FormGroup>
                    <FormGroup>
                        <CustomInput type="checkbox" id="rememberPassword" label="Remember Password" inline />
                    </FormGroup>
                    <ThemeConsumer>
                        {
                            ({ color }) => (
                                <Button color={color} block tag={Link} onClick={onSubmit}>
                                    Sign In
                                </Button>
                            )
                        }
                    </ThemeConsumer>
                </Form>
                { /* END Form */}
                { /* START Bottom Links */}
                <div className="d-flex mb-5">
                    <Link to="/pages/forgotpassword" className="text-decoration-none">
                        Forgot Password
                </Link>
                    <Link to="/pages/register" className="ml-auto text-decoration-none">
                        Register
                </Link>
                </div>
                { /* END Bottom Links */}
                { /* START Footer */}
                <FooterAuth />
                { /* END Footer */}
            </EmptyLayout.Section>
        </EmptyLayout>
    );
}
export default Login;
