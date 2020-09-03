import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FooterText } from '../FooterText';

const FooterAuth = ({ className }) => (
    <p className={ classNames(className, 'small') }>
       @2020 Group 1
    </p>
);
FooterAuth.propTypes = {
    className: PropTypes.string
};

export { FooterAuth };
