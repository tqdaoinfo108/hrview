import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {
  Avatar,
  Badge,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from './../../../../components';

import {randomArray, randomAvatar} from './../../../../utilities';

const badges = [
  "secondary"
];

const avatarStatus = [
  "secondary",
  "warning",
  "danger",
  "success"
];

const prioStatus = [
  <React.Fragment key="1">
    <i className="fa fa-circle text-success mr-2"></i>
    Small<i className="fa fa-angle-down ml-2"/>
  </React.Fragment>,
  <React.Fragment key="2">
    <i className="fa fa-circle text-primary mr-2"></i>
    Normal<i className="fa fa-angle-down ml-2"/>
  </React.Fragment>,
  <React.Fragment key="3">
    <i className="fa fa-circle text-warning mr-2"></i>
    High<i className="fa fa-angle-down ml-2"/>
  </React.Fragment>,
  <React.Fragment key="3">
    <i className="fa fa-circle text-danger mr-2"></i>
    Big<i className="fa fa-angle-down ml-2"/>
  </React.Fragment>
];

const TrTableTasksList = (props) => {
  console.log('Logging::: From Class: TrTableTasksList.js, Function: TrTableTasksList, Line: 49, Data Log::: ', props.data);

  return (
    <React.Fragment>
      <tr>
        <td className="align-middle">
          {/*<Media  left className="mr-3">*/}
          {/*<CustomInput className="pt-0 mt-0" type="checkbox" checked={props.isComplete ? 'checked' : ''} id={`taskMedia-${props.id}`} label="" />*/}
          <CustomInput onClick={() => props.onChangeState(props?.data?.toDoListID)} checked={props?.data?.isComplete}
                       type="checkbox" id={`TrTableTasksList-${props?.data?.id}`} label="" inline/>
          {/*</Media>*/}
        </td>
        <td className="align-middle">
          <UncontrolledButtonDropdown>
            <DropdownToggle color="link" link size="sm" className="pl-0 mb-3 text-decoration-none">
              {prioStatus[props?.data?.priority ? props?.data?.priority : 0]}
              {/*{props?.data?.priority}*/}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Select Priority</DropdownItem>
              <DropdownItem>
                <i className="fa fa-circle text-danger mr-2"></i>
                Big
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-circle text-warning mr-2"></i>
                High
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-circle text-primary mr-2"></i>
                Normal
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-circle text-success mr-2"></i>
                Small
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </td>
        <td className="align-middle">
          <div>
            <span className="mr-2">#{props?.data?.toDoListID}</span>
            <Link to="/apps/task-details" className="text-decoration-none">
              {props?.data?.title}
            </Link>
          </div>
          <p className="mb-0">
                        <span className="mr-2">
                            {props?.data?.description}
                        </span>
            <Badge pill color={randomArray(badges)} className="mr-1">
              {props?.data?.departmentName}
            </Badge>
            {/*<Badge pill color={randomArray(badges)} className="mr-1">*/}
            {/*  {faker.commerce.department()}*/}
            {/*</Badge>*/}
          </p>
        </td>
        <td className="align-middle">
          <Avatar.Image
            size="md"
            src={randomAvatar()}
            className="mr-3"
          />
        </td>
        <td className="align-middle">
          {props?.data?.timeEnd?.substring(0, 10)}
        </td>
        <td className="align-middle text-right">
          <UncontrolledButtonDropdown className="align-self-center ml-auto">
            <DropdownToggle color="link" size="sm">
              <i className="fa fa-gear"/><i className="fa fa-angle-down ml-2"/>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <i className="fa fa-fw fa-folder-open mr-2"></i>
                Xem chi tiết
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-fw fa-trash mr-2"></i>
                Xoá
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </td>
      </tr>
    </React.Fragment>
  )
}


TrTableTasksList.propTypes = {
  id: PropTypes.node,

};
TrTableTasksList.defaultProps = {
  id: "1"
};

export {TrTableTasksList};
