import Link from 'next/link';
import { Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
    Row,
    Col,
    Image,
    Dropdown,
    ListGroup,
} from 'react-bootstrap';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import NotificationList from 'data/Notification';

import useMounted from 'hooks/useMounted';
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import { instance } from 'api/baseurl';
const QuickMenu = () => {
    let name = Cookies.get('name');
    let email = Cookies.get('email');
    console.log(name, email, "____________userinfo");

    const hasMounted = useMounted();

    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const Notifications = () => {
        return (
            <SimpleBar style={{ maxHeight: '300px' }}>
                <ListGroup variant="flush">
                    {NotificationList.map(function (item, index) {
                        return (
                            <ListGroup.Item className={index === 0 ? 'bg-light' : ''} key={index}>
                                <Row>
                                    <Col>
                                        <Link href="#" className="text-muted">
                                            <h5 className=" mb-1">{item.sender}</h5>
                                            <p className="mb-0"> {item.message}</p>
                                        </Link>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </SimpleBar>
        );
    }

    const QuickMenuDesktop = () => {

        const router = useRouter()
        // function onPress(e) {

        //     Cookies.remove("user_type_id")
        //     Cookies.remove("companyName")
        //     Cookies.remove("user_id")
        //     Cookies.remove("email")
        //     localStorage.removeItem("token");
        //     localStorage.removeItem("user_type_id");
        //     localStorage.removeItem("user_id");
        //     localStorage.removeItem("isLoggedIn");
        //     localStorage.removeItem("user_email");
        //     localStorage.removeItem("user_first_name");
        //     localStorage.removeItem("user_last_name");
        //     router.push("/")

        // }

        const handleSignout = async () => {
            console.log("sign outtttttttttt");
            try {

                let token = localStorage.getItem("token")
                let id = localStorage.getItem("user_id")
                await instance.post("/signout", { id }, { headers: { Authorization: `Bearer ${token}` } })


                Cookies.remove("user_type_id")
                Cookies.remove("companyName")
                Cookies.remove("user_id")
                Cookies.remove("email")
                localStorage.removeItem("token");
                localStorage.removeItem("user_type_id");
                localStorage.removeItem("user_id");
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("user_email");
                localStorage.removeItem("user_first_name");
                localStorage.removeItem("user_last_name");
                router.push("/")


                // await instance.post("/signout", { user_id })
                // console.log("logged out runnn");
                // dispatch({ type: "SIGN_OUT" });
                // router.push("/")
            } catch (error) {
                // console.log(error, "---signou");
            }

        };


        return (
            <ListGroup as="ul" bsPrefix='navbar-nav' className="navbar-right-wrap ms-auto d-flex nav-top-wrap">
                <Dropdown as="li" className="stopevent">
                    {/* <Dropdown.Toggle as="a"
                        bsPrefix=' '
                        id="dropdownNotification"
                        className="btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted">
                        <i className="fe fe-bell"></i>
                    </Dropdown.Toggle> */}
                    <Dropdown.Menu
                        className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end py-0"
                        aria-labelledby="dropdownNotification"
                        align="end"
                        show
                    >
                        <Dropdown.Item className="mt-3" bsPrefix=' ' as="div"  >
                            <div className="border-bottom px-3 pt-0 pb-3 d-flex justify-content-between align-items-end">
                                <span className="h4 mb-0">Notifications</span>
                                <Link href="/" className="text-muted">
                                    <span className="align-middle">
                                        <i className="fe fe-settings me-1"></i>
                                    </span>
                                </Link>
                            </div>
                            <Notifications />
                            <div className="border-top px-3 pt-3 pb-3">
                                <Link href="/dashboard/notification-history" className="text-link fw-semi-bold">
                                    See all Notifications
                                </Link>
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown as="li" className="ms-2">
                    <Dropdown.Toggle
                        as="a"
                        bsPrefix=' '
                        className="rounded-circle"
                        id="dropdownUser">
                        <div className="avatar avatar-md avatar-indicators avatar-online">
                            <Image alt="avatar" src='/images/dummyimg.jpg' className="rounded-circle" />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        className="dropdown-menu dropdown-menu-end "
                        align="end"
                        aria-labelledby="dropdownUser"
                        show
                    >
                        <Dropdown.Item as="div" className="px-4 pb-0 pt-2" bsPrefix=' '>
                            <div className="lh-1 ">

                                <h5 className="mb-1"> {email}</h5>

                            </div>
                            <div className=" dropdown-divider mt-3 mb-2"></div>
                        </Dropdown.Item>
                        {/* <Dropdown.Item eventKey="2">
                        <i className="fe fe-user me-2"></i> Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="3">
                        <i className="fe fe-activity me-2"></i> Activity Log
                    </Dropdown.Item>
                    <Dropdown.Item className="text-primary">
                        <i className="fe fe-star me-2"></i> Go Pro
                    </Dropdown.Item>
                    <Dropdown.Item >
                        <i className="fe fe-settings me-2"></i> Account Settings
                    </Dropdown.Item>  */}
                        <Dropdown.Item onClick={handleSignout}>
                            <i className="fe fe-power me-2" ></i>Sign Out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ListGroup>
        )
    }

    const QuickMenuMobile = () => {

        const router = useRouter()

        const handleSignout = async () => {
            console.log("sign outtttttttttt");
            try {

                let token = localStorage.getItem("token")
                let id = localStorage.getItem("user_id")
                await instance.post("/signout", { id }, { headers: { Authorization: `Bearer ${token}` } })


                Cookies.remove("user_type_id")
                Cookies.remove("companyName")
                Cookies.remove("user_id")
                Cookies.remove("email")
                localStorage.removeItem("token");
                localStorage.removeItem("user_type_id");
                localStorage.removeItem("user_id");
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("user_email");
                localStorage.removeItem("user_first_name");
                localStorage.removeItem("user_last_name");
                router.push("/")


                // await instance.post("/signout", { user_id })
                // console.log("logged out runnn");
                // dispatch({ type: "SIGN_OUT" });
                // router.push("/")
            } catch (error) {
                // console.log(error, "---signou");
            }

        };



        return (
            <ListGroup as="ul" bsPrefix='navbar-nav' className="navbar-right-wrap ms-auto d-flex nav-top-wrap">
                <Dropdown as="li" className="stopevent">
                    <Dropdown.Toggle as="a"
                        bsPrefix=' '
                        id="dropdownNotification"
                        className="btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted">
                        <i className="fe fe-bell"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end py-0"
                        aria-labelledby="dropdownNotification"
                        align="end"
                    >
                        <Dropdown.Item className="mt-3" bsPrefix=' ' as="div"  >
                            <div className="border-bottom px-3 pt-0 pb-3 d-flex justify-content-between align-items-end">
                                <span className="h4 mb-0">Notifications</span>
                                <Link href="/" className="text-muted">
                                    <span className="align-middle">
                                        <i className="fe fe-settings me-1"></i>
                                    </span>
                                </Link>
                            </div>
                            {/* <Notifications /> */}
                            <div className="border-top px-3 pt-3 pb-3">
                                <Link href="/dashboard/notification-history" className="text-link fw-semi-bold">
                                    See all Notifications
                                </Link>
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown as="li" className="ms-2">
                    <Dropdown.Toggle
                        as="a"
                        bsPrefix=' '
                        className="rounded-circle"
                        id="dropdownUser">
                        <div className="avatar avatar-md avatar-indicators avatar-online">
                            <Image alt="avatar" src='/images/avatar/avatar-1.jpg' className="rounded-circle" />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        className="dropdown-menu dropdown-menu-end "
                        align="end"
                        aria-labelledby="dropdownUser"
                    >
                        <Dropdown.Item as="div" className="px-4 pb-0 pt-2" bsPrefix=' '>
                            <div className="lh-1 ">
                                <h5 className="mb-1">{email}</h5>
                                {/* <Link href="#" className="text-inherit fs-6">View my profile</Link> */}
                            </div>
                            <div className=" dropdown-divider mt-3 mb-2"></div>
                        </Dropdown.Item>
                        {/* <Dropdown.Item eventKey="2">
                 <i className="fe fe-user me-2"></i> Edit Profile
             </Dropdown.Item>
             <Dropdown.Item eventKey="3">
                 <i className="fe fe-activity me-2"></i> Activity Log
             </Dropdown.Item>
             <Dropdown.Item className="text-primary">
                 <i className="fe fe-star me-2"></i> Go Pro
             </Dropdown.Item>
             <Dropdown.Item >
                 <i className="fe fe-settings me-2"></i> Account Settings
             </Dropdown.Item> */}
                        <Dropdown.Item onClick={handleSignout}>
                            <i className="fe fe-power me-2"></i>Sign Out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ListGroup>
        )
    }

    return (
        <Fragment>
            {hasMounted && isDesktop ? <QuickMenuDesktop /> : <QuickMenuMobile />}
        </Fragment>
    )
}

export default QuickMenu;