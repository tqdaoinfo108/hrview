import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

import { 
    Button,
    Breadcrumb,
    ButtonToolbar,
    UncontrolledTooltip,
    BreadcrumbItem,
    ButtonGroup,
} from './../../../components';

const ProjectsSmHeader = (props ) => (
    <React.Fragment>
        { /* START Header Nav */}
        <div className="d-flex flex-column flex-md-row mb-3 mb-md-0">
            <Breadcrumb className="mr-auto d-flex align-items-center">
                { /* START 1st */}
                <BreadcrumbItem active> 
                    <Link to="/">
                        <i className="fa fa-home"></i>
                    </Link>
                </BreadcrumbItem>
                
                { /* END 2nd */}

                { /* START 3rd */}
                {
                    props.title && (
                        <BreadcrumbItem active>
                            {props.title}
                        </BreadcrumbItem>  
                    )
                }
                { /* END 3rd */}
            </Breadcrumb>
            <ButtonToolbar>
                <ButtonGroup>
                    <Button color="primary" className="align-self-center" id="tooltipAddNew">
                        <i className="fa-fw fa fa-plus"></i>
                    </Button>
                    // API modal api/todolist/create
                    <UncontrolledTooltip placement="bottom" target="tooltipAddNew">
                        Add New
                    </UncontrolledTooltip>
                </ButtonGroup>
            </ButtonToolbar>
        </div>
        { /* END Header Nav */}
    </React.Fragment>
)
ProjectsSmHeader.propTypes = {
    title: PropTypes.node,
    subTitleLink: PropTypes.string,
    linkList: PropTypes.node,
    btnShowKanban: PropTypes.bool,
    linkKanban: PropTypes.node
};
ProjectsSmHeader.defaultProps = {
    subTitle: "Folder",
    linkList: "#",
    linkGrid: "#",
};

export { ProjectsSmHeader };
