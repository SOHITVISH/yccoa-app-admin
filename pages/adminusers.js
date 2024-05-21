import React from 'react'
import { Fragment } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import { StatRightTopIcon } from "widgets";
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";
import AllAdminUser from 'sub-components/dashboard/ActiveAdminUsers.js';

const UserAdmin = () => {
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
                                  <Link  href="/addadminusers" className="btn btn-white">Create Admin</Link>
                                </div>
                            </div>
                        </div>
                    </Col>
                 
                </Row>

                {/* Active Projects  */}
            
               <AllAdminUser/> 

            
            </Container>
        </Fragment>
  )
}

export default UserAdmin