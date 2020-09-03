import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom'

import {
    NavItem,
    NavLink
} from './../../components';

const NavbarUser = (props) => {

    const [isRedirect, setIsRedirect] = useState(false)

    const LogOut  = () =>{
        localStorage.clear();
        setIsRedirect(true);
        return 
    }
    if (isRedirect) {
        return <Redirect to={"/pages/login"} />
    }

    return(
        <NavItem {...props}>
            <NavLink tag={Link} onClick={LogOut}>
                <i className="fa fa-power-off"></i>
            </NavLink>
        </NavItem>
    );
};
NavbarUser.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export { NavbarUser };  
