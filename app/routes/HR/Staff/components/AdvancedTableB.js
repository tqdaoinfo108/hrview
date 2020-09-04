import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import moment from 'moment';
import _ from 'lodash';
import faker from 'faker/locale/en_US';
import axios from 'axios'

import {
    Avatar,
    Badge,
    Button,
    ButtonGroup,
    Row,
    Col,
    Container
} from '../../../../components';
import { CustomExportCSV } from './CustomExportButton';
import { CustomSearch } from './CustomSearch';
import { randomArray, randomAvatar } from '../../../../utilities';

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
            isLoaded: false
        }

    }

    componentDidMount() {
        // const dataValue ={};
        const initData = async () => {
            let token = await localStorage.getItem('token');
            token = JSON.parse(token);
            await axios.get('https://localhost:5000/api/staff/getAll', { headers: { Authorization: 'Bearer ' + token } }).then(
                res => {
                    this.setState({ users: res.data })
                    this.setState({ isLoaded: true })
                }
            )
        }
        // this.props.state.users = dataValue;
        initData();
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
                    <Avatar.Image src={cell} />
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
        const { isLoaded } = this.state;
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
                expandHeaderColumnRenderer: ({ isAnyExpands }) => isAnyExpands ? (
                    <i className="fa fa-angle-down fa-fw fa-lg text-muted"></i>
                ) : (
                        <i className="fa fa-angle-right fa-fw fa-lg text-muted"></i>
                    ),
                expandColumnRenderer: ({ expanded }) =>
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
                                            <Button
                                                size="sm"
                                                outline
                                                onClick={this.handleAddRow.bind(this)}
                                            >
                                                // API api/staff/create
                                                Thêm <i className="fa fa-fw fa-plus"></i>
                                            </Button>
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