// import node module libraries
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";
import AuthLayout from "layouts/AuthLayout";
import { Context as AuthContext } from "../../contextApi/AuthContext.js";
import { useContext, useEffect, useState } from "react";

const ForgetPassword = () => {

  const router = useRouter()

  const { getSingleCompany, updatePassword, state } = useContext(AuthContext)

  const [email, setEmail] = useState()
  const [resetpassword, setResetPassword] = useState()

  useEffect(() => {
    if (router.isReady) {
      getSingleCompany({ id: router.query.id })
    }
  }, [])

  useEffect(() => {
    if (router.isReady) {

      setEmail(state.singlecompany.email)




    }

  }, [state, router])


  const handlePassword = async () => {
    try {

      updatePassword({ email: email, password: resetpassword })

      router.push("/company")
    } catch (error) {
      console.log(error);
    }
  };

  // function loadData() {
  //   setLoading({ loading: true })

  //   setTimeout(() => {
  //     setLoading({ loading: false });
  //   }, 5000);
  // }




  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <p >
                {/* <Image
                  src="/images/brand/logo/logo-primary.svg"
                  className="mb-2"
                  alt=""
                /> */}
                YCCOA
              </p>
              <p className="mb-6">
                Don&apos;t worry, Here you can reset your
                password.
              </p>
            </div>
            {/* Form */}
            <Form>
              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={resetpassword}
                  onChange={e => setResetPassword(e.target.value)}
                  placeholder="Enter Your New pasword"
                />
              </Form.Group>

              <div className="mb-3 d-grid">
                <Button variant="success" type="submit" onClick={handlePassword}>
                  Reset Password
                </Button>
              </div>
              <div className="d-md-flex justify-content-between mt-4">

                <div>
                  <Link href="/company"><IoMdArrowRoundBack style={{ color: "blue", fontSize: "15", cursor: "pointer" }} />go back</Link>
                </div>
              </div>

            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

ForgetPassword.Layout = AuthLayout;

export default ForgetPassword;
