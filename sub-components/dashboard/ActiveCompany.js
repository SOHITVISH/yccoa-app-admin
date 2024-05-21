
import Link from 'next/link';
import { ProgressBar, Col, Row, Card, Table, Form, Image, Button, Dropdown } from 'react-bootstrap';
import { Context as AuthContext } from "../../contextApi/AuthContext.js";
import { useContext, useEffect, useRef, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx"
import { useRouter } from "next/router";
import { DateTime } from 'luxon';
import { BsFillInfoSquareFill } from "react-icons/bs";
import { MdLockReset } from "react-icons/md";
import Popovers from "../../pages/components/popovers.js"
import { MdRestore } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ImSearch } from "react-icons/im";
import { instance } from 'api/baseurl.js';
import { MdRefresh } from "react-icons/md";

const ActiveCompany = () => {
    const [searchdata, setSearchData] = useState([])
    const [searchTerm, setsearchTerm] = useState()
    const [search, setSearch] = useState(false)
    const router = useRouter()
    const { getAllCompany, companyRestore, getAllAdminuser, companyDelete, allEmployeeOfCompany, state } = useContext(AuthContext)
    const { upadteStatus, setUpdateStatus } = useState()
    const companyPage = useRef(1)
    const [open, setOpen] = useState(false);


    useEffect(() => {
        let isAuth = localStorage.getItem('token');
        if (!isAuth) {
            router.push("/")
        }
    }, []);

    useEffect(() => {

        if (router.isReady) {
            getAllCompany({})
            // allEmployeeOfCompany({ id: state.allCompany._id })
            // getAllAdminuser({ company_id: state.allCompany._id })
            // console.log(state.allCompany[0]._id,"___________iiiii");
        }

    }, [router, state])

    // const handlePage = () => {

    //     if (state.allCompany.length < state.allcompanycount) {
    //         getAllCompany({ page: companyPage.current += 1 })
    //         // getAllEmployee({ id: userAdminID, page: empPage.current += 1 })
    //     }


    // }

    // const handleBackPage = () => {
    //     if ((state.allCompany.length <= state.allcompanycount) && state.allcompanycount != 0) {

    //         getAllCompany({ page: companyPage.current -= 1, })
    //         // getAllEmployee({ id: userAdminID, page: empPage.current -= 1, })

    //     }
    // }



    const handleEdit = async (id) => {
        router.push({ pathname: "/updateCompany", query: { id } })
    }

    const handlePassword = async (id) => {
        router.push({ pathname: "/resetpassword", query: { id } })
    }

    const handleDelete = async (id) => {
        let isConfirm = confirm("Are you sure want to delete company")
        if (isConfirm) {
            companyDelete({ id, oldcompanylist: state.allCompany })
        }


    }


    const handleRestore = async (id) => {
        let isConfirm = confirm("Are you sure want to restore company")
        if (isConfirm) {
            companyRestore({ id, oldcompanylist: state.allCompany })
        }



    }

    const handleInfo = async (id) => {
        router.push({ pathname: "/companydetails", query: { id } })
    }

    const handleSearch = async () => {

        try {
            setSearch(true)

            let response = await instance.post("/searchcompany", { searchTerm }, { headers: { "Content-Type": "application/json" } });

            setSearchData(response.data.result)
            console.log(response.data.result, "____________________resssssssss");
        } catch (error) {

            console.log(error);

        }
    };

    const handleRefresh = async () => {

        try {
            setSearch(false)
            setsearchTerm('')
            getAllCompany({})

        } catch (error) {

        }
    }



    return (

        <>


            <Row className="mt-6">
                <Col md={12} xs={12}>
                    <Card>
                        <Card.Header className="bg-white  d-flex justify-content-between">
                            <div className="bg-white d-flex justify-content-between align-center">

                                <h4 className="mb-0 mt-2">Company <span>{search ? <MdRefresh style={{ fontSize: "20px", color: "blue", cursor: "pointer" }} onClick={handleRefresh} /> : ""}</span> </h4>


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
                                <tr >
                                    <th>#</th>
                                    <th>Action</th>
                                    <th>Status</th>
                                    <th>Company name</th>
                                    <th>Email</th>
                                    <th>Details</th>
                                    <th>Reset Password</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Created By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {search ?
                                    (searchdata.length ?
                                        (searchdata.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="align-middle">{index + 1}</td>
                                                    <td className="align-middle" style={{ textAlign: "center" }} >

                                                        {item.isCompanyDeleted ? false : <FaEdit style={{ color: "orange", marginRight: "10px", cursor: "pointer" }} onClick={() => handleEdit(item._id)} />}
                                                        {item.isCompanyDeleted == false ? <MdDeleteForever style={{ color: "red", cursor: "pointer" }} onClick={() => handleDelete(item._id)} /> : <MdRestore style={{ color: "#000080", cursor: "pointer", fontSize: "20px" }} onClick={() => handleRestore(item._id)} />}

                                                        {/* <MdDeleteForever style={{ color: "red" }} onClick={() => handleDelete(item._id)} /> */}
                                                    </td>

                                                    <td className="align-middle" style={{ textAlign: "center" }} >


                                                        {item.company_status == 1 ? <FaCheck style={{ color: "green" }} /> : <p style={{ color: "red", fontSize: "15px", margin: "10px", fontFamily: "bold" }}>Blocked</p>}


                                                    </td>
                                                    <td className="align-middle">{item.company_name}</td>
                                                    <td className="align-middle">{item.email}</td>
                                                    <td className="align-middle" >
                                                        {item.isCompanyDeleted == false && item.company_status == 1 ?
                                                            <BsFillInfoSquareFill style={{ textAlign: "center", cursor: "pointer" }} onClick={() => handleInfo(item._id)} /> : <IoMdCloseCircleOutline style={{ fontSize: "18px", color: "red" }} />} </td>

                                                    <td className="align-middle" style={{ textAlign: "center" }} >

                                                        {item.isCompanyDeleted == false && item.company_status == 1 ?
                                                            <MdLockReset style={{ cursor: "pointer", fontSize: "18px", color: "green" }} onClick={() => handlePassword(item._id)} />
                                                            : <IoMdCloseCircleOutline style={{ fontSize: "18px", color: "red" }} />}


                                                    </td>



                                                    <td className="align-middle">{DateTime.fromISO(item.created_at).toFormat("LLL dd, yyyy")}</td>
                                                    <td className="align-middle" style={{ textAlign: "center" }}>{DateTime.fromISO(item.updated_at).toFormat("LLL dd, yyyy")}</td>
                                                    <td className="align-middle" style={{ textAlign: "center" }}>{item.created_by}</td>
                                                    {/* <td className="align-middle"><span className={`badge bg-${item.updatedAt}`}>{item.updatedBy}</span></td> */}


                                                </tr>
                                            )
                                        })) :
                                        < div style={{ textAlign: "center" }}>
                                            <p className='mx-5 mt-5 text-danger'>No results found for - {searchTerm}</p>
                                        </div>)


                                    :
                                    (state.allCompany.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="align-middle">{index + 1}</td>
                                                <td className="align-middle" style={{ textAlign: "center" }} >

                                                    {item.isCompanyDeleted ? false : <FaEdit style={{ color: "orange", marginRight: "10px", cursor: "pointer" }} onClick={() => handleEdit(item._id)} />}
                                                    {item.isCompanyDeleted == false ? <MdDeleteForever style={{ color: "red", cursor: "pointer" }} onClick={() => handleDelete(item._id)} /> : <MdRestore style={{ color: "#000080", cursor: "pointer", fontSize: "20px" }} onClick={() => handleRestore(item._id)} />}

                                                    {/* <MdDeleteForever style={{ color: "red" }} onClick={() => handleDelete(item._id)} /> */}
                                                </td>

                                                <td className="align-middle" style={{ textAlign: "center" }} >


                                                    {item.company_status == 1 ? <FaCheck style={{ color: "green" }} /> : <p style={{ color: "red", fontSize: "15px", margin: "10px", fontFamily: "bold" }}>Blocked</p>}


                                                </td>
                                                <td className="align-middle">{item.company_name}</td>
                                                <td className="align-middle">{item.email}</td>
                                                <td className="align-middle" >
                                                    {item.isCompanyDeleted == false && item.company_status == 1 ?
                                                        <BsFillInfoSquareFill style={{ textAlign: "center", cursor: "pointer" }} onClick={() => handleInfo(item._id)} /> : <IoMdCloseCircleOutline style={{ fontSize: "18px", color: "red" }} />} </td>

                                                <td className="align-middle" style={{ textAlign: "center" }} >

                                                    {item.isCompanyDeleted == false && item.company_status == 1 ?
                                                        <MdLockReset style={{ cursor: "pointer", fontSize: "18px", color: "green" }} onClick={() => handlePassword(item._id)} />
                                                        : <IoMdCloseCircleOutline style={{ fontSize: "18px", color: "red" }} />}


                                                </td>



                                                <td className="align-middle">{DateTime.fromISO(item.created_at).toFormat("LLL dd, yyyy")}</td>
                                                <td className="align-middle" style={{ textAlign: "center" }}>{DateTime.fromISO(item.updated_at).toFormat("LLL dd, yyyy")}</td>
                                                <td className="align-middle" style={{ textAlign: "center" }}>{item.created_by}</td>
                                                {/* <td className="align-middle"><span className={`badge bg-${item.updatedAt}`}>{item.updatedBy}</span></td> */}


                                            </tr>
                                        )
                                    }))}

                            </tbody>
                        </Table>

                        {/* <Card.Footer className="bg-white text-center">
                            {companyPage.current > 1 ?
                                <button style={{ textAlign: "right", color: "blue", border: "none" }} onClick={handleBackPage}><GrFormPrevious />Back </button>
                                : ""}


                            &nbsp;
                            {state.allCompany.length == 10 ?
                                <button style={{ textAlign: "right", color: "blue", border: "none" }} onClick={handlePage}>Next <MdOutlineNavigateNext /></button>
                                : ""}


                        </Card.Footer> */}




                    </Card>
                </Col>





            </Row>





        </>




    )
}

export default ActiveCompany