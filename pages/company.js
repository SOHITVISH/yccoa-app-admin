import React, { useEffect } from 'react'
import { Fragment } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import { StatRightTopIcon } from "widgets";
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";
import ActiveCompany from 'sub-components/dashboard/ActiveCompany';
import { useRouter } from 'next/router';

const Company = () => {
    const router = useRouter()

useEffect(() => {
    let isAuth = localStorage.getItem('token');
    if (isAuth) {
        router.push("/company")
    }
}, []);


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
                                    <h3 className="mb-0  text-white">Company</h3>
                                </div>
                                <div>
                                    <Link href="/createnewcompany" className="btn btn-white">Add New Company</Link>
                                </div>
                            </div>
                        </div>
                    </Col>

                </Row>


                <ActiveCompany />


            </Container>
        </Fragment>
    )
}

export default Company