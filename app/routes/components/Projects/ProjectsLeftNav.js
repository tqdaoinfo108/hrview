import React, { useState, useEffect } from 'react';
import faker from 'faker/locale/en_US';
import axios from 'axios'

import {
    InputGroup,
    Button,
    Input,
    InputGroupAddon,
    Nav,
    NavItem,
    NavLink,
    Badge,
    Media,
    Avatar
} from './../../../components';
import { randomAvatar } from './../../../utilities';

const ProjectsLeftNav = () => {

    // useEffect(() => {
    //     const initDate = () => {
    //         // axios.get('https://localhost:5000/api/todolist/get', { headers: { Authorization: 'Bearer ' + token } }).then(
    //         //     res => {
    //         //         setCompanyName(res.data.companyName);
    //         //         localStorage.setItem('companyName', JSON.stringify(res.data.companyName));
    //         //     }
    //         // )
    //     }

    // }, [])
    return (
        <React.Fragment>
            { /* START Left Nav  */}
            <div className="mb-4">
                <div className="small mb-3">
                    Tìm kiếm
            </div>
                <InputGroup>
                    <Input placeholder="Nhập từ khoá" className="bg-white" />
                    <InputGroupAddon addonType="append">
                        <Button outline color="secondary">
                            <i className="fa fa-search"></i>
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
            { /* END Left Nav  */}

            { /* START Left Nav  */}
            <div className="mb-4">
                <div className="small mb-3">
                    Công việc
            </div>
                <Nav pills vertical>
                    <NavItem>

                        // API api/todolist/department?id={id}
                        <NavLink href="#" className="d-flex">
                            <i className="fa fa-fw fa-star-o align-self-center mr-2"></i>
                        Phòng ban
                        <Badge color="secondary" pill className="ml-auto align-self-center">
                                12
                        </Badge>
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
            { /* END Left Nav  */}
            
        </React.Fragment>
    )
}

export { ProjectsLeftNav };
