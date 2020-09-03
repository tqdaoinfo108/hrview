import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import {
    Container,
    Row,
    Col
} from './../../../components';

import { HeaderMain } from "../../components/HeaderMain";

import TasksList from './TasksList';
import { ProjectsLeftNav } from "../../components/Projects/ProjectsLeftNav";
import { ProjectsSmHeader } from "../../components/Projects/ProjectsSmHeader";

const Tasks = (props) => {
    useEffect(() => {
        Moment.locale('vi');
    }, )

    return (
        <React.Fragment>
            <Container>
                <HeaderMain
                    title="Công việc"
                    className="mb-5 mt-4"
                />
                <Row>
                    <Col lg={3}>
                        <ProjectsLeftNav />
                    </Col>
                    <Col lg={9}>
                        <ProjectsSmHeader
                            subTitle="Công việc"
                            subTitleLink="/apps/projects/list"
                            title='Danh sách công việc'
                            linkList="/apps/tasks/list"
                        />

                        <TasksList /> 
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}

Tasks.propTypes = {
    match: PropTypes.object.isRequired
};

export default Tasks;