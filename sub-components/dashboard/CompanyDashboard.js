
import Link from 'next/link';
import { ProgressBar, Col, Row, Card, Table, Image } from 'react-bootstrap';
import { Context as AuthContext } from "../../contextApi/AuthContext.js";
import { useContext, useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md"
import { useRouter } from "next/router";

const CompanyDashboard = () => {
    const { getAllCompany, updateCompantStatus, state } = useContext(AuthContext)
    const { upadteStatus, setUpdateStatus } = useState()
    const router = useRouter()

    useEffect(() => {
        getAllCompany()
    }, [])

    useEffect(() => {
        let isAuth = localStorage.getItem('token');
        if (!isAuth) {
            router.push("/")
        }
    }, []);
    // const handleClick = async () => {
    //     alert("Are you sure want to update status")
    //     updateCompantStatus({ company_id: state.allCompany[0]._id, currentStatus: 3 })
    //     console.log(state.allCompany, "_________________allData");
    // };

    // const handleEdit = async (id) => {
    //     alert("Are you sure want to update")
    //     console.log(id, "+++++++++");
    //     router.push({ pathname: "/updateCompany", query: { id } })
    // }


    return (
        <Row className="mt-6">
            <Col md={12} xs={12}>
                <Card>
                    <Card.Header className="bg-white  py-4">
                        <h4 className="mb-0">Company</h4>
                    </Card.Header>
                    <Table responsive className="text-nowrap mb-0">
                        <thead className="table-light">
                            <tr >
                                <th>#</th>
                                
                                {/* <th>Status</th> */}
                                <th>Company name</th>
                                <th>Email</th>

                                <th>Created At</th>

                                <th>Created By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.allCompany.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="align-middle">{index + 1}</td>
                                        {/* <td className="align-middle" style={{ textAlign: "center" }} >
                                            <FaEdit style={{ color: "orange", marginRight: "10px", cursor: "pointer" }} onClick={() => handleEdit(item._id)} />
                                            <MdDeleteForever style={{ color: "red" }} />
                                        </td> */}
                                        {/* <td className="align-middle" style={{ fontFamily: "bold", textAlign: "center", cursor: "pointer" }} >{item.company_status == 2 ? <FaCheck style={{ color: "green" }} /> : <MdOutlineCancel style={{ color: "red" }} />}</td> */}
                                        <td className="align-middle">{item.company_name}</td>
                                        <td className="align-middle">{item.email}</td>



                                        <td className="align-middle">{item.created_at}</td>

                                        <td className="align-middle" style={{ textAlign: "center" }}>{item.updated_by}</td>
                                        {/* <td className="align-middle"><span className={`badge bg-${item.updatedAt}`}>{item.updatedBy}</span></td> */}
                                        {/* <td className="align-middle">
                                             <div className="avatar-group">
                                                {item.members.map((avatar, avatarIndex) => {
                                                    return (
                                                        <span className="avatar avatar-sm" key={avatarIndex}>
                                                            <Image alt="avatar" src={avatar.image} className="rounded-circle" />
                                                        </span>
                                                    )
                                                })}
                                                <span className="avatar avatar-sm avatar-primary">
                                                    <span className="avatar-initials rounded-circle fs-6">+5</span>
                                                </span>
                                            </div> 
                                        </td> */}
                                        {/* <td className="align-middle text-dark">
                                            <div className="float-start me-3">{item.progress}%</div>
                                            <div className="mt-2">
                                                <ProgressBar now={item.progress} style={{ height: '5px' }} />
                                            </div> 
                                        </td> */}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Card.Footer className="bg-white text-center">
                        {/* <Link href="#" className="link-success">View All Company</Link> */}
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}

export default CompanyDashboard