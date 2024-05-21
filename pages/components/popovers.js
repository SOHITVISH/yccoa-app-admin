// import node module libraries
import { Fragment } from 'react';
import { Form, Image } from "react-bootstrap";

import {
	Col,
	Row,
	Card,
	OverlayTrigger,
	Popover,
	Button,
	Nav,
	Tab,
	Container
} from 'react-bootstrap';

// import widget/custom components
import { HighlightCode } from 'widgets';



const Popovers = () => {



	return (
		<Row className="align-items-center justify-content-center g-0 min-vh-100">
			<Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">

				<Card className="smooth-shadow-md">

					<Card.Body className="p-6">
						<div className="mb-4">
							<p >

								YCCOA
							</p>
							<p className="mb-6">
								Don&apos;t worry, Here you can reset your
								password.
							</p>
						</div>

						<Form>

							<Form.Group className="mb-3" controlId="email">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									name="email"
									placeholder="Enter Your Email"
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="email">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="password"
									name="password"
									placeholder="Enter Your New pasword"
								/>
							</Form.Group>

							<div className="mb-3 d-grid">
								<Button variant="success" type="submit">
									Reset Password
								</Button>
							</div>
							{/* <div className="d-md-flex justify-content-between mt-4">

								<div>
									<Link href="/"><IoMdArrowRoundBack style={{ color: "blue", fontSize: "15", cursor: "pointer" }} /> back to signin</Link>
								</div>
							</div> */}

						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default Popovers;
// element.style {
//     color: red;
//     position: absolute !important;
//     background-color: white;
//     border: none;
//     z-index: 1000 !important;
//     top: 160px !important;
//     right: 293px !important;
//     PX: AUTO 100PX;
// }