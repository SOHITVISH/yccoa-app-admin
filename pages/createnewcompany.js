import React, { useContext, useEffect, useState } from 'react'
import { Fragment } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import { Context as AuthContext } from "../contextApi/AuthContext.js";
import { Form, Card, Button, Image } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from 'axios';
import { BiShowAlt } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { instance } from 'api/baseurl.js';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
const Createnewcompany = () => {
    const router = useRouter()
    const { addCompany, state } = useContext(AuthContext)
    const [company_name, setCompanyName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState()
    const [company_status, setCompanyStatus] = useState(1)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        let isAuth = localStorage.getItem('token');
        if (!isAuth) {
            router.push("/")
        }
    }, []);

    const onClick = async () => {
        setLoading(true)
        try {

            if (!company_name && !email && !password && !phone && !company_status) {
                toast.warning("All fields is required")
                setLoading(false)
                return
            }

            if (!company_name) {
                toast.warning("Company name is required")
                setLoading(false)
                return
            }

            if (!email) {
                toast.warning("Email is required")
                setLoading(false)
                return
            }
            if (!email.trim().match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/gm)) {
                toast.warning("Please provide a valid email")

                return
            }
            if (!password) {
                toast.warning("password is required")
                setLoading(false)
                return
            }

            if (!password.trim().match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gm)) {
                toast.warning("Minimum eight characters, at least one letter, one number and one special character:")
                setLoading(false)
                return
            }

            // if (!phone.trim().match(/^\(\d{3}\)\s\d{3}-\d{4}$/gm)) {
            //     toast.warning("Please enter valid phone number")
            //     setLoading(false)
            //     return
            // }

            let response = await instance.post("/createcompany", { company_status: company_status, company_name: company_name, email: email, password: password, phone: phone });
            // addCompany({ company_status: company_status, company_name: company_name, email: email, password: password, phone: phone })
            loadData()
            setLoading(false)
            router.push("/company")


        } catch (error) {

            console.log(error);
            toast.error(error?.response.data.message)


        }
    };

    const handleback = async () => {
        router.push("/company")
    }

    function loadData() {
        setLoading({ loading: true })

        setTimeout(() => {
            setLoading({ loading: false });
        }, 5000);
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
                                    <h3 className="mb-0  text-white">Add New Company</h3>
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
                                        <input type="radio" id="active" name="company_status" value={1} defaultChecked onChange={e => setCompanyStatus(e.target.value)} />&nbsp;
                                        <label for="active">Active</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="block" name="company_status" value={3} onChange={e => setCompanyStatus(e.target.value)} />&nbsp;
                                        <label for="blocked">Blocked</label>
                                    </div>
                                </div>
                            </Col>
                        </Row>


                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" htmlFor="companyName">
                                Company name
                            </Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter company name"
                                    value={company_name}
                                    onChange={e => setCompanyName(e.target.value)}
                                    id="companyName"
                                    required
                                />
                            </Col>
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

                        <Row className="mb-3">
                            <label
                                htmlFor="password"
                                className="col-sm-4 col-form-label
                    form-label"
                            >
                                Password
                            </label>
                            <div className="col-md-8 col-12 d-flex">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
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

                        <Row className="mb-3" >
                            <Form.Label className="col-sm-4" >
                                Phone <span className="text-muted">(Optional)</span>
                            </Form.Label>
                            <Col md={8} xs={12}>
                                <PhoneInput className='form-control'
                                    defaultCountry='US'
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={setPhone} />
                            </Col>
                        </Row>

                        <Row className="mb-3" >

                            <Form.Label className="col-sm-4" >Company Logo <span className="text-muted">(Optional)</span></Form.Label>
                            <Col md={8} xs={12}>
                                <Form.Control
                                className='form-control'
                                type="file" />

                            </Col>

                        </Row>


                        {/* Zip code */}
                        <Row className="align-items-center">

                            <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4 mb-5">
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

export default Createnewcompany