import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import DatePicker, {setDefaultLocale} from 'react-datepicker';
import moment from 'moment';
import {
  Accordion,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  ButtonToolbar,
  UncontrolledModal,
} from './../../../components';
import {Col, Form, FormGroup, Input, Label} from "../../../components";
import {callApi} from "../../../../core/callApi";
import ModalHeader from "reactstrap/es/ModalHeader";
import {ButtonInput} from "../../Forms/DatePicker/components";
import ModalBody from "reactstrap/es/ModalBody";

setDefaultLocale('es');

const ProjectsSmHeader = (props) => {

  const [isShowAdd, setIsShowAdd] = useState(false);
  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("Decription");
  const [priority, setPriority] = useState(1);
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(moment().toDate());
  const [staffAssignedID, setStaffAssignedID] = useState(2);
  const [departmentsID, setDepartmentsID] = useState(2);


  const [user, setUser] = useState([]);

  const onShowAddTaskList = () => {
    setIsShowAdd(!isShowAdd);
  }

  const handleChangeStart = () => {

  }

  const onSubmit = () => {
    let objTask = {
      "Title": title,
      "Description": description,
      "Priority": priority,
      "TimeStart": timeStart,
      "TimeEnd": timeEnd,
      "StaffAssignedID": staffAssignedID,
      "DepartmentsID": departmentsID
    }
    callApi("todoList/create", "POST", objTask).then(res => {
      props.onAddItemList()
      onShowAddTaskList()
      console.log('Logging::: From Class: ProjectsSmHeader.js, Function: , Line: 41, Data Log::: ', res);
    })

  }

  const genListUser = () => {
    callApi("staff/getAll", "GET", null).then(res => {
      setUser(res.data)
    })
  }

  useEffect(() => {
    genListUser()
  }, [])


  return (
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
            <Button onClick={onShowAddTaskList} color="primary" className="align-self-center" id="tooltipAddNew">
              <i className="fa-fw fa fa-plus"></i>
            </Button>
            {/*// API modal api/todolist/create*/}

            <UncontrolledModal isOpen={isShowAdd} placement="bottom" target="tooltipAddNew">
              <ModalHeader tag="h6">
                Tạo sự kiện
              </ModalHeader>
              <ModalBody>
                <Form>

                  <FormGroup row>
                    <Label for="input" sm={3}>
                      Title
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="input"
                        name="title"
                        id="title"
                        placeholder=""
                        onChange={(e) => {
                          setTitle(e.target.value)
                        }}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="TimePicker" sm={3}>
                      Time start
                    </Label>
                    <Col sm={9}>
                      <DatePicker
                        customInput={<ButtonInput/>}
                        selected={timeStart}
                        // onChange={(e) => setTimeStart(e)}
                        onChange={date => setTimeStart(date)}
                        showTimeSelect
                        dateFormat="dd-MM-yyyy h:mm aa"

                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="input" sm={3}>
                      Time end
                    </Label>
                    <Col sm={9}>
                      <DatePicker
                        customInput={<ButtonInput/>}
                        selected={timeEnd}
                        // onChange={setTimeEnd}
                        onChange={date => setTimeEnd(date)}
                        showTimeSelect

                        dateFormat="dd-MM-yyyy h:mm aa"

                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="textArea" sm={3}>
                      Description
                    </Label>
                    <Col sm={9}>
                      <Input
                        onChange={(e) => setDescription(e.target.value)}
                        type="textarea"
                        name="description"
                        placeholder="Enter text..."
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="textArea" sm={3}>
                      Tham dự
                    </Label>
                    <Col sm={9}>
                      <Accordion className="mb-2">
                        <Accordion.Header className="d-flex h6">
                          <span>Thành viên</span>
                          <Accordion.Indicator className="ml-auto"/>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div>
                            {/*<FormGroup>*/}
                            {/*  {user}*/}
                            {/*</FormGroup>*/}
                          </div>
                        </Accordion.Body>
                      </Accordion>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="textArea" sm={3}>
                      Catagories
                    </Label>
                    <Col sm={9}>
                      <Accordion className="mb-2">
                        <Accordion.Header className="d-flex h6">
                          <span>Danh sách</span>
                          <Accordion.Indicator className="ml-auto"/>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div>
                            {/*<FormGroup>*/}
                            {/*  {genListCtg}*/}
                            {/*</FormGroup>*/}
                          </div>
                        </Accordion.Body>
                      </Accordion>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={3}>

                    </Label>
                    <Col sm={5}>
                      <Button onClick={onSubmit} color="primary">
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
        </ButtonToolbar>
      </div>
      { /* END Header Nav */}
    </React.Fragment>
  )
}


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

export {ProjectsSmHeader};
