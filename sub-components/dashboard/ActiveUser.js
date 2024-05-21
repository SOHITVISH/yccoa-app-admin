// import node module libraries
import Link from 'next/link';
import { ProgressBar, Col, Row, Card, Table, Image } from 'react-bootstrap';

// import required data files
import ActiveUserData from "data/dashboard/ActiveUserData";
import { Bold } from 'react-feather';
import { useRouter } from "next/router";
import { useEffect } from 'react';
const user = () => {

    const router = useRouter()
    function onPress(e) {
      router.push("/pages/employeeprofile")
      e.preventDefault()
  
    }


    useEffect(() => {
        let isAuth = localStorage.getItem('token');
        if (!isAuth) {
            router.push("/")
        }
    }, []);
    return (
        <Row className="mt-6">
            <Col md={12} xs={12}>
                <Card>
                    <Card.Header className="bg-white  py-4">
                        <h4 className="mb-0">Users</h4>
                    </Card.Header>
                    <Table responsive className="text-nowrap mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Serial No.</th>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>User Type</th>
                                <th>Gender</th>
                                <th>Work Details</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ActiveUserData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        {/* <td className="align-middle">
                                            <div className="d-flex align-items-center">
                                                <div>
                                               <div className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`}>
                                                        <Image src={item.brandLogo} alt="" />
                                                    </div> 
                                                </div>
                                                <div className="ms-3 lh-1">
                                                    <h5 className=" mb-1">
                                                        <Link href="#" className="text-inherit">{item.adminName}</Link></h5>
                                                </div>
                                            </div>
                                        </td> */}
                                        <td className="align-middle">{item.id}</td>
                                        <td className="align-middle">{item.EmployeeID}</td>
                                        <td className="align-middle">{item.name}</td>
                                        <td className="align-middle">{item.email}</td>
                                        <td className="align-middle">{item.usertype}</td>
                                        <td className="align-middle">{item.gender}</td>
                                        <td className="align-middle" style={{textAlign:"center", cursor:"pointer"}} onClick={onPress}>{item.workDetails}</td>
                                        <td className="align-middle"style={{color:`${item.status=="Active"?"#228B22":"#E64B09"}`, fontFamily:"bold"}} >{item.status}</td>
                                        {/* <td className="align-middle"><span className={`badge bg-${item.updatedAt}`}>{item.updatedBy}</span></td> */}
                                        {/* <td className="align-middle">
                                             <div className="avatar-group">
                                                {item.members.map((avatar, avatarIndex) => {
                                                    return (
                                                        <span className="avatar avatar-sm" key={avatarIndex}>
                                                            <Image alt="avatar" src={avatar.image} className="rounded-circle" />
                                                        </span>
                                                    )
                                                })}
                                                <span className="avatar avatar-sm avatar-primary">
                                                    <span className="avatar-initials rounded-circle fs-6">+5</span>
                                                </span>
                                            </div> 
                                        </td> */}
                                        {/* <td className="align-middle text-dark">
                                            <div className="float-start me-3">{item.progress}%</div>
                                            <div className="mt-2">
                                                <ProgressBar now={item.progress} style={{ height: '5px' }} />
                                            </div> 
                                        </td> */}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Card.Footer className="bg-white text-center">
                        <Link href="#" className="link-primary">View All users</Link>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}

export default user