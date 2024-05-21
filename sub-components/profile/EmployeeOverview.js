// import node module libraries
import { Col, Row, Card } from 'react-bootstrap';

const EmployeeOverview = () => {



    return (
        <Col xl={12} lg={12} md={12} xs={12} className="mb-2">

            <Card>

                <Card.Body>

                    <Row style={{ display: "flex", alignSelf: "center" }}>


                       <Col xs={4}style={{textAlign:"left"}}>
                            <h6 className=" fs-5 ls-2 text-success">Check-in At </h6>
                            <p className="mb-0 text-dark">14 H1 Block, Gomti Nagar</p>
                        </Col>

                
                            <Col xs={4}  style={{textAlign:"center"}}>
                                <h6 className=" fs-4 ls-2">09:00AM to 02:00PM </h6>
                                <p className="mb-0 text-dark">5 Hours</p>
                            </Col>
                      

                     
                            <Col xs={4}  style={{textAlign:"right"}}>
                                <h6 className=" fs-5 ls-2 text-danger">Check-out At</h6>
                                <p className="mb-0 text-dark">Gomti Nagar</p>
                            </Col>
                     


                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default EmployeeOverview