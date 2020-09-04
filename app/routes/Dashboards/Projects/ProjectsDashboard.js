import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Row,
    Card,
    CardBody,
    Badge,
    Table,
    CardTitle,
    Button,
    InputGroup,
    InputGroupAddon,
    Input,
    ListGroup,
    ListGroupItem,
    Media,
    Col
} from './../../../components';
import { setupPage } from './../../../components/Layout/setupPage';

import { HeaderMain } from "../../components/HeaderMain";

import {
    TasksMedia
} from "../../components/ProjectsDashboards/TasksMedia";
import {
    TinyDonutChart
} from "../../components/ProjectsDashboards/TinyDonutChart"
import {
    TinyDonutChartAllProjects
} from "../../components/ProjectsDashboards/TinyDonutChartAllProjects"
import {
    TimelineMini
} from "../../components/Timeline/TimelineMini"
import { DraggableProjects } from './DraggableProjects';
import axios from 'axios';
import {callApi} from "../../../../core/callApi";

const ProjectsDashboard = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState({
        totalTodolistProcessing: 0,
        totalTodolistLate: 0,
        totalTodolistComplete: 0,
        totalCalendarComplete: 0,
        totalCalendar: 0,
        totalStaff: 0,
        totalDepartment: 0,
        totalToDoList: 0,
    })

    const [listTask, setListTask] = useState([]);
    const [isDashboard01, setIsDashboard01] = useState(false);

    // const [totalTodolistProcessing, setTotalTodolistProcessing] = useState(0);
    // const [totalTodolistLate, setTotalTodolistLate] = useState(0);
    // const [TotalTodolistComplete, setTotalTodolistComplete] = useState(0);
    // const [totalCalendarComplete, setTotalCalendarComplete] = useState(0);
    // const [totalCalendar, setTotalCalendar] = useState(0);
    // const [totalStaff, setTotalStaff] = useState(0);
    // const [totalDepartment, setTotalDepartment] = useState(0);
    // const [totalToDoList, setTotalToDoList] = useState(0);

    useEffect(() => {

        const initData = async () => {

            callApi("dashboard/gettask", "GET", null).then(res => {
                setListTask(res.data);
            })

            callApi("dashboard/get", "GET", null).then(res => {
                setData(res.data);
                setIsDashboard01(true);
            })

        }
        initData();
    }, [])

    const onClickItemTask = async(number) => {
        callApi("todolist/changestate?id=4", "GET", null).then(resState => {
            console.log('Logging::: From Class: ProjectsDashboard.js, Function: resState => de lam gi vay????, Line: 84, Data Log::: ', resState);
            callApi("dashboard/gettask", "GET", null).then(resTask => {
                setListTask(resTask.data);
            })
        })

    }

    const renderListTask = listTask.map(listTask =>
        <ListGroupItem action>
            <TasksMedia
                id={listTask.toDoListID}
                iconColor={listTask.priority}
                title={listTask.title}
                description={listTask.description}
                isComplete={listTask.isComplete}
                onClickItemTask={() => onClickItemTask(listTask.toDoListID)}
            />
        </ListGroupItem>
    );

    return (
        <Container>
            <Row className="mb-5">
                <Col lg={12}>
                    <HeaderMain
                        title="Dashboard"
                        className="mb-4 mb-lg-5"
                    />
                    <p>
                        Hôm nay bạn thế nào ?
                </p>
                </Col>
                <Col lg={3} md={6}>
                    <div className="hr-text hr-text-left my-2">
                        <span>Công việc của tôi</span>
                    </div>
                    <Media>
                        <Media left className="mr-3">
                            <TinyDonutChart valueA={data.totalTodolistProcessing} valueB={data.totalTodolistLate} ValueC={data.totalTodolistComplete} />

                        </Media>
                        <Media body>
                            <div>
                                <i className="fa fa-circle mr-1 text-yellow"></i>
                                <span className="text-inverse">{data.totalTodolistProcessing}</span> Đang thực hiện
                        </div>
                            <div>
                                <i className="fa fa-circle mr-1 text-danger"></i>
                                <span className="text-inverse">{data.totalTodolistLate}</span> Trễ hẹn
                        </div>
                            <div>
                                <i className="fa fa-circle mr-1 text-success"></i>
                                <span className="text-inverse">{data.totalTodolistComplete}</span> Hoàn thành
                        </div>
                        </Media>
                    </Media>
                </Col>
                <Col lg={3} md={6} className="mb-4 mb-lg-0">
                    <div className="hr-text hr-text-left my-2">
                        <span>Sự kiện của tôi</span>
                    </div>
                    <Media>
                        <Media left className="mr-3">
                            <TinyDonutChartAllProjects valueA={data.totalCalendarExpected} valueB={data.totalCalendarComplete} ValueC={data.totalCalendar} />

                        </Media>
                        <Media body>
                            <div>
                                <i className="fa fa-circle mr-1 text-info"></i>
                                <span className="text-inverse">{data.totalCalendarExpected}</span> Dự kiến
                        </div>
                            <div>
                                <i className="fa fa-circle mr-1 text-primary"></i>
                                <span className="text-inverse">{data.totalCalendarComplete}</span> Đã tham gia
                        </div>
                            <div>
                                <i className="fa fa-circle mr-1 text-purple"></i>
                                <span className="text-inverse">{data.totalCalendar}</span> Tổng sự kiện
                        </div>
                        </Media>
                    </Media>
                </Col>
                <Col lg={6}>
                    <div className="hr-text hr-text-left my-2">
                        <span>Thông tin công ty</span>
                    </div>
                    <Table size="sm">
                        <tbody>
                            <tr>
                                <td className="text-inverse bt-0">Tổng số nhân viên</td>
                                <td className="text-right bt-0">
                                    <Badge color="success" pill>{data.totalStaff}</Badge>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-inverse">Tổng số phòng ban</td>
                                <td className="text-right">
                                    <Badge color="primary" pill>{data.totalDepartment}</Badge>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-inverse">Tổng sự kiện</td>
                                <td className="text-right">
                                    <Badge color="info" pill>{data.totalCalendar}</Badge>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-inverse">Tổng công việc </td>
                                <td className="text-right">
                                    <Badge color="secondary" pill>{data.totalToDoList}</Badge>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <Card className="mb-3">
                        <CardBody>
                            <CardTitle tag="h6" className="mb-3">
                                Công việc
                            </CardTitle>
                        </CardBody>
                        <ListGroup flush>

                            {renderListTask}

                            <ListGroupItem action tag={Link} to="/apps/tasks/list" className="text-center">
                                Xem tất cả
                            <i className="fa fa-angle-right ml-2"></i>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="mb-3">
                        <CardBody>
                            <CardTitle tag="h6">
                                Timeline Mini
                        </CardTitle>
                            <TimelineMini
                                showPillDate
                                pillDate="2 Days ago"
                                icon="times-circle"
                                iconClassName="text-danger"
                                badgeTitle="Alert"
                                badgeColor="danger"
                            />
                            <TimelineMini
                                icon="question-circle"
                                iconClassName="text-warning"
                                badgeTitle="Warning"
                                badgeColor="warning"
                            />
                            <TimelineMini
                                icon="info-circle"
                                iconClassName="text-info"
                                badgeTitle="Info"
                                badgeColor="info"
                            />
                            <TimelineMini
                                showPillDate
                                pillDate="Yesterday"
                                icon="plus-circle"
                                iconClassName="text-primary"
                                badgeTitle="Message"
                                badgeColor="primary"
                            />
                            <TimelineMini
                                icon="check-circle"
                                iconClassName="text-success"
                                badgeTitle="Success"
                                badgeColor="success"
                            />
                            <TimelineMini
                                icon="circle"
                                badgeTitle="Obsolete"
                            />
                        </CardBody>
                        <ListGroup flush>
                            <ListGroupItem action tag={Link} to="/pages/timeline" className="text-center">
                                Timeline Details
                            <i className="fa fa-angle-right ml-2"></i>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="mb-3">
                        <CardBody>
                            <CardTitle tag="h6" className="mb-3">
                                Projects
                        </CardTitle>
                            <InputGroup>
                                <Input placeholder="Search Projects..." />
                                <InputGroupAddon addonType="append">
                                    <Button color="secondary" outline tag={Link} to="/apps/projects/list">
                                        <i className="fa fa-search"></i>
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </CardBody>
                        <DraggableProjects />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}


export default setupPage({
    pageTitle: 'Projects Dashboard'
})(ProjectsDashboard);