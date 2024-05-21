import React, { useContext, useEffect, useRef, useState } from 'react'
import { Fragment } from "react";
import { Container, Card, Col, Row, Table } from 'react-bootstrap';
import Link from 'next/link';
import { StatRightTopIcon } from "widgets";
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";
import ActiveCompany from 'sub-components/dashboard/ActiveCompany';
import { IoMdArrowRoundBack } from "react-icons/io"
import { Context as AuthContext } from "../contextApi/AuthContext.js";
import { useRouter } from 'next/router';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { DateTime } from 'luxon';
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
// import { ProgressBar, Col, Row, Card, , , Dropdown } from 'react-bootstrap';
const companydetails = () => {
    const router = useRouter()
    const empTaskPage = useRef(1)
    const empPage = useRef(1)
    const adminPage = useRef(1)
    const { getSingleCompany, getAllEmployeeTaskOfCompany, getAllAdminuser, allEmployeeOfCompany, state } = useContext(AuthContext)
    console.log(router.query.id, "_________________________________iddddddddddd");

    console.log(state.allAdminuser, "______________allAdminuserrrrrrrrrrrrrrrrrrrrrrrr");
    useEffect(() => {
        let isAuth = localStorage.getItem('token');
        if (!isAuth) {
            router.push("/")
        }
    }, []);



    useEffect(() => {
        if (router.isReady) {
            getSingleCompany({ id: router.query.id })
            allEmployeeOfCompany({ id: router.query.id })
            getAllAdminuser({ company_id: router.query.id })
            getAllEmployeeTaskOfCompany({ id: router.query.id })

        }
    }, [router])

    const handlePage = () => {

        if (state.employeeTaskOfSingleCompany.length < state.employeeTaskCountOfSingleCompany) {
            getAllEmployeeTaskOfCompany({ id: router.query.id, page: empTaskPage.current += 1 })
        }


    }

    const handleBackPage = () => {
        if ((state.employeeTaskOfSingleCompany.length <= state.employeeTaskCountOfSingleCompany) && state.employeeTaskCountOfSingleCompany != 0) {

            getAllEmployeeTaskOfCompany({ id: router.query.id, page: empTaskPage.current -= 1, })

        }
    }

    const emphandlePage = () => {

        if (state.getcompanyemployee.length < state.allEmpCount) {
            allEmployeeOfCompany({ id: router.query.id, page: empPage.current += 1 })
            // getAllEmployee({ id: userAdminID, page: empPage.current += 1 })
        }


    }

    const emphandleBackPage = () => {
        if ((state.getcompanyemployee.length <= state.allEmpCount) && state.allEmpCount != 0) {

            allEmployeeOfCompany({ id: router.query.id, page: empPage.current -= 1, })
            // getAllEmployee({ id: userAdminID, page: empPage.current -= 1, })

        }
    }


    const adminhandlePage = () => {

        if (state.allAdminuser.length < state.getuseradmincount) {
            getAllAdminuser({ company_id: router.query.id, page: adminPage.current += 1 })
            // getAllEmployee({ id: userAdminID, page: empPage.current += 1 })
        }


    }

    const adminhandleBackPage = () => {
        if ((state.allAdminuser.length <= state.getuseradmincount) && state.getuseradmincount != 0) {

            getAllAdminuser({ company_id: router.query.id, page: adminPage.current -= 1, })
            // getAllEmployee({ id: userAdminID, page: empPage.current -= 1, })

        }
    }




    const handleback = async () => {
        router.push("/company")
    }

    let phone = state.singlecompany.phone
    console.log(phone, "__________________tttttttttt");
    let re = /(\d{1})(\d{3})(\d{3})(\d{4})/;
    return (
        <Fragment>
            <div className="bg-success pb-21"></div>
            <Container fluid className="mt-n18 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        {/* Page header */}
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-22">
                                    <h3 className="mb-0  text-white">{state.singlecompany.company_name}</h3>
                                </div>

                                <div className="mb-2 mb-lg-22">
                                    <p style={{ color: "white", cursor: "pointer" }} onClick={handleback}   ><IoMdArrowRoundBack style={{ fontSize: "25px" }} />Back</p>
                                </div>

                            </div>
                        </div>
                    </Col>

                </Row>


                <Row className='mt-15 mt-md-0'>
                    <Tabs
                        defaultActiveKey="companydetails"
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="companydetails" title="Company Details">
                            <Table responsive className="text-nowrap mb-0">
                                <thead className="table-light">
                                    <tr >
                                        <th>#</th>
                                        {/* <th>Action</th> */}
                                        <th>Status</th>
                                        <th>Company name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Created At</th>
                                        <th>Updated At</th>
                                        <th>Created By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {state.singlecompany.map((item, index) => {
                                    return (
                                    <tr >
                                        <td className="align-middle">{1}</td>
                                        {/* <td className="align-middle" style={{ textAlign: "center" }} >
                                        <FaEdit style={{ color: "orange", marginRight: "10px", cursor: "pointer" }} />
                                        <MdDeleteForever style={{ color: "red" }} />
                                    </td> */}

                                        <td className="align-middle" style={{ fontFamily: "bold", textAlign: "center" }} >
                                            {item.company_status == 1 ? <FaCheck style={{ color: "green" }} /> : <p style={{ color: "red", alignItems: "center" }}>Blocked</p>}


                                        </td>
                                        <td className="align-middle">{item.company_name}</td>
                                        <td className="align-middle">{item.email}</td>
                                        <td className="align-middle">{item.phone.replace(re, (_, a, b, c, d) => `${a} (${b}) ${c}-${d}`)}</td>
                                        {/* <td className="align-middle">{item.phone}</td> */}
                                        <td className="align-middle">{DateTime.fromISO(item.created_at).toFormat("LLL dd, yyyy")}</td>
                                        <td className="align-middle" style={{ textAlign: "center" }}>{DateTime.fromISO(item.updated_at).toFormat("LLL dd, yyyy")}</td>
                                        <td className="align-middle" style={{ textAlign: "center" }}>{item.created_by}</td>
                                    </tr>
                                    )
                                })} 
                                </tbody>
                            </Table>
                        </Tab>

                        <Tab eventKey="admin" title="Admin">
                            <Table responsive className="text-nowrap mb-0">
                                <thead >
                                    <tr >
                                        <th>#</th>
                                        {/* <th>Action</th> */}
                                        <th>Status</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone No.</th>
                                        <th>Gender</th>
                                        <th>Created At</th>
                                        <th>Updated At</th>
                                        <th>Created By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.allAdminuser.map((item, index) => {
                                        return (
                                            <tr >
                                                <td className="align-middle">{index + 1}</td>
                                                {/* <td className="align-middle" style={{ textAlign: "center" }} >
                                        <FaEdit style={{ color: "orange", marginRight: "10px", cursor: "pointer" }} />
                                        <MdDeleteForever style={{ color: "red" }} />
                                    </td> */}

                                                <td className="align-middle" style={{ fontFamily: "bold", textAlign: "center" }} >
                                                    {item.user_admin_status == 4 ? <FaCheck style={{ color: "green" }} /> : <p style={{ color: "red", alignItems: "center" }}>Blocked</p>}


                                                </td>
                                                <td className="align-middle">{item.first_name} {item.last_name}</td>
                                                <td className="align-middle">{item.email}</td>
                                                <td className="align-middle">{item.phone.replace(re, (_, a, b, c, d) => `${a} (${b}) ${c}-${d}`)}</td>
                                                <td className="align-middle">{item.gender}</td>




                                                <td className="align-middle">{DateTime.fromISO(item.created_at).toFormat("LLL dd, yyyy")}</td>
                                                <td className="align-middle" style={{ textAlign: "center" }}>{DateTime.fromISO(item.updated_at).toFormat("LLL dd, yyyy")}</td>
                                                <td className="align-middle" style={{ textAlign: "center" }}>{item.created_by}</td>



                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            <Card.Footer className="text-center m-3">
                                {adminPage.current > 1 ?
                                    <button style={{ textAlign: "right", color: "blue", border: "none", backgroundColor: "white" }} onClick={adminhandleBackPage}><GrFormPrevious />Back </button>
                                    : ""}


                                &nbsp;
                                {state.allAdminuser.length == 5 ?
                                    <button style={{ textAlign: "right", color: "blue", border: "none", backgroundColor: "white" }} onClick={adminhandlePage}>Next <MdOutlineNavigateNext /></button>
                                    : ""}


                            </Card.Footer>
                        </Tab>

                        <Tab eventKey="employee" title="Employee">
                            <Table responsive className="text-nowrap mb-0">
                                <thead className="table-light">
                                    <tr >
                                        <th>#</th>
                                        {/* <th>Action</th> */}
                                        <th>Status</th>
                                        <th>Employee ID</th>

                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone No.</th>
                                        <th>Gender</th>
                                        <th>Created At</th>
                                        <th>Updated At</th>
                                        {/* <th>Task</th> */}
                                        <th>Created By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.getcompanyemployee.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="align-middle">{index + 1}</td>
                                                {/* <td className="align-middle" style={{ textAlign: "center" }} >
                                        <FaEdit style={{ color: "orange", marginRight: "10px", cursor: "pointer" }} />
                                        <MdDeleteForever style={{ color: "red" }} />
                                    </td> */}

                                                <td className="align-middle" style={{ fontFamily: "bold", textAlign: "center" }} >
                                                    {item.employee_status == 6 ? <FaCheck style={{ color: "green" }} /> : <p style={{ color: "red", alignItems: "center" }}>Blocked</p>}


                                                </td>
                                                <td className="align-middle">{item.employee_id}</td>
                                                <td className="align-middle">{item.first_name} {item.last_name}</td>
                                                <td className="align-middle">{item.email}</td>
                                                <td className="align-middle">{item.phone.replace(re, (_, a, b, c, d) => `${a} (${b}) ${c}-${d}`)}</td>
                                                <td className="align-middle">{item.gender}</td>
                                                <td className="align-middle" style={{ textAlign: "center" }}>{DateTime.fromISO(item.created_at).toFormat("LLL dd, yyyy")}</td>
                                                <td className="align-middle" style={{ textAlign: "center" }}>{DateTime.fromISO(item.updated_at).toFormat("LLL dd, yyyy")}</td>
                                                <td className="align-middle" style={{ textAlign: "center" }}>{item.created_by}</td>

                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            <Card.Footer className="text-center m-3">
                                {empPage.current > 1 ?
                                    <button style={{ textAlign: "right", color: "blue", border: "none", backgroundColor: "white" }} onClick={emphandleBackPage}><GrFormPrevious />Back </button>
                                    : ""}


                                &nbsp;
                                {state.getcompanyemployee.length == 5 ?
                                    <button style={{ textAlign: "right", color: "blue", border: "none", backgroundColor: "white" }} onClick={emphandlePage}>Next <MdOutlineNavigateNext /></button>
                                    : ""}


                            </Card.Footer>
                        </Tab>

                        <Tab eventKey="reports" title="Reports" >
                            <Table responsive className="text-nowrap mb-0 ">
                                <thead className="table-light">
                                    <tr style={{ textAlign: "center" }}>
                                        <th>#</th>
                                        <th>Employee ID</th>
                                        <th>Employee Name</th>
                                        <th>Work Duration</th>
                                        <th>Check-in Date</th>
                                        <th>Check-in Time</th>
                                        <th>Check-in Location</th>
                                        <th>Check-out Date</th>
                                        <th>Check-out Time</th>
                                        <th>Check-out Location</th>

                                    </tr>
                                </thead>

                                {state.employeeTaskOfSingleCompany.length ?

                                    <tbody>
                                        {state.employeeTaskOfSingleCompany.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="align-middle">{index + 1}</td>
                                                    <td className="align-middle" style={{ textAlign: "center" }}><b>{item.employee_id}</b></td>
                                                    <td className="align-middle" style={{ textAlign: "center" }}>{item.user_id}</td>
                                                    <td className="align-middle" style={{ textAlign: "center" }}>{item.work_duration}</td>
                                                    <td className="align-middle" style={{ textAlign: "center", color: "black" }}>{DateTime.fromISO(item.checked_in_at).toFormat('LLL dd, yyyy')}</td>
                                                    <td className="align-middle" style={{ color: "black", textAlign: "center" }}>{DateTime.fromISO(item.checked_in_at).toFormat("hh:mm a")}</td>
                                                    <td className="align-middle" style={{ color: "black" }}>{item.checked_in_location}</td>
                                                    <td className="align-middle" style={{ color: "black" }}>{DateTime.fromISO(item.checked_out_at).toFormat('LLL dd, yyyy')}</td>
                                                    <td className="align-middle" style={{ color: "black", textAlign: "center" }}>{DateTime.fromISO(item.checked_out_at).toFormat("hh:mm a")}</td>
                                                    <td className="align-middle" style={{ color: "black" }}>{item.checked_out_location}</td>
                                                </tr>

                                            )
                                        })}
                                    </tbody>

                                    :

                                    <div>
                                        <p>No record found!</p>
                                    </div>

                                }




                            </Table>
                            <Card.Footer className="text-center m-3">
                                {empTaskPage.current > 1 ?
                                    <button style={{ textAlign: "right", color: "blue", border: "none", backgroundColor: "white" }} onClick={handleBackPage}><GrFormPrevious />Back </button>
                                    : ""} &nbsp;

                                {state.employeeTaskOfSingleCompany.length == 10 ?
                                    <button style={{ textAlign: "right", color: "blue", border: "none", backgroundColor: "white" }} onClick={handlePage}>Next <MdOutlineNavigateNext /></button>
                                    : ""}
                            </Card.Footer>
                        </Tab>
                    </Tabs>
                </Row>

            </Container>

        </Fragment>
    )
}

export default companydetails