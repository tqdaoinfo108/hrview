import React from 'react';
import faker from 'faker/locale/en_US';
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

const ProjectsDashboard = () => (
    <Container>
        <Row className="mb-5">
            <Col lg={ 12 }>
                <HeaderMain 
                    title="Dashboard"
                    className="mb-4 mb-lg-5"
                />
                <p>
                    Hôm nay bạn thế nào ? 
                </p>
            </Col>            
            <Col lg={ 3 } md={ 6 }>
                <div className="hr-text hr-text-left my-2">
                    <span>Công việc của tôi</span>
                </div>
                <Media>
                    <Media left className="mr-3">
                        <TinyDonutChart />
                    </Media>
                    <Media body>
                        <div>
                            <i className="fa fa-circle mr-1 text-yellow"></i> 
                            <span className="text-inverse">23</span> Đang thực hiện
                        </div>
                        <div>
                            <i className="fa fa-circle mr-1 text-danger"></i> 
                            <span className="text-inverse">3</span> Trễ hẹn
                        </div>
                        <div>
                            <i className="fa fa-circle mr-1 text-success"></i> 
                            <span className="text-inverse">34</span> Hoàn thành
                        </div>
                    </Media>
                </Media>
            </Col>
            <Col lg={ 3 } md={ 6 } className="mb-4 mb-lg-0">
                <div className="hr-text hr-text-left my-2">
                    <span>Sự kiện của tôi</span>
                </div>
                <Media>
                    <Media left className="mr-3">
                        <TinyDonutChartAllProjects />
                    </Media>
                    <Media body>
                        <div>
                            <i className="fa fa-circle mr-1 text-info"></i> 
                            <span className="text-inverse">14</span> Dự kiến
                        </div>
                        <div>
                            <i className="fa fa-circle mr-1 text-primary"></i> 
                            <span className="text-inverse">24</span> Đã tham gia
                        </div>
                        <div>
                            <i className="fa fa-circle mr-1 text-purple"></i> 
                            <span className="text-inverse">2</span> Tổng sự kiện
                        </div>
                    </Media>
                </Media>
            </Col>
            <Col lg={ 6 }>
                <div className="hr-text hr-text-left my-2">
                    <span>Thông tin công ty</span>
                </div>
                <Table size="sm">
                    <tbody>
                        <tr>
                            <td className="text-inverse bt-0">Tổng số nhân viên</td>
                            <td className="text-right bt-0">
                                <Badge color="success" pill>6</Badge>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-inverse">Tổng số phòng ban</td>
                            <td className="text-right">
                                <Badge color="primary" pill>4</Badge>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-inverse">Tổng sự kiện</td>
                            <td className="text-right">
                                <Badge color="info" pill>15</Badge>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-inverse">Tổng công việc </td>
                            <td className="text-right">
                                <Badge color="secondary" pill>110</Badge>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
        <Row>
            <Col lg={ 4 }>
                <Card className="mb-3">
                    <CardBody>
                        <CardTitle tag="h6" className="mb-3">
                            Tasks
                        </CardTitle>
                        <InputGroup>
                            <Input placeholder="Search Tasks..." />
                            <InputGroupAddon addonType="append">
                                <Button color="secondary" outline tag={ Link } to="/apps/tasks/list">
                                    <i className="fa fa-search"></i>
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </CardBody>
                    <ListGroup flush>
                        <ListGroupItem action>
                            <TasksMedia 
                                iconColor="success"
                            />
                        </ListGroupItem>
                        <ListGroupItem action>
                            <TasksMedia 
                                iconColor="danger"
                                id="2"
                            />
                        </ListGroupItem>
                        <ListGroupItem action>
                            <TasksMedia 
                                iconColor="warning"
                                id="3"
                            />
                        </ListGroupItem>
                        <ListGroupItem action>
                            <TasksMedia 
                                id="4"
                            />
                        </ListGroupItem>
                        <ListGroupItem action tag={ Link } to="/apps/tasks/list" className="text-center">
                            View All Tasks
                            <i className="fa fa-angle-right ml-2"></i>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
            <Col lg={ 4 }>
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
                        <ListGroupItem action tag={ Link } to="/pages/timeline" className="text-center">
                            Timeline Details
                            <i className="fa fa-angle-right ml-2"></i>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
            <Col lg={ 4 }>
                <Card className="mb-3">
                    <CardBody>
                        <CardTitle tag="h6" className="mb-3">
                            Projects
                        </CardTitle>
                        <InputGroup>
                            <Input placeholder="Search Projects..." />
                            <InputGroupAddon addonType="append">
                                <Button color="secondary" outline tag={ Link } to="/apps/projects/list">
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

export default setupPage({
    pageTitle: 'Projects Dashboard'
})(ProjectsDashboard);