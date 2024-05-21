import { Row, Col, Card, Form, Button, Container, Image } from "react-bootstrap";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Context as AuthContext } from "../contextApi/AuthContext.js";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { instance } from "api/baseurl.js";
import 'react-toastify/dist/ReactToastify.css';
import { BiShowAlt } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import Cookies from "js-cookie";


const resetpassword = () => {

    const router = useRouter()

    const { getSingleCompany, updatePassword, state } = useContext(AuthContext)

    const [email, setEmail] = useState()
    const [resetpassword, setResetPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    let userTypeId = Cookies.get('user_type_id')

    useEffect(() => {
        if (router.isReady) {
            getSingleCompany({ id: router.query.id })
        }
    }, [state, router])

    useEffect(() => {
        if (router.isReady) {

            setEmail(state.singlecompany.email)
        }

    }, [state, router])
    const handlePassword = async () => {
        setLoading(true)
        try {
            let response = await instance.post("/updatePassword", { email: email, password: resetpassword });
            // updatePassword({ email: email, password: resetpassword })
            // loadData()
            console.log(response.data.message, "______________________ooooooooooo");
            console.log(response, "______________________resssssssss");
            setLoading(false)
            toast.success(response.data.message)

            if (userTypeId == 2) {
                router.push("/adminusers")
            }
            if (userTypeId == 1) {
                router.push("/company")
            }

        } catch (error) {
            console.log(error);

        }
    };
    const handleback = async () => {

        if (userTypeId == 2) {
            router.push("/adminusers")
        }
        if (userTypeId == 1) {
            router.push("/company")
        }

    }

    useEffect(() => {
        let isAuth = localStorage.getItem('token');
        if (!isAuth) {
            router.push("/")
        }
    }, []);


    return (
        <Fragment>

            <div className="bg-success pt-10 pb-21"></div>
            <ToastContainer
                position="bottom-left"
                hideProgressBar


            />
            <Container fluid className="mt-n18 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>

                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-22">
                                    <h3 className="mb-0  text-white">Reset Password</h3>
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
                                New Password
                            </label>
                            <div className="col-md-8 col-12 d-flex">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="Password"
                                    value={resetpassword}
                                    onChange={e => setResetPassword(e.target.value)}
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

                        <Row className="align-items-center">

                            <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4 mb-5">
                                <Button variant="success" onClick={handlePassword}>
                                    {loading ? "Please wait..." : "Reset Password"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>

                {/* <p><b>Edit Password</b></p>
            <hr />


            <Row className='mt-15 mt-md-0'>
                <Form >
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
                            New Password
                        </label>
                        <div className="col-md-8 col-12">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="New Password"
                                value={resetpassword}
                                onChange={e => setResetPassword(e.target.value)}
                                id="password"
                                required
                            />
                        </div>
                    </Row>



                    <Row className="align-items-center">

                        <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4 mb-5">
                            <Button variant="success" onClick={onClick}>
                                {loading ? "Please wait..." : "Reset Password"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Row> */}




            </Container>


        </Fragment>
    )
}

export default resetpassword