import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
// import { Context as AuthContext } from "../contextApi/AuthContext.js";
import { instance } from "../api/baseurl.js";
import AuthLayout from "layouts/AuthLayout";
import Cookies from "js-cookie";
import { useCallback, useContext, useEffect, useState } from "react";
import { BiShowAlt } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { useRouter } from "next/router.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks/use-auth.js';

// import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses.js";
// import Toast from "../pages/components/toasts.js";
const SignIn = () => {
  const auth = useAuth();
  // const { signIn, state } = useContext(AuthContext)

  const router = useRouter()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [toastErr, setToastErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false)


  let user_type = Cookies.get('user_type_id');


  const handleSignin = async () => {

    if (!email && !password) {
      return toast.warning("Email & Password required")
    }
    if (!email) {
      toast.warning("Email is required")
    }

    if (!email.trim().match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/gm)) {
      toast.warning("Not a valid email")

      return
    }
    if (!password) {
      toast.warning("Password is required")
    }

    try {

      setLoading(true)
      let response = await instance.post("/signin", { email, password }, { headers: { "Content-Type": "application/json" } });


      let datadoc = response.data.result;
      const token = response.data.token


      Cookies.set("user_id", datadoc._id)
      Cookies.set("user_type_id", datadoc.user_type_id)
      Cookies.set("companyName", datadoc.company_name)
      Cookies.set("cID", datadoc.company_id)
      Cookies.set("companyNameAdmin", datadoc.created_by)

      Cookies.set("email", datadoc.email)

      localStorage.setItem("token", token);
      localStorage.setItem("user_type_id", datadoc.user_type_id);
      localStorage.setItem("user_id", datadoc._id);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user_email", datadoc.email);
      localStorage.setItem("user_first_name", datadoc.first_name);
      localStorage.setItem("user_last_name", datadoc.last_name);



      if (datadoc.user_type_id == 1) {

        router.push("/company")

        setLoading(false)
      }
      if (datadoc.user_type_id == 2) {

        router.push("/adminusers")
        setLoading(false)

      }
      if (datadoc.user_type_id == 3) {

        router.push("/employee")


      }
      if (datadoc.user_type_id == 4) {
        router.push("/reports")
      }

      return

    } catch (error) {

      toast.error(error?.response.data.message)
      setLoading(false)

    }
  };

  useEffect(() => {
    let isAuth = localStorage.getItem('token');
    if (isAuth) {
      if (user_type == 1) {
        router.push("/company")
      }
      if (user_type == 2) {
        router.push("/adminusers")
      }
      if (user_type == 3) {
        router.push("/employee")
      }

    } else {
      router.push("/")
    }
  }, []);




  return (
    <>
      <ToastContainer
        position="bottom-left"
        hideProgressBar


      />
      <Row className="align-items-center justify-content-center g-0 min-vh-100 ">
        <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">

          <Card className="smooth-shadow-md">

            <Card.Body className="p-6">
              <div className="mb-4 text-center">
                <Link href="/" >
                  <Image
                    src="/images/yccoalogo.jpg"
                    className="mb-2"
                    alt=""
                    width={130}
                    height={120}
                  />

                </Link>
                <p className="mb-6">Please enter your login detail.</p>
              </div>

              <Form >



                <Form.Group className="mb-3" >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter email address "
                    onChange={e => setEmail(e.target.value)}

                  />
                </Form.Group>


                <Form.Group className="mb-3 d-flex flex-column" >
                  <Form.Label>Password</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={password}
                      placeholder="********"
                      onChange={e => setPassword(e.target.value)}

                    />

                    <Form.Label style={{ marginRight: "40px", marginTop: "8px", zIndex: "100", position: "absolute", right: "0" }}
                      onClick={() => setShowPassword(!showPassword)}
                      class="bg-gray-300 right-0 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer " for="toggle">
                      {showPassword ? <BiShowAlt /> : <BiSolidHide />}
                    </Form.Label>
                  </div>


                </Form.Group>

                {/* Checkbox */}
                {/* <div className="d-lg-flex justify-content-between align-items-center mb-4">
                <Form.Check type="checkbox" id="rememberme">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>Remember me</Form.Check.Label>
                </Form.Check>
              </div> */}
                <div>

                  <div className="d-grid">


                    <Button variant="success" onClick={handleSignin} onKeyDown={e => e.key === 'Enter' ? handleSignin :
                      ''} >
                      {loading ? "Please wait..." : "Sign In"}

                    </Button>


                  </div>
                  <div className="d-md-flex justify-content-between mt-4">
                    {/* <div className="mb-2 mb-md-0">
                      <Link href="/authentication/sign-up" className="fs-5">
                        Create An Account{" "}
                      </Link>
                    </div> */}
                    {/* <div>
                      <Link
                        href="/authentication/forget-password"
                        className="text-inherit fs-5"
                      >

                        Forgot your password?
                      </Link>
                    </div> */}
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>


      </Row>



    </>
  );
};

SignIn.Layout = AuthLayout;

export default SignIn;
