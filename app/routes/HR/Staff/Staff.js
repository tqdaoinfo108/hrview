import React, {useEffect} from 'react';
import {Col, Container, Row} from '../../../components';
import Moment from 'moment';

import {AdvancedTableB} from './components';
import {HeaderMain} from "../../components/HeaderMain";

export const Staff = () => {
  useEffect(() => {
    Moment.locale('vi');
  },)

  return (
    <Container>
      <HeaderMain
        title="Danh sách nhân sự"
        className="mb-5 mt-4"
      />

      <Row className="mb-5">
        <Col>
          <AdvancedTableB/>
        </Col>
      </Row>

    </Container>
  )
};