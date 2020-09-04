import React, { useEffect,useState } from 'react';
import Moment from 'moment';

import {
    Pagination,
    PaginationItem,
    PaginationLink,
    Card,
    CardFooter,
    Table
} from './../../../components';

import { TrTableTasksList } from "./components/TrTableTasksList";
import {callApi} from "../../../../core/callApi";

const TasksList = (props) => {
    const [listTask, setListTask] = useState([]);
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        Moment.locale('vi');

        const initData = async () => {
            callApi("dashboard/gettask", "GET", null).then(res => {
                setListTask(res.data);
            })

            callApi("todolist/getall", "GET", null).then(res => {
                setTodoList(res.data);
            })

        }
        initData();
    }, [])

    // api/todolist/getall
    const renderListTask = todoList.map((item) =>
        <TrTableTasksList data={item} />
    );

    return (
        <Card className="mb-3">
            { /* START Table */}
            <div className="table-responsive-xl">
                <Table className="mb-0" hover>
                    <thead>
                        <tr>
                            <th className="align-middle bt-0">#</th>
                            <th className="align-middle bt-0">Mức độ</th>
                            <th className="align-middle bt-0">Tiêu đề & nội dung</th>
                            <th className="align-middle bt-0">Người thực hiện</th>
                            <th className="align-middle bt-0">Cập nhật</th>
                            <th className="align-middle bt-0 text-right">
                                Lựa chọn
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderListTask}
                    </tbody>
                </Table>
            </div>
            { /* END Table */}
            {/* <CardFooter className="d-flex justify-content-center pb-0">
                <Pagination aria-label="Page navigation example">
                    <PaginationItem>
                        <PaginationLink previous href="#">
                            <i className="fa fa-fw fa-angle-left"></i>
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem active>
                        <PaginationLink href="#">
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            3
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink next href="#">
                            <i className="fa fa-fw fa-angle-right"></i>
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </CardFooter> */}
        </Card>
    )
}

export default TasksList;
