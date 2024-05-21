
import Link from 'next/link';
import Cookies from "js-cookie";
import { ProgressBar, Col, Row, Card, Table, Image } from 'react-bootstrap';
import { Context as AuthContext } from "../../contextApi/AuthContext.js";
import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from "next/router";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const EmployeeReports = () => {
    const router = useRouter()
    const { getAllTask, employeeTaskOfSingleCompany, state } = useContext(AuthContext)
    const [next, setNext] = useState(false)
    const [page, setPage] = useState(1)
    const reporttaskPage = useRef(1)


    let ID = Cookies.get('user_id');
    console.log(ID, "____________________ddd");
    useEffect(() => {

        if (router.isReady) {

     
            // console.log(state.alltask.length, "___________________reportTask");
        }

    }, [router])
    // const handlePage = () => {
    //     if (state.alltask.length < state.reportTaskCount) {
    //         console.log(reporttaskPage, "________________________ppppppppp");
    //         getAllTask({ page: reporttaskPage.current += 1, })
    //     }
    //     // reporttaskPage.current += 1;


    // }

    // const handleBackPage = () => {
    //     if ((state.alltask.length <= state.reportTaskCount) && state.reportTaskCount != 0) {

    //         getAllTask({ page: reporttaskPage.current -= 1, })
    //         console.log(reporttaskPage, "________________________bbbbbbbbbbbbbbb");
    //     }
    // reporttaskPage.current += 1;


    // }

    useEffect(() => {
        let isAuth = localStorage.getItem('token');
        if (!isAuth) {
            router.push("/")
        }
    }, []);



    return (
        <Row className="mt-6">
            <Col md={12} xs={12}>
                <Card>
                    <Card.Header className="bg-white  py-4">
                        <h4 className="mb-0">Reports</h4>
                    </Card.Header>
                    <Table responsive className="text-nowrap mb-0">
                        <thead className="table-light">
                            <tr style={{ textAlign: "center" }}>
                                <th>#</th>
                                <th>Employee ID</th>
                                <th>Check-in At</th>
                                <th>Check-out Location</th>
                                <th>Check-out At</th>
                                <th>Check-out Location</th>

                            </tr>
                        </thead>
                        <tbody>
                            {state.employeeTaskOfSingleCompany.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="align-middle">{index + 1}</td>
                                        <td className="align-middle" style={{ textAlign: "center" }}><b>{item.employee_id}</b></td>
                                        <td className="align-middle" style={{ color: "black" }}>{item.checked_in_at}</td>
                                        <td className="align-middle" style={{ color: "black" }}>{item.checked_in_location}</td>
                                        <td className="align-middle" style={{ color: "black" }}>{item.checked_out_at}</td>
                                        <td className="align-middle" style={{ color: "black" }}>{item.checked_out_location}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Card.Footer className="bg-white text-center">
                        <button style={{ textAlign: "right", color: "blue", border: "none" }} onClick={handleBackPage}><GrFormPrevious />Back </button>&nbsp;
                        <button style={{ textAlign: "right", color: "blue", border: "none" }} onClick={handlePage}>Next <MdOutlineNavigateNext /></button>

                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}

export default EmployeeReports