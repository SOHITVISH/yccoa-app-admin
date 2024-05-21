
import { Col, Row, Container, Card, Image } from 'react-bootstrap';
import { DateTime } from 'luxon';
import { PageHeading } from 'widgets'
import Link from "next/link";
import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Context as AuthContext } from "../../contextApi/AuthContext.js";
import { useContext, useEffect } from 'react';
import { useRouter } from "next/router";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const EmployeeProfile = () => {

  const [startDate, setStartDate] = useState(new Date());
  const router = useRouter()
  const { getSingleEmployee, getTaskByDay, state } = useContext(AuthContext)
  const overviewPage = useRef(1)




  useEffect(() => {
    if (router.isReady) {
      let datenow = DateTime.now().toJSDate()
      let finafromDate = DateTime.fromISO(DateTime.fromJSDate(datenow).toISODate()).toUTC().toISO()
      let selectDate = DateTime.fromISO(DateTime.fromJSDate(datenow).toISODate()).plus({ milliseconds: 86399999 }).toUTC().toISO()
      getTaskByDay({ user_id: router.query.id, date: finafromDate, selectedToDate: selectDate, currentDate: DateTime.now().toUTC().toISO() })

      getSingleEmployee({ id: router.query.id })

    }


  }, [router])
  const handlePage = () => {
    if (state.alltaskofday.length < state.taskcount) {
      let selectDate = DateTime.fromISO(DateTime.fromJSDate(startDate).toISODate()).plus({ milliseconds: 86399999 }).toUTC().toISO()

      let finafromDate = DateTime.fromISO(DateTime.fromJSDate(startDate).toISODate()).toUTC().toISO()
      getTaskByDay({ user_id: router.query.id, date: finafromDate, selectedToDate: selectDate, currentDate: DateTime.now().toUTC().toISO(), page: overviewPage.current += 1 })
    }
  }
  const handleBackPage = () => {
    if ((state.alltaskofday.length <= state.allEmpCount) && state.taskcount != 0) {
      let selectDate = DateTime.fromISO(DateTime.fromJSDate(startDate).toISODate()).plus({ milliseconds: 86399999 }).toUTC().toISO()

      let finafromDate = DateTime.fromISO(DateTime.fromJSDate(startDate).toISODate()).toUTC().toISO()
      getTaskByDay({ user_id: router.query.id, date: finafromDate, selectedToDate: selectDate, currentDate: DateTime.now().toUTC().toISO(), page: overviewPage.current -= 1 })
    }
  }


  const onHandle = (date) => {

    let selectDate = DateTime.fromISO(DateTime.fromJSDate(date).toISODate()).plus({ milliseconds: 86399999 }).toUTC().toISO()

    let finafromDate = DateTime.fromISO(DateTime.fromJSDate(date).toISODate()).toUTC().toISO()
    getTaskByDay({ user_id: router.query.id, date: finafromDate, currentDate: DateTime.now().toUTC().toISO(), selectedToDate: selectDate })


  }
  const handleback = async () => {
    router.push("/companyemployee")
  }

  let pagesCount = state.alltaskofday ? state.alltaskofday.length : 0

  return (
    <Container fluid className="p-6">

      {/* <PageHeading heading="Overview" /> */}
      <div className="d-flex justify-content-between align-items-center">
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Employee Overview</p>
        <p style={{ color: "white", cursor: "pointer" }} onClick={handleback}   ><IoMdArrowRoundBack style={{fontSize:"25px"}}/>Back</p>
      </div>


      <Row className="align-items-center">
        <Col xl={12} lg={12} md={12} xs={12}>
          {/* Bg */}
          <div
            className="pt-7 rounded-top"
            style={{
              // background: "url(/images/background/profile-cover.jpg) no-repeat",
              // backgroundSize: "cover",
            }}
          ></div>
          <div className="bg-white rounded-bottom smooth-shadow-sm ">
            <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
              <div className="d-flex align-items-center">
                {/* avatar */}
                <div className="avatar-xxl avatar-indicators avatar-online me-2 position-relative d-flex justify-content-end align-items-end mt-n10">
                  {state.singleemployee.photo ?

                    <Image
                      src={`data:image/jpeg;base64,${state.singleemployee.photo}`}
                      className="avatar-xxl rounded-circle border border-4 border-white-color-40"
                      alt=""
                    /> :
                    <Image
                      src="/images/dummyimg.jpg"
                      className="avatar-xxl rounded-circle border border-4 border-white-color-40"
                      alt=""
                    />

                  }




                </div>

                <div className="lh-1">
                  <h2 className="mb-0">
                    {state.singleemployee.first_name} {state.singleemployee.last_name}

                  </h2>
                  {/* <p className="mb-0 d-block">{state.singleemployee.email}</p> */}

                  <p style={{ fontWeight: "bold", marginTop: "10px" }}>Employee ID : {state.singleemployee.employee_id}</p>

                </div>

              </div>
              <div style={{ padding: "10px" }} >

                <p>Total working hours &nbsp;&nbsp;<span style={{ borderRadius: "5px", padding: "5px", fontWeight: "bold", backgroundColor: "#800000", color: "white" }}>{state.singleemployee.total_hours}</span></p>


              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p style={{ marginLeft: "20px", color: "#800000" }}>Total Task  <b style={{ color: "#ffff", backgroundColor: "#800000", borderRadius: "5px", padding: "3px" }}>{state.taskcount}</b></p>
                {/* <ul className="nav nav-lt-tab px-4" id="pills-tab" role="tablist">
                  <li className="nav-item">
                
                      Overview
             
                  </li>


                </ul> */}
              </div>

              <div>
                {/* <p style={{marginRight:"20px"}}>Total Task {state.taskcount}</p> */}
                {/* <ul className="nav nav-lt-tab px-4" id="pills-tab" role="tablist">
                  <li className="nav-item">
                
                      Overview
             
                  </li>


                </ul> */}
              </div>
            </div>


          </div>
        </Col>
      </Row>


      <Row style={{ marginTop: "15px" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          <div >

            <DatePicker className='form-control' selected={startDate} onChange={(date) => { setStartDate(date), onHandle(date) }} />
          </div>
          <div >

            <p style={{ padding: "5px", textAlign: "center" }} >{startDate.toDateString()} &nbsp;<span><b style={{ borderRadius: "5px", padding: "5px", fontWeight: "bold", backgroundColor: "#800000", color: "white" }}>&nbsp;{state.workDurationOfDay}</b></span></p>

          </div>

        </div>

      </Row>
      <div style={{ color: "black" }}>
        <hr />
      </div>


      {state.alltaskofday ?


        <Col xl={12} lg={12} md={12} xs={12} className="mb-2">
          {state.alltaskofday.map((item, index) => {

            return (

              <Col xl={12} lg={12} md={12} xs={12} className="mb-2">

                <Card>

                  <Card.Body>

                    <Row style={{ display: "flex", alignSelf: "center" }}>

                      {/* <h6 className=" fs-20 ls-2 text-secondary">{DateTime.fromISO(item.checked_in_at).toFormat('LLL dd, yyyy')}</h6>  */}
                      <Col xs={4} style={{ textAlign: "left" }}>
                        <h6 className=" fs-5 ls-2 text-success">Check-in At </h6>
                        <p className="mb-0 text-dark">{item.checked_in_location}</p>
                      </Col>


                      <Col xs={4} style={{ textAlign: "center" }}>
                        <h6 className=" fs-4 ls-2">{DateTime.fromISO(item.checked_in_at).toFormat("hh:mm:ss a")} {item.checked_out_at ? "to" : ""} {item.checked_out_at ? DateTime.fromISO(item.checked_out_at).toFormat("hh:mm:ss a") : ""}</h6>
                        <p className="mb-0 text-dark">{item.work_duration}</p>
                      </Col>



                      <Col xs={4} style={{ textAlign: "right" }}>
                        <h6 className=" fs-5 ls-2 text-danger">Check-out At</h6>
                        <p className="mb-0 text-dark">{item.checked_out_location ? item.checked_out_location : "Work is in progress."}</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>


            )
          })
          }
        </Col>
        :

        ""}

      {pagesCount == 0 ?
        <Col xl={12} lg={12} md={12} xs={12} className="mb-2">

          <Card>

            <Card.Body>

              <Row style={{ display: "flex", alignSelf: "center" }}>
                <Col xs={12} style={{ textAlign: "Center" }}>
                  <h6 className=" fs-5 ls-2 text-danger">No task of that day</h6>

                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col> : ""}



      {state.alltaskofday ?
        < Row >
          <Card.Footer className="text-center">
            {overviewPage.current > 1 ?
              <button style={{ textAlign: "right", color: "blue", border: "none" }} onClick={handleBackPage}><GrFormPrevious />Back </button>
              : ""}
            &nbsp;
            {state.alltaskofday.length == 5 ?
              <button style={{ textAlign: "right", color: "blue", border: "none" }} onClick={handlePage}>Next <MdOutlineNavigateNext /></button>
              : ""}
          </Card.Footer>
        </Row >
        : ""}

    </Container>
  )
}

export default EmployeeProfile



