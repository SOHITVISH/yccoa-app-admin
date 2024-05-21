
// import { ActiveProjects, Teams, TasksPerformance } from "sub-components"; 
import React, { useContext, useEffect, useState } from 'react'
import { Fragment } from "react";
import { Context as AuthContext } from "../contextApi/AuthContext.js";
import { Container, Col, Row } from 'react-bootstrap';
import { Form, Button, Image } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { BiShowAlt } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { instance } from 'api/baseurl.js';
import { Border } from 'react-bootstrap-icons';
import { styles } from 'prism-react-renderer/themes/nightOwl';

const AddAdminUsers = () => {
    const router = useRouter()

    const { addAdminuser, state } = useContext(AuthContext)
    const [first_name, setFirstName] = useState()
    const [last_name, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState()
    const [gender, setGender] = useState()
    const [change, setChange] = useState(false)
    const [user_admin_status, setUserAdminStatus] = useState(4)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     console.log(state, "_______________allstate");
    // }, [state])
    useEffect(() => {
        let isAuth = localStorage.getItem('token');
        if (!isAuth) {
            router.push("/")
        }
    }, []);

    let companyID = Cookies.get('user_id');

    const onClick = async () => {
        try {

            if (!first_name && !last_name && !email && !password && !phone && !gender && !user_admin_status) {
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
            if (!password) {
                toast.warning("Password is required")
                return
            }
            if (!password.trim().match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gm)) {
                toast.warning("Minimum eight characters, at least one letter, one number and one special character:")
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
            // if (!phone.trim().match(/^\(\d{3}\)\s\d{3}-\d{4}$/gm)) {
            //     toast.warning("Please enter valid phone number")
            //     setLoading(false)
            //     return
            // }

            let response = await instance.post("/createuseradmin", { company_id: companyID, first_name: first_name, last_name: last_name, email: email, gender: gender, password: password, phone: phone, user_admin_status: user_admin_status });
            // addAdminuser({ company_id: companyID, first_name: first_name, last_name: last_name, email: email, gender: gender, password: password, phone: phone, user_admin_status: user_admin_status })
            loadData()
            router.push("/adminusers")


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
        router.push("/adminusers")
    }

    return (
        <Fragment>
            <div className="bg-success pt-10 pb-21"></div>
            <ToastContainer
                position="top-right"
                hideProgressBar
            />
            <Container fluid className="mt-n18 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>

                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-22">
                                    <h3 className="mb-0  text-white">Create Admin User</h3>
                                </div>
                                <div className="mb-2 mb-lg-22">
                                <p style={{ color: "white", cursor: "pointer" }} onClick={handleback}   ><IoMdArrowRoundBack style={{fontSize:"25px"}}/>Back</p>
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
                                        <input type="radio" id="active" name="company_status" value={4} defaultChecked onChange={e => setUserAdminStatus(e.target.value)} />&nbsp;
                                        <label for="active">Active</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="block" name="company_status" value={5} onChange={e => setUserAdminStatus(e.target.value)} />&nbsp;
                                        <label for="blocked">Blocked</label>
                                    </div>
                                </div>
                            </Col>
                        </Row>



                        <Row className="mb-3">
                            <label

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
                        <Row className="mb-3">
                            <label

                                className="col-sm-4 col-form-label
                    form-label"
                            >
                                Password
                            </label>
                            <div className="col-md-8 col-12 d-flex">
                                <input
                                    className="peer form-control placeholder-transparent bg-gray-100 focus:outline-none "
                                    // type="password"
                                    type={showPassword ? 'text' : 'password'}
                                    // className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    id="password"
                                    required


                                />
                                <label style={{ marginRight: "40px", marginTop: "5px" }}
                                    onClick={() => setShowPassword(!showPassword)}
                                    class="bg-gray-300 right-0 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer position-absolute" for="toggle">
                                    {showPassword ? <BiShowAlt /> : <BiSolidHide />}
                                </label>
                            </div>
                        </Row>
                        {/*  :
                             "" */}


                        <Row className="mb-3">
                            <Form.Label className="col-sm-4">
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


                        {/* <Row className="mb-3">
                            <Form.Label className="col-sm-4" >
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
                          
                        </Row> */}
                        <Row className="mb-3" >
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


export default AddAdminUsers