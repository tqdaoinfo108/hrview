import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import moment from 'moment';
import _ from 'lodash';
import faker from 'faker/locale/en_US';

import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  UncontrolledModal
} from '../../../../components';
import {CustomExportCSV} from './CustomExportButton';
import {randomArray, randomAvatar} from '../../../../utilities';
import {callApi} from "../../../../../core/callApi";
import ModalHeader from "reactstrap/es/ModalHeader";
import ModalBody from "reactstrap/es/ModalBody";

const generateRow = (id) => ({
  id,
  photo: randomAvatar(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  role: faker.name.jobType(),
  status: randomArray([
    'Active',
    'Suspended',
    'Waiting',
    'Unknown'
  ]),
  region: randomArray(['North', 'South', 'East', 'West']),
  earnings: 500 + Math.random() * 1000,
  earningsCurrencyIcon: randomArray([
    <i className="fa fa-fw fa-euro text-muted" key="cur_eur"></i>,
    <i className="fa fa-fw fa-dollar text-muted" key="cur_usd"></i>
  ]),
  lastLoginDate: faker.date.recent(),
  ipAddress: faker.internet.ip(),
  browser: 'Safari 9.1.1(11601.6.17)',
  os: 'OS X El Capitan',
  planSelected: randomArray(['Basic', 'Premium', 'Enterprise']),
  planEnd: faker.date.future()
});

const sortCaret = (order) => {
  if (!order)
    return <i className="fa fa-fw fa-sort text-muted"></i>;
  if (order)
    return <i className={`fa fa-fw text-muted fa-sort-${order}`}></i>
};

export class AdvancedTableB extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: _.times(0, generateRow),
      isLoaded: false,
      isShowAdd: false,
      StaffCode: "daotq@way.vn",
      Passwords: "123456",
      FullName: "New Member" + Math.random(),
      StatusID: 1,
      CompanyID: 1,
      PositionsID: 1,
      DepartmentsID: 1

    }

  }

  componentDidMount() {
    this.loadDataUser();
  }

  loadDataUser = () => {
    callApi("staff/getAll", "GET", null).then(res => {
      this.setState({users: res.data})
      this.setState({isLoaded: true})
    })
  }

  onSubmitCreateStaff = () => {
    const {StaffCode, Passwords, FullName, StatusID, CompanyID, PositionsID, DepartmentsID} = this.state;
    let objStaff = {
      "StaffCode": StaffCode,
      "Passwords": Passwords,
      "FullName": FullName,
      "StatusID": Number.parseInt(StatusID),
      "CompanyID": Number.parseInt(CompanyID),
      "PositionsID": Number.parseInt(PositionsID),
      "DepartmentsID": Number.parseInt(DepartmentsID)
    }
    console.log('Logging::: From Class: AdvancedTableB.js, Function: onSubmitCreateStaff, Line: 103, Data Log::: ', objStaff);
    callApi("staff/create", "POST", objStaff).then(res => {
      console.log('Logging::: From Class: AdvancedTableB.js, Function: , Line: 88, Data Log::: ', res);
      this.loadDataUser()
    })
  }

  handleAddRow() {
    const usersLength = this.state.users.length;

    this.setState({
      users: [
        generateRow(usersLength + 1),
        ...this.state.users
      ]
    })
  }

  createColumnDefinitions() {
    return [
      {
        dataField: 'photo',
        text: 'Ảnh đại diện',
        formatter: (cell) => (
          <Avatar.Image src={cell}/>
        )
      }, {
        dataField: 'fullName',
        text: 'Tên đầy đủ',
        sort: true,
        sortCaret
      }, {
        dataField: 'positionsName',
        text: 'Chức vụ',
        sort: true,
        sortCaret
      }, {
        dataField: 'staffCode',
        text: 'Email',
        sort: true,
        sortCaret
      }, {
        dataField: 'dateCreated',
        text: 'Ngày vào',
        sort: true,
        sortCaret,
        formatter: (cell, row) => (
          <span>
                        {row.earningsCurrencyIcon}
            {_.isNumber(cell) && cell.toFixed(2)}
                    </span>
        )
      }, {
        dataField: 'statusID',
        text: 'Trạng thái',
        sort: true,
        sortCaret,
        formatter: (cell) => {
          const color = (statusID) => {
            const map = {
              1: 'success',
              2: 'danger',
              3: 'danger',
            };
            return map[statusID];
          }

          return (
            <Badge color={color(cell)}>
              {cell == 1 ? ' Đang hoạt động' : 'Ngưng hoạt động'}
            </Badge>
          );
        }
      }
    ];
  }

  render() {
    const {isLoaded} = this.state;
    if (isLoaded) {
      // API  api/staff/getall
      const columnDefs = this.createColumnDefinitions();

      const expandRow = {
        renderer: row => (
          <Row>
            <Col md={6}>
              <dl className="row">
                <dt className="col-sm-6 text-right">Chức vụ</dt>
                <dd className="col-sm-6">{row.positionsName}</dd>

                <dt className="col-sm-6 text-right">Phòng ban</dt>
                <dd className="col-sm-6">{row.departmentsName}</dd>

                <dt className="col-sm-6 text-right">Công ty</dt>
                <dd className="col-sm-6">{row.companyName}</dd>
              </dl>
            </Col>
            <Col md={6}>
              <dl className="row">
                <dt className="col-sm-6 text-right">Đăng nhập lần cuối</dt>
                <dd className="col-sm-6">{moment(row.lastLogin).format('DD-MMM-YYYY')}</dd>
              </dl>
            </Col>
          </Row>
        ),
        showExpandColumn: true,
        expandHeaderColumnRenderer: ({isAnyExpands}) => isAnyExpands ? (
          <i className="fa fa-angle-down fa-fw fa-lg text-muted"></i>
        ) : (
          <i className="fa fa-angle-right fa-fw fa-lg text-muted"></i>
        ),
        expandColumnRenderer: ({expanded}) =>
          expanded ? (
            <i className="fa fa-angle-down fa-fw fa-lg text-muted"></i>
          ) : (
            <i className="fa fa-angle-right fa-fw fa-lg text-muted"></i>
          )
      }

      return (
        <ToolkitProvider
          keyField="id"
          data={this.state.users}
          columns={columnDefs}
          search
          exportCSV
        >
          {
            props => (
              <React.Fragment>
                <div className="d-flex justify-content-end align-items-center mb-2">

                  <div className="d-flex ml-auto">

                    <ButtonGroup>
                      <CustomExportCSV
                        {...props.csvProps}
                      >
                        Xuất .csv
                      </CustomExportCSV>

                      <Button onClick={() => this.setState({isShowAdd: true})} color="primary"
                              className="align-self-center" id="tooltipAddNew">
                        Thêm <i className="fa fa-fw fa-plus"></i>
                      </Button>
                      {/*// API modal api/todolist/create*/}

                      <UncontrolledModal isOpen={this.state.isShowAdd} placement="bottom" target="tooltipAddNew">
                        <ModalHeader tag="h6">
                          Tạo sự kiện
                        </ModalHeader>
                        <ModalBody>
                          <Form>

                            <FormGroup row>
                              <Label for="input" sm={3}>
                                StaffCode
                              </Label>
                              <Col sm={9}>
                                <Input
                                  type="input"
                                  name="title"
                                  id="title"
                                  placeholder=""
                                  onChange={(e) => {
                                    this.setState({StaffCode: e.target.value})
                                  }}
                                />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="input" sm={3}>
                                Passwords
                              </Label>
                              <Col sm={9}>
                                <Input
                                  type="input"
                                  name="title"
                                  id="Passwords"
                                  placeholder=""
                                  onChange={(e) => {
                                    this.setState({Passwords: e.target.value})
                                  }}
                                />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="input" sm={3}>
                                FullName
                              </Label>
                              <Col sm={9}>
                                <Input
                                  type="input"
                                  name="title"
                                  id="title"
                                  placeholder=""
                                  onChange={(e) => {
                                    this.setState({FullName: e.target.value})
                                  }}
                                />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="input" sm={3}>
                                StatusID
                              </Label>
                              <Col sm={9}>
                                <Input
                                  type="input"
                                  name="title"
                                  id="title"
                                  placeholder=""
                                  onChange={(e) => {
                                    this.setState({StatusID: Number(e.target.value)})
                                  }}
                                />
                              </Col>
                            </FormGroup>


                            <FormGroup row>
                              <Label for="input" sm={3}>
                                CompanyID
                              </Label>
                              <Col sm={9}>
                                <Input
                                  type="input"
                                  name="title"
                                  id="title"
                                  placeholder=""
                                  onChange={(e) => {
                                    this.setState({CompanyID: Number(e.target.value)})
                                  }}
                                />
                              </Col>
                            </FormGroup>


                            <FormGroup row>
                              <Label for="textArea" sm={3}>
                                PositionsID
                              </Label>
                              <Col sm={9}>
                                <Input
                                  onChange={(e) => {
                                    this.setState({PositionsID: Number(e.target.value)})
                                  }}
                                  type="textarea"
                                  name="description"
                                  placeholder="Enter text..."
                                />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="textArea" sm={3}>
                                DepartmentsID
                              </Label>
                              <Col sm={9}>
                                <Input
                                  onChange={(e) => {
                                    this.setState({DepartmentsID: Number(e.target.value)})
                                  }}
                                  type="textarea"
                                  name="description"
                                  placeholder="Enter text..."
                                />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label sm={3}>

                              </Label>
                              <Col sm={5}>
                                <Button onClick={this.onSubmitCreateStaff} color="primary">
                                  Create
                                </Button>

                                <UncontrolledModal.Close color="warning" className="text-primary">
                                  Close
                                </UncontrolledModal.Close>
                              </Col>
                            </FormGroup>

                          </Form>
                        </ModalBody>
                      </UncontrolledModal>
                    </ButtonGroup>
                  </div>
                </div>
                <BootstrapTable
                  classes="table-responsive-lg"
                  bordered={false}
                  expandRow={expandRow}
                  responsive
                  hover
                  {...props.baseProps}
                />
              </React.Fragment>
            )
          }
        </ToolkitProvider>
      );
    } else {
      return (
        <Container>

        </Container>
      );
    }
  }
}