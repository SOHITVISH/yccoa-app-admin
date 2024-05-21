import Link from 'next/link';
import { ProgressBar, Col, Row, Form, Card, Table, Image, Dropdown, DropdownButton, Container } from 'react-bootstrap';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Context as AuthContext } from "../contextApi/AuthContext.js";
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from "next/router";
import { Briefcase } from 'react-bootstrap-icons';
import { GoDotFill } from "react-icons/go";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import Cookies from "js-cookie";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { DateTime } from 'luxon';
import { MdRestore } from "react-icons/md";
import { ImSearch } from "react-icons/im";
import { instance } from 'api/baseurl.js';
import { MdRefresh } from "react-icons/md";



const companyemployee = () => {

    const [searchdata, setSearchData] = useState([])
    const [searchTerm, setsearchTerm] = useState()
    const [search, setSearch] = useState(false)

    const router = useRouter()
    const { getAllEmployee, employeeDelete, employeeRestore, allEmployeeOfCompany, state } = useContext(AuthContext)
    const empPage = useRef(1)
    const [loading, setLoading] = useState(false)

    // let userAdminID = Cookies.get('user_id');
    let companyID = Cookies.get('user_id');

    useEffect(() => {

        if (router.isReady) {
            setLoading(true)
            // getAllEmployee({ id: userAdminID })
            allEmployeeOfCompany({ id: companyID })
            console.log(state.getcompanyemployee, "__________________hhhhhhhhhhhh");

        }
        setLoading(false)

    }, [router])
    useEffect(() => {
        let isAuth = localStorage.getItem('token');
        if (!isAuth) {
            router.push("/")
        }
    }, []);


    const handlePage = () => {

        if (state.getcompanyemployee.length < state.allEmpCount) {
            allEmployeeOfCompany({ id: companyID, page: empPage.current += 1 })
            // getAllEmployee({ id: userAdminID, page: empPage.current += 1 })
        }


    }

    const handleBackPage = () => {
        if ((state.getcompanyemployee.length <= state.allEmpCount) && state.allEmpCount != 0) {

            allEmployeeOfCompany({ id: companyID, page: empPage.current -= 1, })
            // getAllEmployee({ id: userAdminID, page: empPage.current -= 1, })

        }
    }
    const handleEdit = async (id) => {
        router.push({ pathname: "/adminupdateemployee", query: { id } })
    }

    const handleDelete = async (id) => {
        let isConfirm = confirm("Are you sure want to delete employee")
        if (isConfirm) {
            employeeDelete({ id, oldemplist: state.getcompanyemployee })
        }
    }

    const handleRestore = async (id) => {
        let isConfirm = confirm("Are you sure want to restore employee")
        if (isConfirm) {
            employeeRestore({ id, oldemplist: state.getcompanyemployee })
        }
    }
    const handleTask = async (id) => {
        console.log(id, "______________________iidd");
        router.push({ pathname: "/pages/companyemployeeprofile", query: { id } })
    }

    const handleSearch = async () => {

        try {
            setSearch(true)

            let response = await instance.post("/searchemployee", { searchTerm }, { headers: { "Content-Type": "application/json" } });

            setSearchData(response.data.result)

        } catch (error) {

            console.log(error);

        }
    };

    const handleRefresh = async () => {

        try {
            setSearch(false)
            setsearchTerm('')
            allEmployeeOfCompany({ id: companyID })

        } catch (error) {

        }
    }

    let re = /(\d{1})(\d{3})(\d{3})(\d{4})/;
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
                                    {/* <h3 className="mb-0  text-white">All Employee</h3>  */}
                                </div>
                                <div>

                                    {/* <Link href="/addnewuser" className="btn btn-white">All Employee</Link> */}
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

                <Row className="mt-6">
                    <Col md={12} xs={12}>
                        <Card>
                            <Card.Header className="bg-white  d-flex justify-content-between">
                                <div className="bg-white d-flex justify-content-between align-center">

                                    <h4 className="mb-0 mt-2">Employee <span>{search ? <MdRefresh style={{ fontSize: "20px", color: "blue", cursor: "pointer" }} onClick={handleRefresh} /> : ""}</span> </h4>


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
                                        <th>Action</th>
                                        <th>Status</th>
                                        <th>Task</th>
                                        <th>Employee ID</th>
                                        <th>Security Code</th>
                                        <th>Profile</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>Phone No.</th>
                                        <th>Created At</th>
                                        <th>Updated At</th>
                                        <th>Created By</th>

                                    </tr>
                                </thead>
                                {loading ? "Loading..." :
                                    <tbody>
                                        {search ?
                                            (searchdata.length ?
                                                (
                                                    searchdata.map((item, index) => {

                                                        return (
                                                            <tr key={index}>

                                                                <td className="align-middle">{index + 1}</td>
                                                                <td className="align-middle" style={{ textAlign: "center" }} >
                                                                    {item.isEmployeeDeleted ? false : <FaEdit style={{ color: "orange", marginRight: "10px", cursor: "pointer" }} onClick={() => handleEdit(item._id)} />}
                                                                    {item.isEmployeeDeleted == false ? <MdDeleteForever style={{ color: "red", cursor: "pointer" }} onClick={() => handleDelete(item._id)} /> : <MdRestore style={{ color: "#000080", cursor: "pointer", fontSize: "20px" }} onClick={() => handleRestore(item._id)} />}
                                                                </td>
                                                                <td className="align-middle" style={{ fontFamily: "bold", textAlign: "center" }}  >


                                                                    {item.employee_status == 6 ? <FaCheck style={{ color: "green" }} /> : <p style={{ color: "red", alignItems: "center" }}>Blocked</p>}


                                                                </td>
                                                                <td className="align-middle" style={{ textAlign: "center", cursor: "pointer" }} onClick={() => handleTask(item._id)}><Briefcase /></td>
                                                                <td className="align-middle" style={{ textAlign: "center" }} >{item.employee_id}</td>
                                                                <td className="align-middle" style={{ textAlign: "center" }}>{item.verification_code}</td>
                                                                <td className="align-middle" >
                                                                    {item.photo ?

                                                                        <Image
                                                                            src={`${item.photo}`}
                                                                            className="mb-2"
                                                                            alt=""
                                                                            width={50}
                                                                            height={50}
                                                                            onClick={() => setIsOpen(true)}
                                                                            style={{ borderRadius: "50%", cursor: "pointer" }}

                                                                        />

                                                                        :
                                                                        <Image
                                                                            src="/images/dummyimg.jpg"
                                                                            className="mb-2"
                                                                            alt=""
                                                                            width={50}
                                                                            height={50}
                                                                            style={{ borderRadius: "50%" }}
                                                                        />


                                                                    }

                                                                </td>

                                                                <td className="align-middle" style={{ textAlign: "center" }}>{item.first_name} {item.last_name}</td>
                                                                <td className="align-middle" style={{ textAlign: "center" }}>{item.email}</td>

                                                                <td className="align-middle" style={{ textAlign: "center" }}>{item.gender}</td>
                                                                <td className="align-middle">{item.phone.replace(re, (_, a, b, c, d) => `${a} (${b}) ${c}-${d}`)}</td>


                                                                <td className="align-middle" style={{ textAlign: "center" }}>{DateTime.fromISO(item.created_at).toFormat("LLL dd, yyyy")}</td>
                                                                <td className="align-middle" style={{ textAlign: "center" }}>{DateTime.fromISO(item.updated_at).toFormat("LLL dd, yyyy")}</td>
                                                                <td className="align-middle" style={{ textAlign: "center" }}>{item.created_by}</td>


                                                            </tr>
                                                        )
                                                    })
                                                ) : < div style={{ textAlign: "center" }}>
                                                    <p className='mx-5 mt-5 text-danger'>No results found for - {searchTerm}</p>
                                                </div>)



                                            :
                                            (
                                                state.getcompanyemployee.map((item, index) => {

                                                    return (
                                                        <tr key={index}>

                                                            <td className="align-middle">{index + 1}</td>
                                                            <td className="align-middle" style={{ textAlign: "center" }} >
                                                                {item.isEmployeeDeleted ? false : <FaEdit style={{ color: "orange", marginRight: "10px", cursor: "pointer" }} onClick={() => handleEdit(item._id)} />}
                                                                {item.isEmployeeDeleted == false ? <MdDeleteForever style={{ color: "red", cursor: "pointer" }} onClick={() => handleDelete(item._id)} /> : <MdRestore style={{ color: "#000080", cursor: "pointer", fontSize: "20px" }} onClick={() => handleRestore(item._id)} />}
                                                            </td>
                                                            <td className="align-middle" style={{ fontFamily: "bold", textAlign: "center" }}  >


                                                                {item.employee_status == 6 ? <FaCheck style={{ color: "green" }} /> : <p style={{ color: "red", alignItems: "center" }}>Blocked</p>}


                                                            </td>
                                                            <td className="align-middle" style={{ textAlign: "center", cursor: "pointer" }} onClick={() => handleTask(item._id)}><Briefcase /></td>
                                                            <td className="align-middle" style={{ textAlign: "center" }} >{item.employee_id}</td>
                                                            <td className="align-middle" style={{ textAlign: "center" }}>{item.verification_code}</td>
                                                            <td className="align-middle" >
                                                                {item.photo ?

                                                                    <Image
                                                                        src={`${item.photo}`}
                                                                        className="mb-2"
                                                                        alt=""
                                                                        width={50}
                                                                        height={50}
                                                                        onClick={() => setIsOpen(true)}
                                                                        style={{ borderRadius: "50%", cursor: "pointer" }}

                                                                    />

                                                                    :
                                                                    <Image
                                                                        src="/images/dummyimg.jpg"
                                                                        className="mb-2"
                                                                        alt=""
                                                                        width={50}
                                                                        height={50}
                                                                        style={{ borderRadius: "50%" }}
                                                                    />


                                                                }

                                                            </td>

                                                            <td className="align-middle" style={{ textAlign: "center" }}>{item.first_name} {item.last_name}</td>
                                                            <td className="align-middle" style={{ textAlign: "center" }}>{item.email}</td>

                                                            <td className="align-middle" style={{ textAlign: "center" }}>{item.gender}</td>
                                                            <td className="align-middle">{item.phone.replace(re, (_, a, b, c, d) => `${a} (${b}) ${c}-${d}`)}</td>


                                                            <td className="align-middle" style={{ textAlign: "center" }}>{DateTime.fromISO(item.created_at).toFormat("LLL dd, yyyy")}</td>
                                                            <td className="align-middle" style={{ textAlign: "center" }}>{DateTime.fromISO(item.updated_at).toFormat("LLL dd, yyyy")}</td>
                                                            <td className="align-middle" style={{ textAlign: "center" }}>{item.created_by}</td>


                                                        </tr>
                                                    )
                                                })
                                            )
                                        }




                                    </tbody>
                                }

                            </Table>
                            <Card.Footer className="bg-white text-center">
                                {empPage.current > 1 ?
                                    <button style={{ textAlign: "right", color: "blue", border: "none" }} onClick={handleBackPage}><GrFormPrevious />Back </button>
                                    : ""}


                                &nbsp;
                                {state.getcompanyemployee.length == 5 && empPage.current >= 1 ?
                                    <button style={{ textAlign: "right", color: "blue", border: "none" }} onClick={handlePage}>Next <MdOutlineNavigateNext /></button>
                                    : ""}


                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>


            </Container>
        </Fragment>





    )
}

export default companyemployee


