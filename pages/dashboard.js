// import node module libraries
import { Fragment, useContext } from "react";
import Link from 'next/link';
import { Container, Col, Row } from 'react-bootstrap';


import { StatRightTopIcon } from "widgets";
import { Context as AuthContext } from "../contextApi/AuthContext.js";


// import required data files
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";

// import CompanyDashboard from "sub-components/dashboard/CompanyDashboard.js";

const Home = () => {
    const {  state } = useContext(AuthContext)

console.log(state,"_____________dashboad");
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
                                    {/* <h3 className="mb-0  text-white">Company</h3> */}
                                </div>
                                <div>
                                    {/* <Link href="/createnewcompany" className="btn btn-white">Add New Company</Link> */}
                                </div>
                            </div>
                        </div>
                    </Col>
                    {ProjectsStatsData.map((item, index) => {
                        return (
                            <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
                                <StatRightTopIcon info={item} />
                            </Col>
                        )
                    })}
                </Row>


                {/* <CompanyDashboard /> */}



            </Container>
        </Fragment>
    )
}
export default Home;
