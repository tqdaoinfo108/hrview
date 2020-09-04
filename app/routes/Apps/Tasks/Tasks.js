import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import {Col, Container, Row} from './../../../components';

import {HeaderMain} from "../../components/HeaderMain";

import TasksList from './TasksList';
import {ProjectsLeftNav} from "../../components/Projects/ProjectsLeftNav";
import {ProjectsSmHeader} from "../../components/Projects/ProjectsSmHeader";
import {callApi} from "../../../../core/callApi";

const Tasks = (props) => {
  const [dataList, setDataList] = useState([])

  useEffect(() => {
    Moment.locale('vi');
  }, [])

  const updateListTask = (taskList) => {
    setDataList(taskList)
  }

  const onLoadTaskList = () => {
    callApi("todolist/getall", "GET", null).then(res => {
      setDataList(res.data);
    })
  }

  return (
    <React.Fragment>
      <Container>
        <HeaderMain
          title="Công việc"
          className="mb-5 mt-4"
        />
        <Row>
          <Col lg={3}>
            <ProjectsLeftNav/>
          </Col>
          <Col lg={9}>
            <ProjectsSmHeader
              subTitle="Công việc"
              subTitleLink="/apps/projects/list"
              title='Danh sách công việc'
              linkList="/apps/tasks/list"
              // dataList={dataList}
              onAddItemList={onLoadTaskList}
            />

            <TasksList dataList={dataList}/>
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