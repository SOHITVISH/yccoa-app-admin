
import Link from 'next/link';
import { ProgressBar, Col, Row, Form, Card, Table, Image } from 'react-bootstrap';
import { Context as AuthContext } from "../../contextApi/AuthContext.js";
import { useContext, useEffect, useRef, useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/router";
import { DateTime } from 'luxon';
import Cookies from "js-cookie";
import bcrypt from "bcryptjs"
import { MdLockReset } from "react-icons/md";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdRestore } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ImSearch } from "react-icons/im";
import { instance } from 'api/baseurl.js';
import { MdRefresh } from "react-icons/md";
const ActiveAdminUser = () => {
    const [searchdata, setSearchData] = useState([])
    const [searchTerm, setsearchTerm] = useState()
    const [search, setSearch] = useState(false)
    const router = useRouter()
    const { getAllAdminuser, adminRestore, userAdminDelete, state } = useContext(AuthContext)

    const adminPage = useRef(1)
    let companyID = Cookies.get('user_id');


    useEffect(() => {
        let isAuth = localStorage.getItem('token');
        if (!isAuth) {
            router.push("/")
        }
    }, []);

    useEffect(() => {
        if (router.isReady) {

            getAllAdminuser({ company_id: companyID })

        }

    }, [router]);


    const handlePage = () => {

        if (state.allAdminuser.length < state.getuseradmincount) {
            getAllAdminuser({ company_id: companyID, page: adminPage.current += 1 })
            // getAllEmployee({ id: userAdminID, page: empPage.current += 1 })
        }


    }

    const handleBackPage = () => {
        if ((state.allAdminuser.length <= state.getuseradmincount) && state.getuseradmincount != 0) {

            getAllAdminuser({ company_id: companyID, page: adminPage.current -= 1, })
            // getAllEmployee({ id: userAdminID, page: empPage.current -= 1, })

        }
    }


    const handleRestore = async (id) => {
        let isConfirm = confirm("Are you sure want to restore admin")
        if (isConfirm) {
            adminRestore({ id, oldadminlist: state.allAdminuser })
        }

    }


    const handleDelete = async (id) => {
        let isConfirm = confirm("Are you sure want to delete user admin")
        if (isConfirm) {
            userAdminDelete({ id, oldadminlist: state.allAdminuser })
        }



    }

    const handleEdit = async (id) => {
        router.push({ pathname: "/updateadminuser", query: { id } })
    }

    const handlePassword = async (id) => {
        router.push({ pathname: "/resetpassword", query: { id } })
    }

    const handleSearch = async () => {

        try {
            setSearch(true)

            let response = await instance.post("/searchcompanyadmin", { searchTerm }, { headers: { "Content-Type": "application/json" } });

            setSearchData(response.data.result)

        } catch (error) {

            console.log(error);

        }
    };

    const handleRefresh = async () => {

        try {
            setSearch(false)
            setsearchTerm('')
            getAllAdminuser({ company_id: companyID })

        } catch (error) {
            console.log(error);
        }
    }


    let re = /(\d{1})(\d{3})(\d{3})(\d{4})/;

    return (
        <Row className="mt-6">
            <Col md={12} xs={12}>
                <Card>
                    <Card.Header className="bg-white  d-flex justify-content-between">
                        <div className="bg-white d-flex justify-content-between align-center">

                            <h4 className="mb-0 mt-2">Admin <span>{search ? <MdRefresh style={{ fontSize: "20px", color: "blue", cursor: "pointer" }} onClick={handleRefresh} /> : ""}</span> </h4>


                        </div>
                        <div className="ms-lg-3 d-none d-md-none d-lg-block">

                            <Form className="d-flex align-items-center">
                                <Form.Control
                                    value={searchTerm}
                                    fullWidth
                                    onChange={(e) => { setsearchTerm(e.target.value) }}
                                    type="search"
                                    placeholder="Search" />
                                <ImSearch style={{ marginLeft: "5px", fontSize: "20px", cursor: "pointer" }} onClick={handleSearch} />
                            </Form>

                        </div>
                    </Card.Header>
                    <Table responsive className="text-nowrap mb-0">
                        <thead className="table-light">
                            <tr style={{ textAlign: "center" }}>
                                <th>#</th>
                                <th>Actions</th>
                                <th>Status</th>
                                <th>Admin ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone No.</th>
                                <th>Gender</th>
                                <th>Reset Password</th>
                                <th>CreatedAt</th>
                                <th>UpdatedAt</th>
                                <th>CreatedBy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {search ?

                                (searchdata.length ? (searchdata.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="align-middle">{index + 1}</td>
                                            <td className="align-middle" style={{ textAlign: "center" }} >

                                                {item.isUserAdminDeleted == false ? <FaEdit style={{ color: "orange", marginRight: "10px", cursor: "pointer" }} onClick={() => handleEdit(item._id)} /> : ""}

                                                {/* <MdDeleteForever style={{ color: "red", cursor:"pointer" }} onClick={() => handleDelete(item._id)} /> */}
                                                {item.isUserAdminDeleted == false ? <MdDeleteForever style={{ color: "red", cursor: "pointer" }} onClick={() => handleDelete(item._id)} /> : <MdRestore style={{ color: "#000080", cursor: "pointer", fontSize: "20px" }} onClick={() => handleRestore(item._id)} />}


                                            </td>
                                            <td style={{ fontFamily: "bold", textAlign: "center" }}>
                                                {item.user_admin_status == 4 ? <FaCheck style={{ color: "green", alignItems: "center" }} /> : <p style={{ color: "red", fontSize: "15px", margin: "10px", fontFamily: "bold" }}>Blocked</p>}
                                            </td>
                                            <td className="align-middle">{item.admin_id}</td>
                                            <td className="align-middle">{`${item.first_name} ${item.last_name}`}</td>
                                            <td className="align-middle">{item.email}</td>
                                            {/* <td className="align-middle">{item.phone}</td> */}
                                            <td className="align-middle">{item.phone.replace(re, (_, a, b, c, d) => `${a} (${b}) ${c}-${d}`)}</td>
                                            {/* <td className="align-middle">{`${item.phone.substring(0, 2)} ${item.phone.substring(3, 6)} ${item.phone.substring(6, item.phone.length)}`}</td> */}
                                            <td className="align-middle">{item.gender}</td>
                                            <td className="align-middle" style={{ textAlign: "center" }} >
                                                {item.isUserAdminDeleted == false && item.user_admin_status == 4 ? <MdLockReset style={{ cursor: "pointer", fontSize: "18px", color: "green" }} onClick={() => handlePassword(item._id)} /> : <IoMdCloseCircleOutline style={{ fontSize: "18px", color: "red" }} />}

                                            </td>

                                            <td className="align-middle">{DateTime.fromISO(item.created_at).toFormat("LLL dd, yyyy")}</td>
                                            <td className="align-middle">{DateTime.fromISO(item.updated_at).toFormat("LLL dd, yyyy")}</td>
                                            <td className="align-middle">{item.created_by}</td>


                                        </tr>
                                    )
                                })) : < div style={{ textAlign: "center" }}>
                                    <p className='mx-5 mt-5 text-danger'>No results found for - {searchTerm}</p>
                                </div>)

                                :
                                (state.allAdminuser.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="align-middle">{index + 1}</td>
                                            <td className="align-middle" style={{ textAlign: "center" }} >

                                                {item.isUserAdminDeleted == false ? <FaEdit style={{ color: "orange", marginRight: "10px", cursor: "pointer" }} onClick={() => handleEdit(item._id)} /> : ""}

                                                {/* <MdDeleteForever style={{ color: "red", cursor:"pointer" }} onClick={() => handleDelete(item._id)} /> */}
                                                {item.isUserAdminDeleted == false ? <MdDeleteForever style={{ color: "red", cursor: "pointer" }} onClick={() => handleDelete(item._id)} /> : <MdRestore style={{ color: "#000080", cursor: "pointer", fontSize: "20px" }} onClick={() => handleRestore(item._id)} />}


                                            </td>
                                            <td style={{ fontFamily: "bold", textAlign: "center" }}>
                                                {item.user_admin_status == 4 ? <FaCheck style={{ color: "green", alignItems: "center" }} /> : <p style={{ color: "red", fontSize: "15px", margin: "10px", fontFamily: "bold" }}>Blocked</p>}
                                            </td>
                                            <td className="align-middle">{item.admin_id}</td>
                                            <td className="align-middle">{`${item.first_name} ${item.last_name}`}</td>
                                            <td className="align-middle">{item.email}</td>
                                            {/* <td className="align-middle">{item.phone}</td> */}
                                            <td className="align-middle">{item.phone.replace(re, (_, a, b, c, d) => `${a} (${b}) ${c}-${d}`)}</td>
                                            {/* <td className="align-middle">{`${item.phone.substring(0, 2)} ${item.phone.substring(3, 6)} ${item.phone.substring(6, item.phone.length)}`}</td> */}
                                            <td className="align-middle">{item.gender}</td>
                                            <td className="align-middle" style={{ textAlign: "center" }} >
                                                {item.isUserAdminDeleted == false && item.user_admin_status == 4 ? <MdLockReset style={{ cursor: "pointer", fontSize: "18px", color: "green" }} onClick={() => handlePassword(item._id)} /> : <IoMdCloseCircleOutline style={{ fontSize: "18px", color: "red" }} />}

                                            </td>

                                            <td className="align-middle">{DateTime.fromISO(item.created_at).toFormat("LLL dd, yyyy")}</td>
                                            <td className="align-middle">{DateTime.fromISO(item.updated_at).toFormat("LLL dd, yyyy")}</td>
                                            <td className="align-middle">{item.created_by}</td>


                                        </tr>
                                    )
                                }))
                            }

                        </tbody>
                    </Table>
                    <Card.Footer className="bg-white text-center">
                        {adminPage.current > 1 ?
                            <button style={{ textAlign: "right", color: "blue", border: "none" }} onClick={handleBackPage}><GrFormPrevious />Back </button>
                            : ""}


                        &nbsp;
                        {state.allAdminuser.length == 5 ?
                            <button style={{ textAlign: "right", color: "blue", border: "none" }} onClick={handlePage}>Next <MdOutlineNavigateNext /></button>
                            : ""}


                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}

export default ActiveAdminUser





