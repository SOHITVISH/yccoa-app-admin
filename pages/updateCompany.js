import React, { useContext, useEffect, useState } from 'react'
import { Fragment } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import { Context as AuthContext } from "../contextApi/AuthContext.js";
import { Form, Card, Button, Image } from "react-bootstrap";
import { useRouter } from "next/router";
import { IoMdArrowRoundBack } from "react-icons/io";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
// import Link from 'next/link';
// import { FormSelect, DropFiles } from "widgets";

const updateCompany = () => {
    const router = useRouter()

    const { updateCompany, getSingleCompany, state } = useContext(AuthContext)
    const [company_name, setCompanyName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [resetpassword, setResetPassword] = useState()
    const [phone, setPhone] = useState()
    const [company_status, setCompanyStatus] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (router.isReady) {
            getSingleCompany({ id: router.query.id })
        }
    }, [])

    useEffect(() => {
        if (router.isReady) {
            setCompanyName(state.singlecompany.company_name)
            setEmail(state.singlecompany.email)
            setPassword(state.singlecompany.password)
            setPhone(state.singlecompany.phone)
            setCompanyStatus(state.singlecompany.company_status)
            console.log(state.singlecompany.company_status, "___________________singleCompany status");


        }

    }, [state, router])



    const onClick = async () => {
        try {
            console.log(state, "_________stat");
            updateCompany({ id: router.query.id, company_status: company_status, company_name: company_name, email: email, password: password, phone: phone })
            loadData()
            router.push("/company")
        } catch (error) {
            console.log(error);
        }
    };

    function loadData() {
        setLoading({ loading: true })

        setTimeout(() => {
            setLoading({ loading: false });
        }, 5000);
    }

    const handleback = async () => {
        router.push("/company")
    }


    return (
        <Fragment>
            <div className="bg-success pt-10 pb-21"></div>
            <Container fluid className="mt-n18 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>

                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-22">
                                    <h3 className="mb-0  text-white">Update Company</h3>
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
                                        <input type="radio" id="active" name="status" value={1} checked={company_status == 1} onChange={e => setCompanyStatus(e.target.value)} />&nbsp;
                                        <label for="active">Active</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="block" name="status" value={3} checked={company_status == 3} onChange={e => setCompanyStatus(e.target.value)} />&nbsp;
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

                        {/* Zip code */}
                        <Row className="align-items-center">

                            <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4 mb-5">
                                <Button variant="success" onClick={onClick}>
                                    {loading ? "Please wait..." : "Save Changes"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>

            </Container>


        </Fragment>
    )
}

export default updateCompany