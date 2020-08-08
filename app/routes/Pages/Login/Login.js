import React from 'react';
import { Link } from 'react-router-dom';

import {
    Form,
    FormGroup,
    FormText,
    Input,
    CustomInput,
    Button,
    Label,
    EmptyLayout,
    ThemeConsumer
} from './../../../components';

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

const Login = () => (
    
    <EmptyLayout>
        <EmptyLayout.Section center>
            { /* START Header */}
            <HeaderAuth 
                title="Đăng nhập"
            />
            { /* END Header */}
            { /* START Form */}
            <Form className="mb-3">
                <FormGroup>
                    <Label for="Tên đăng nhập">
                        Tên đăng nhập
                    </Label>
                    <Input type="email" name="email" id="emailAdress" placeholder="Tên đăng nhập" className="bg-white" />
                    <FormText color="muted">
                        ......................................................................................................
                    </FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="password">
                        Mật khẩu
                    </Label>
                    <Input type="password" name="password" id="password" placeholder="Mật khẩu..." className="bg-white" />
                </FormGroup>
                <FormGroup>
                    <CustomInput type="checkbox" id="rememberPassword" label="Nhớ mật khẩu" inline />
                </FormGroup>
                <ThemeConsumer>
                {
                    ({ color }) => (
                        <Button color={ color } block tag={ Link } onClick={btnSignInClicked}>
                            Đăng nhập
                        </Button>
                    )
                }
                </ThemeConsumer>
            </Form>
            { /* END Form */}
            { /* START Bottom Links */}
            
            <FooterAuth />
            { /* END Footer */}
        </EmptyLayout.Section>
    </EmptyLayout>
);

function btnSignInClicked() {
    alert("Great Shot!");
  }
export default Login;
