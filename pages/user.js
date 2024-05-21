import React from 'react'
import { Fragment } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import { StatRightTopIcon } from "widgets";
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";
import AllUser from 'sub-components/dashboard/ActiveUser';

const User = () => {
  return (
    <Fragment>
            <div className="bg-success pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        {/* Page header */}
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-0">
                                    {/* <h3 className="mb-0  text-white">All Admin</h3> */}
                                </div>
                                <div>
                                  <Link  href="/addnewuser" className="btn btn-white">Create New User</Link>
                                </div>
                            </div>
                        </div>
                    </Col>
                    {/* {ProjectsStatsData.map((item, index) => {
                        return (
                            <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
                                <StatRightTopIcon info={item} />
                            </Col>
                        )
                    })} */}
                </Row>

                {/* Active Projects  */}
               <AllUser/> 

            
            </Container>
        </Fragment>
  )
}

export default User