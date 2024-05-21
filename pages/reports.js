
import Form from 'react-bootstrap/Form';
import { DateTime } from 'luxon';
import { Col, Row, Card, Table, Link, Button, } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Context as AuthContext } from "../contextApi/AuthContext.js";
import { useRouter } from "next/router";
import AllEmployeeReports from 'sub-components/dashboard/EmployeeReports';
import { useState, useContext, useEffect, useRef } from 'react';
import Cookies from "js-cookie";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { instance } from 'api/baseurl.js';
import { BiReset } from "react-icons/bi";
import { FaFileExport } from "react-icons/fa6";
// import * as XLSX from 'xlsx'
// onst XLSX = require('sheetjs-style')
import * as XLSX from "sheetjs-style"


// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
const reports = () => {



    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [employeeId, setEmployeeID] = useState(null)
    const [showSearch, setShowSearch] = useState(false)
    const [showTaskLoad, setShowTaskLoad] = useState(false)
    const [first, setFirst] = useState("From Date")
    const [second, setSecond] = useState("To Date")
    const [click, setClick] = useState(false)
    const router = useRouter()
    const empTaskPage = useRef(1)
    const searchempTaskPage = useRef(1)
    const [loading, setLoading] = useState(false)
    const [filteredData, setFilteredData] = useState();
    const [searchExcel, setSearchExcel] = useState(false)
    const { singleEmployeeTask, admingetTotalTaskByTwoDay, getTotalTaskOfCompany, getAllEmployeeTaskOfCompany, admingetTaskByTwoDay, getAllEmployeeforsearch, getSingleEmployee, state } = useContext(AuthContext)


    let cid = Cookies.get('cID')
    let user_id = Cookies.get('user_id')

    let finafromDate = DateTime.fromISO(DateTime.fromJSDate(fromDate).toISODate()).toUTC().toISO()
    let finalToDate = DateTime.fromISO(DateTime.fromJSDate(toDate).toISODate()).plus({ milliseconds: 86399999 }).toUTC().toISO()

    useEffect(() => {
        setFromDate()
        setToDate()

        setShowTaskLoad(true)

        if (router.isReady) {
            getSingleEmployee({ id: user_id })
            getAllEmployeeTaskOfCompany({ id: cid })
            getTotalTaskOfCompany({ id: cid })
            getAllEmployeeforsearch({ id: cid })

        }


    }, [router])

    useEffect(() => {
        let isAuth = localStorage.getItem('token');
        if (isAuth) {
            router.push("/reports")
        } else {
            router.push("/")
        }
    }, []);

    const handlePage = () => {

        if (state.employeeTaskOfSingleCompany.length < state.employeeTaskCountOfSingleCompany) {
            getAllEmployeeTaskOfCompany({ id: cid, page: empTaskPage.current += 1 })
        }


    }

    const handleBackPage = () => {
        if ((state.employeeTaskOfSingleCompany.length <= state.employeeTaskCountOfSingleCompany) && state.employeeTaskCountOfSingleCompany != 0) {

            getAllEmployeeTaskOfCompany({ id: cid, page: empTaskPage.current -= 1, })

        }
    }





    const handleSearch = async () => {

        setLoading(true)
        setShowSearch(true)
        setSearchExcel(true)

        try {


            // if (employeeId && fromDate && toDate) {
            let finafromDate = DateTime.fromISO(DateTime.fromJSDate(fromDate).toISODate()).toUTC().toISO()
            let finalToDate = DateTime.fromISO(DateTime.fromJSDate(toDate).toISODate()).plus({ milliseconds: 86399999 }).toUTC().toISO()

            admingetTotalTaskByTwoDay({ user_id: employeeId, fromDate: finafromDate, toDate: finalToDate, setLoading })

            admingetTaskByTwoDay({ user_id: employeeId, fromDate: finafromDate, toDate: finalToDate, setLoading })
            singleEmployeeTask({ user_id: employeeId, setLoading })

            // }


        } catch (error) {

        }



    }

    const searchhandlePage = () => {

        if (state.alltaskoftwoday.length < state.taskcountoftwodate) {
            admingetTaskByTwoDay({ user_id: employeeId, fromDate: finafromDate, toDate: finalToDate, setLoading, page: searchempTaskPage.current += 1 })
        }


    }

    const searchhandleBackPage = () => {
        if ((state.alltaskoftwoday.length <= state.taskcountoftwodate) && state.taskcountoftwodate != 0) {

            admingetTaskByTwoDay({ user_id: employeeId, fromDate: finafromDate, toDate: finalToDate, setLoading, page: searchempTaskPage.current -= 1, })

        }
    }

    console.log(state.totaltaskoftwoday, "_______________uuuuuuuuuuuuuuuuuu");

    const resetTask = async () => {
        try {
            setFromDate()
            setToDate()
            setSearchExcel(false)
            setShowSearch(false)
            setEmployeeID(null)
            getAllEmployeeTaskOfCompany({ id: cid })
            setLoading(false)

        } catch (error) {

        }
    }

    let pagesCount = state.employeeTaskOfSingleCompany ? state.employeeTaskOfSingleCompany.length : 0


    const exportData = () => {

        let data = (searchExcel ? state.totaltaskoftwoday : state.totaltaskofcompany).map((item, index) => ({
            "#": index + 1,
            "Employee ID": item.employee_id,
            "Employee Name": item.user_id,
            "Work Duration": item.work_duration,
            "Check-in Date": DateTime.fromISO(item.checked_in_at).toFormat('LLL dd, yyyy'),
            "Check-in Time": DateTime.fromISO(item.checked_in_at).toFormat("hh:mm:ss a"),
            "Check-in Location": item.checked_in_location,
            "Check-out Date": DateTime.fromISO(item.checked_out_at).toFormat('LLL dd, yyyy'),
            "Check-out Time": DateTime.fromISO(item.checked_out_at).toFormat("hh:mm:ss a"),
            "Check-out Location": item.checked_out_location,
        }));
        var wb = XLSX.utils.book_new()
        // let myHeader = ["#", "employee_id", "user_id", "work_duration", "checked_in_at", "checked_in_location", "checked_out_at", "checked_out_location"];
        var ws = XLSX.utils.json_to_sheet(data)


        const columnWidths = [{ wch: 5 }, { wch: 10 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 65 }, { wch: 15 }, { wch: 15 }, { wch: 65 }];
        ws['!cols'] = columnWidths;


        // function sheet_from_array_of_arrays(ws, opts) {
        //     var ws = {};
        //     var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
        //     for(var R = 0; R != ws.length; ++R) {
        //         for(var C = 0; C != ws[R].length; ++C) {
        //             if(range.s.r > R) range.s.r = R;
        //             if(range.s.c > C) range.s.c = C;
        //             if(range.e.r < R) range.e.r = R;
        //             if(range.e.c < C) range.e.c = C;
        //             var cell = {v: ws[R][C],
        //                   s: { alignment: {textRotation: 90 },
        //                        font: {sz: 14, bold: true, color: "black" }
        //                 }


        //         }
        //     }
        //     }
        //     if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
        //     return ws;
        // }

        ws["A1"].s = { font: { name: "bold", sz: 10, bold: true, color: { rgb: "black" } }, alignment: { vertical: "center", horizontal: "center" } };
        ws["B1"].s = { font: { name: "bold", sz: 10, bold: true, color: { rgb: "black" } }, alignment: { vertical: "center", horizontal: "center" } };
        ws["C1"].s = { font: { name: "bold", sz: 10, bold: true, color: { rgb: "black" } }, alignment: { vertical: "center", horizontal: "center" } };
        ws["D1"].s = { font: { name: "bold", sz: 10, bold: true, color: { rgb: "black" } }, alignment: { vertical: "center", horizontal: "center" } };
        ws["E1"].s = { font: { name: "bold", sz: 10, bold: true, color: { rgb: "black" } }, alignment: { vertical: "center", horizontal: "center" } };
        ws["F1"].s = { font: { name: "bold", sz: 10, bold: true, color: { rgb: "black" } }, alignment: { vertical: "center", horizontal: "center" } };
        ws["G1"].s = { font: { name: "bold", sz: 10, bold: true, color: { rgb: "black" } }, alignment: { vertical: "center", horizontal: "center" } };
        ws["H1"].s = { font: { name: "bold", sz: 10, bold: true, color: { rgb: "black" } }, alignment: { vertical: "center", horizontal: "center" } };
        ws["I1"].s = { font: { name: "bold", sz: 10, bold: true, color: { rgb: "black" } }, alignment: { vertical: "center", horizontal: "center" } };
        ws["J1"].s = { font: { name: "bold", sz: 10, bold: true, color: { rgb: "black" } }, alignment: { vertical: "center", horizontal: "center" } };


        XLSX.utils.book_append_sheet(wb, ws, "Task Sheet")
        XLSX.writeFile(wb, "EmployeeTaskSheet.xlsx")
    }

    return (
        <>
            {/* <ToastContainer
                position="top-right"
                hideProgressBar
  /> */}

            <div className='m-3 ' style={{ borderRadius: "10px", backgroundColor: "white" }}>
                <Form className='p-5'>

                    <div className="d-flex justify-content-between align-items-center d-flex flex-column flex-sm-row">

                        <div >
                            <Row className="mb-3">
                                <Form.Group controlId="fromDate">

                                    <DatePicker placeholderText={"From Date"} className='form-control' maxDate={new Date()} selected={fromDate} onChange={(date) => { setFromDate(date) }} />

                                </Form.Group>
                            </Row>
                        </div>
                        <div>
                            <Row className="mb-3">
                                <Form.Group controlId="toDate">

                                    <DatePicker placeholderText='To Date' className='form-control' maxDate={new Date()} minDate={fromDate} selected={toDate} onChange={(date) => { setToDate(date) }} />

                                </Form.Group>
                            </Row>
                        </div>

                        <div>

                            <Row className="mb-3">

                                <Col >

                                    <Form.Select className='form-control' onChange={(e) => { setEmployeeID(e.target.value) }}>

                                        <option >Select Employee</option>
                                        {state.allemployeegetbyadmin.map(e =>
                                            <option value={e._id}>{e.first_name}</option>
                                        )};

                                    </Form.Select>
                                </Col>


                            </Row>
                        </div>

                        <div>
                            <Row className="mb-3">
                                <Button variant="success" onClick={handleSearch}>
                                    {loading ? "Please wait..." : "Search"}
                                </Button>
                            </Row>
                        </div>

                        <div>
                            <Row className="mb-3">
                                <Button variant="warning" type='reset' onClick={resetTask}>
                                    {/* {loading ? "Please wait..." : "Reset"} */}
                                    Reset
                                </Button>
                            </Row>
                        </div>

                    </div>
                </Form>
            </div>






            <Row className="mt-6 p-3">

                <Col md={12} xs={12}>
                    <Card>
                        <Card.Header className="bg-white  d-flex justify-content-between">
                            <div className="bg-white d-flex justify-content-between align-center">
                                <div>
                                    <h4 className="mb-0">Reports </h4>
                                </div>

                            </div>
                            <div>
                                <button className="mb-0" onClick={exportData} style={{ fontSize: "18px", cursor: "pointer", color: "Blue", border: "none", borderRadius: "10px" }}> Export <FaFileExport /></button>
                            </div>
                        </Card.Header>


                        <Table responsive className="text-nowrap mb-0 table-bordered table-hover">
                            <thead className="table-light">
                                <tr style={{ textAlign: "center" }}>
                                    <th>#</th>
                                    <th>Employee ID</th>
                                    <th>Employee Name</th>
                                    <th>Work Duration</th>
                                    <th>Check-in Date</th>
                                    <th>Check-in Time</th>
                                    <th>Check-in Location</th>
                                    <th>Check-out Date</th>
                                    <th>Check-out Time</th>
                                    <th>Check-out Location</th>

                                </tr>
                            </thead>
                            {(employeeId && showSearch && fromDate && toDate) || (showSearch && employeeId) ?

                                ((state.alltaskoftwoday.length || state.alltaskofsingleemployee.length) ?
                                    <tbody>
                                        {(!fromDate && !toDate ? state.alltaskofsingleemployee : state.alltaskoftwoday).map((item, index) => {

                                            return (

                                                <tr key={index}>
                                                    <td className="align-middle">{index + 1}</td>
                                                    <td className="align-middle" style={{ textAlign: "center" }}><b>{item.employee_id}</b></td>
                                                    <td className="align-middle" style={{ textAlign: "center" }}>{item.user_id}</td>
                                                    <td className="align-middle" style={{ textAlign: "center" }}>{item.work_duration}</td>
                                                    <td className="align-middle" style={{ textAlign: "center", color: "black" }}>{DateTime.fromISO(item.checked_in_at).toFormat('LLL dd, yyyy')}</td>
                                                    <td className="align-middle" style={{ color: "black", textAlign: "center" }}>{DateTime.fromISO(item.checked_in_at).toFormat("hh:mm:ss a")}</td>
                                                    <td className="align-middle" style={{ color: "black" }}>{item.checked_in_location}</td>
                                                    <td className="align-middle" style={{ color: "black" }}>{DateTime.fromISO(item.checked_out_at).toFormat('LLL dd, yyyy')}</td>
                                                    <td className="align-middle" style={{ color: "black", textAlign: "center" }}>{DateTime.fromISO(item.checked_out_at).toFormat("hh:mm:ss a")}</td>
                                                    <td className="align-middle" style={{ color: "black" }}>{item.checked_out_location}</td>
                                                </tr>

                                            )
                                        }
                                        )}
                                    </tbody>
                                    :
                                    (!loading && !showSearch?
                                        < div style={{ textAlign: "center" }}>
                                            <p className='mx-5 mt-10 mb-20 text-danger'>No record found!</p>
                                        </div>
                                        : "")
                                )
                                :
                                <tbody>

                                    {state.employeeTaskOfSingleCompany.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="align-middle">{index + 1}</td>
                                                <td className="align-middle" style={{ textAlign: "center" }}><b>{item.employee_id}</b></td>
                                                <td className="align-middle" style={{ textAlign: "center" }}>{item.user_id}</td>
                                                <td className="align-middle" style={{ textAlign: "center" }}>{item.work_duration}</td>
                                                <td className="align-middle" style={{ textAlign: "center", color: "black" }}>{DateTime.fromISO(item.checked_in_at).toFormat('LLL dd, yyyy')}</td>
                                                <td className="align-middle" style={{ color: "black", textAlign: "center" }}>{DateTime.fromISO(item.checked_in_at).toFormat("hh:mm:ss a")}</td>
                                                <td className="align-middle" style={{ color: "black" }}>{item.checked_in_location}</td>
                                                <td className="align-middle" style={{ color: "black" }}>{DateTime.fromISO(item.checked_out_at).toFormat('LLL dd, yyyy')}</td>
                                                <td className="align-middle" style={{ color: "black", textAlign: "center" }}>{DateTime.fromISO(item.checked_out_at).toFormat("hh:mm:ss a")}</td>
                                                <td className="align-middle" style={{ color: "black" }}>{item.checked_out_location}</td>
                                            </tr>

                                        )
                                    })}
                                </tbody>

                            }

                        </Table>

                        <Card.Footer className="bg-white text-center">
                            {empTaskPage.current > 1 || (searchempTaskPage.current > 1 && showSearch) ?
                                <button style={{ textAlign: "right", color: "blue", border: "none" }} onClick={showSearch ? searchhandleBackPage : handleBackPage}><GrFormPrevious />Back </button>
                                : ""} &nbsp;

                            {state.employeeTaskOfSingleCompany.length == 10 || (state.alltaskoftwoday.length == 10 && showSearch) || (state.alltaskofsingleemployee.length == 10 && showSearch) ?
                                <button style={{ textAlign: "right", color: "blue", border: "none" }} onClick={showSearch ? searchhandlePage : handlePage}>Next <MdOutlineNavigateNext /></button>
                                : ""}
                        </Card.Footer>

                    </Card>
                </Col>
            </Row >

        </>
    )
}

export default reports






// for (var i in ws) {
//     // console.log(ws[i]);
//      if (typeof ws[i] != 'object') continue;
//    let cell = XLSX.utils.decode_cell(i);


// ws[i].s = {
//     // styling for all cells
//     // font: {
//     //   name: 'arial',
//     // },
//     alignment: {
//       vertical: 'center',
//       horizontal: 'center',
//     //   wrapText: '1',
//        // any truthy value here
//     },
//     // border: {
//     //   right: {
//     //     style: 'thin',
//     //     color: '000000',
//     //   },
//     //   left: {
//     //     style: 'thin',
//     //     color: '000000',
//     //   },
//     // },
//   };

//   if (cell.r == 0) {
//     // first row
//     ws[i].s.border.bottom = {
//       // bottom border
//       style: 'thin',
//       color: '000000',
//     };
//   }

// }
