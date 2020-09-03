import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import {
    Sidebar,
    UncontrolledButtonDropdown,
    Avatar,
    AvatarAddOn,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from './../../../components';


const SidebarTopA = (props) => {
    const [fullName, setFullName] = useState("");
    const [companyName, setCompanyName] = useState("");
    
    useEffect(() => {

        
        const initData = async () => {
            let luserName = await localStorage.getItem('fullName');
            luserName = JSON.parse(luserName);
            setFullName(luserName); 

            // nghe nghe
            console.log(luserName); 
            let lcompanyName = await localStorage.getItem('companyName')  ;
            lcompanyName = lcompanyName ? JSON.parse(lcompanyName) : "";
            setCompanyName(lcompanyName);

            if(lcompanyName.length == null || lcompanyName.length == 0 ){    
                let token = await localStorage.getItem('token');
                token = JSON.parse(token);
                axios.get('https://localhost:5000/api/company/get',{ headers: { Authorization: 'Bearer '+ token } }).then(
                    res => {
                        setCompanyName(res.data.companyName);
                        localStorage.setItem('companyName',JSON.stringify(res.data.companyName));
                    }
                )
            }
        }   
        initData();
    })

    return (
        <React.Fragment>
            { /* START: Sidebar Default */}
            <Sidebar.HideSlim>
                <Sidebar.Section className="pt-0">
                    <Link to="/" className="d-block">
                        <Sidebar.HideSlim>
                            <Avatar.Image
                                size="lg"
                                src='./images/avatars/default.png'
                                addOns={[
                                    <AvatarAddOn.Icon
                                        className="fa fa-circle"
                                        color="white"
                                        key="avatar-icon-bg"
                                    />,
                                    <AvatarAddOn.Icon
                                        className="fa fa-circle"
                                        color="success"
                                        key="avatar-icon-fg"
                                    />
                                ]}
                            />
                        </Sidebar.HideSlim>
                    </Link>

                    <UncontrolledButtonDropdown>
                        <DropdownToggle color="link" className="pl-0 pb-0 btn-profile sidebar__link">
                            { fullName }
                            <i className="fa fa-angle-down ml-2"></i>
                        </DropdownToggle>
                        <DropdownMenu persist>
                            <DropdownItem header>
                                { fullName }
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem tag={Link} to="/apps/profile-details">
                                Thông tin cá nhân
                    </DropdownItem>
                            {/* <DropdownItem tag={Link} to="/apps/settings-edit">
                                Cài đặt
                    </DropdownItem> */}
                            <DropdownItem divider />
                            <DropdownItem tag={Link} to="/pages/login">
                                <i className="fa fa-fw fa-sign-out mr-2"></i>
                        Sign Out
                    </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    <div className="small sidebar__link--muted">
                        {companyName}
                    </div>
                </Sidebar.Section>
            </Sidebar.HideSlim>
            { /* END: Sidebar Default */}

            { /* START: Sidebar Slim */}
            <Sidebar.ShowSlim>
                <Sidebar.Section>
                    <Avatar.Image
                        size="sm"
                        src='./images/avatars/default.png'
                        addOns={[
                            <AvatarAddOn.Icon
                                className="fa fa-circle"
                                color="white"
                                key="avatar-icon-bg"
                            />,
                            <AvatarAddOn.Icon
                                className="fa fa-circle"
                                color="success"
                                key="avatar-icon-fg"
                            />
                        ]}
                    />
                </Sidebar.Section>
            </Sidebar.ShowSlim>
            { /* END: Sidebar Slim */}
        </React.Fragment>
    );
}
export { SidebarTopA };
