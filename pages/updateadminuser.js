
// import { ActiveProjects, Teams, TasksPerformance } from "sub-components"; 
import React, { useContext, useEffect, useState } from 'react'
import { Fragment } from "react";
import { Context as AuthContext } from "../contextApi/AuthContext.js";
import { Container, Col, Row } from 'react-bootstrap';
import { Form, Button, Image } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";
import { Check } from 'react-bootstrap-icons';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'


const Updateadminuser = () => {
    const router = useRouter()

    const { getSingleUserAdmin, updateUserAdmin, state } = useContext(AuthContext)
    const [first_name, setFirstName] = useState()
    const [last_name, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState()
    const [gender, setGender] = useState()
    const [user_admin_status, setUserAdminStatus] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (router.isReady) {
            getSingleUserAdmin({ id: router.query.id })
        }
    }, [])

    useEffect(() => {
        if (router.isReady) {
            setFirstName(state.singleuseradmin.first_name)
            setLastName(state.singleuseradmin.last_name)
            setEmail(state.singleuseradmin.email)
            setPassword(state.singleuseradmin.password)
            setGender(state.singleuseradmin.gender)
            setPhone(state.singleuseradmin.phone)
            setUserAdminStatus(state.singleuseradmin.user_admin_status)


        }

    }, [state, router])



    const handleUpdate = async () => {
        setLoading(true)
        try {
            updateUserAdmin({ id: router.query.id, first_name: first_name, last_name: last_name, phone:phone,email: email, password: password, gender: gender, user_admin_status: user_admin_status })
            setLoading(false)
            router.push("/adminusers")
        } catch (error) {
            console.log(error);
        }
    };

    const handleback = async () => {
        router.push("/adminusers")
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
                                    <h3 className="mb-0  text-white">Update Admin User</h3>
                                </div>
                                <div className="mb-2 mb-lg-22">
                                <p style={{ color: "white", cursor: "pointer" }} onClick={handleback}   ><IoMdArrowRoundBack style={{fontSize:"25px"}}/>Back</p>
                                </div>



                            </div>
                        </div>
                    </Col>

                </Row>

                <Row>
                    <Form >

                        <Row className="mb-3">
                            <Form.Label className="col-sm-4" htmlFor="gender">
                                Status
                            </Form.Label>
                            <Col md={8} xs={12}>
                                <div style={{ display: "flex", gap: 10 }}  >
                                    <div>
                                        <input type="radio" id="active" name="user_admin_status" value={4} checked={user_admin_status == 4} onChange={e => setUserAdminStatus(e.target.value)} />&nbsp;
                                        <label for="active">Active</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="block" name="user_admin_status" value={5} checked={user_admin_status == 5} onChange={e => setUserAdminStatus(e.target.value)} />&nbsp;
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
                                        <input type="radio" id="male" name="gender" value={"Male"} checked={gender == "Male"} onChange={e => setGender(e.target.value)} />&nbsp;
                                        <label for="male">Male</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="female" name="gender" value={"Female"} checked={gender == "Female"} onChange={e => setGender(e.target.value)} />&nbsp;
                                        <label for="female">Female</label>
                                    </div>


                                </div>
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
                                <Button variant="success" onClick={handleUpdate}>
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

export default Updateadminuser