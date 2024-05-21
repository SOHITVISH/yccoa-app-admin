
// import { ActiveProjects, Teams, TasksPerformance } from "sub-components"; 
import React, { useContext, useEffect, useState } from 'react'
import { Fragment } from "react";
import { Context as AuthContext } from "../contextApi/AuthContext.js";
import { Container, Col, Row } from 'react-bootstrap';
import { Form, Button, Image } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { instance } from 'api/baseurl.js';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const Addnewuser = () => {
    const router = useRouter()

    const { addEmployee, state } = useContext(AuthContext)
    console.log(state, "_______________________stateeeeeeeeToday");
    const [first_name, setFirstName] = useState()
    const [last_name, setLastName] = useState()
    const [email, setEmail] = useState()
    // const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [phone, setPhone] = useState()
    const [gender, setGender] = useState()
    const [city, setCity] = useState()
    const [change, setChange] = useState(false)
    const [employee_status, setEmployeeStatus] = useState(6)

    let userAdminID = Cookies.get('user_id');


    useEffect(() => {
        let isAuth = localStorage.getItem('token');
        if (!isAuth) {
            router.push("/")
        }
    }, []);

    const onClick = async () => {
        if (!first_name && !last_name && !email && !phone && !gender) {
            toast.warning("All fields is required")
            return
        }

        if (!first_name) {
            toast.warning("First name is required")
            return
        }

        if (!email) {
            toast.warning("Email is required")
            return
        }
        if (!email.trim().match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/gm)) {
            toast.warning("Please provide a valid email")

            return
        }

        if (!last_name) {
            toast.warning("Last name is required")
            return
        }


        if (!gender) {
            toast.warning("Gender is required")
            return
        }
        try {

            let response = await instance.post("/createemployee", { id: userAdminID, first_name: first_name, last_name: last_name, email: email, gender: gender, phone: phone, city: city, employee_status: employee_status });
            // addEmployee({ id: userAdminID, first_name: first_name, last_name: last_name, email: email, gender: gender, phone: phone, city: city, employee_status: employee_status })


            loadData()
            router.push("/employee")


        } catch (error) {

            console.log(error);
            toast.error(error?.response.data.message)


        }
    };
    function loadData() {
        setLoading({ loading: true })

        setTimeout(() => {
            setLoading({ loading: false });
        }, 5000);
    }


    const handleback = async () => {
        router.push("/employee")
    }
    return (
        <Fragment>
            <div className="bg-success pt-10 pb-21"></div>
            <ToastContainer
                position="top-right"
                hideProgressBar

            />
            <Container fluid className="mt-n18 px-6 ">
                <Row>
                    <Col lg={12} md={12} xs={12}>

                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-22">
                                    <h3 className="mb-0  text-white">Create New employee</h3>
                                </div>
                                <div className="mb-2 mb-lg-22">
                                    <p style={{ color: "white", cursor: "pointer" }} onClick={handleback}   ><IoMdArrowRoundBack style={{ fontSize: "25px" }} />Back</p>
                                </div>

                            </div>
                        </div>
                    </Col>

                </Row>

                <Row className='mt-15 mt-md-0'>
                    <Form >
                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" htmlFor="gender">
                                Status
                            </Form.Label>
                            <Col md={8} xs={12}>
                                <div style={{ display: "flex", gap: 10 }}  >
                                    <div>
                                        <input type="radio" id="active" name="employee_status" defaultChecked value={6} onChange={e => setEmployeeStatus(e.target.value)} />&nbsp;
                                        <label for="active">Active</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="block" name="employee_status" value={8} onChange={e => setEmployeeStatus(e.target.value)} />&nbsp;
                                        <label for="blocked">Blocked</label>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <label
                                htmlFor="fullName"
                                className="col-sm-4 col-form-label
                    form-label"
                            >
                                Full name
                            </label>
                            <div className="col-sm-4 mb-3 mb-lg-0">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First name"
                                    value={first_name}
                                    onChange={e => setFirstName(e.target.value)}
                                    id="fullName"
                                    required
                                />
                            </div>
                            <div className="col-sm-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last name"
                                    value={last_name}
                                    onChange={e => setLastName(e.target.value)}
                                    id="lastName"
                                    required
                                />
                            </div>
                        </Row>

                        <Row className="mb-3">
                            <label
                                htmlFor="email"
                                className="col-sm-4 col-form-label
                    form-label"
                            >
                                Email
                            </label>
                            <div className="col-md-8 col-12">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    id="email"
                                    required
                                />
                            </div>
                        </Row>

                        {/* {change == "admin" ?  */}
                        {/* <Row className="mb-3">
                            <label
                                htmlFor="password"
                                className="col-sm-4 col-form-label
                    form-label"
                            >
                                Password
                            </label>
                            <div className="col-md-8 col-12">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    id="password"
                                    required
                                />
                            </div>
                        </Row> */}
                        {/*  :
                             "" */}


                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" htmlFor="gender">
                                Gender
                            </Form.Label>
                            <Col md={8} xs={12}>
                                <div style={{ display: "flex", gap: 10 }}  >
                                    <div>
                                        <input type="radio" id="male" name="gender" value={"Male"} onChange={e => setGender(e.target.value)} />&nbsp;
                                        <label for="male">Male</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="female" name="gender" value={"Female"} onChange={e => setGender(e.target.value)} />&nbsp;
                                        <label for="female">Female</label>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" htmlFor="phone">
                                City
                            </Form.Label>
                            <Col md={8} xs={12}>
                                <select class="form-select" onChange={(e) => { setCity(e.target.value) }}>
                                    <option selected>-- select city --</option>
                                    <option value="York County">York County</option>
                                    <option value="Chester County">Chester County</option>

                                </select>
                            </Col>
                        </Row>

                        {/* <Row className="mb-3">
                            <Form.Label className="col-sm-4" htmlFor="phone">
                                Phone <span className="text-muted">(Optional)</span>
                            </Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Phone"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    id="phone"
                                />
                            </Col>
                        </Row> */}
                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" >
                                Phone <span className="text-muted">(Optional)</span>
                            </Form.Label>
                            <Col md={8} xs={12}>
                                <PhoneInput className='form-control'

                                    defaultCountry="US"
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={setPhone} />
                            </Col>
                        </Row>



                        {/* <Row className="mb-3" style={{ marginTop: "50px" }}>
                            <Form.Label className="col-sm-4" htmlFor="gender">

                            </Form.Label>
                            <Col md={8} xs={12}>

                                <div>
                                    <input type="checkbox" id="admin" name="drone" value="admin" />&nbsp;
                                    <label for="admin">Yes, as a Admin</label>
                                </div>

                            </Col>
                        </Row> */}


                        <Row className="align-items-center">

                            <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-1 mb-5">
                                <Button variant="success" onClick={onClick}>
                                    {loading ? "Please wait..." : "Submit"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>




            </Container>


        </Fragment>
    )
}

export default Addnewuser