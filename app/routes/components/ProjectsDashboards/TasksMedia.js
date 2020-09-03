import React from 'react';
import faker from 'faker/locale/en_US';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
    Media,
    CustomInput
} from './../../../components';

const TasksMedia = (props) => {

    const onClick = (item) => {
        props.onClickItemTask(item);
    }
   
    return (<React.Fragment>
        <Media>
            <Media onClick={onClick} left className="mr-3">
                <CustomInput className="pt-0 mt-0" type="checkbox" checked={props.isComplete ? 'checked' : ''} id={`taskMedia-${props.id}`} label="" />
            </Media>
            <Media body>
                <div className="mt-0 mb-2">
                    <Link to="/apps/tasks/tasks-details" className="text-decoration-none">
                        {props.title}
                    </Link>
                </div>
                <div className="mb-0">
                    {props.description}
                </div>
            </Media>
            <Media right className="ml-3">
                <i className={`fa fa-fw fa-circle text-${props.iconColor == 1 ? 'success' : props.iconColor == 1 ? 'warning' : 'danger'}`}></i>
            </Media>
        </Media>
    </React.Fragment>
    )
}

TasksMedia.propTypes = {
    iconColor: PropTypes.node,
    id: PropTypes.node,
    title: PropTypes.node,
    description: PropTypes.node,
    isComplete: PropTypes.bool,
    onClickItemTask: PropTypes.func
};
TasksMedia.defaultProps = {
    iconColor: 1,
    id: "0",
    title: "",
    description: "",
    isComplete: false,
    onClickItemTask : () => {}
};

export { TasksMedia };
