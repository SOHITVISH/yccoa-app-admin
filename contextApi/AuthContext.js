import Cookies from "js-cookie";
import { instance } from "../api/baseurl.js";
import createDataContext from "./CreateDataContext.js";




const AuthReducer = (state, action) => {
    if (action.type == "SIGN_IN") {
        console.log(action.payload.userData, "______________8888888888888888888");
        return {
            ...state,
            userData: action.payload.datadoc,
            userToken: action.payload.token,
            userMessage: action.payload.message

        };

    } else if (action.type == "SET_ALL_COMPANY") {
        return {
            ...state,
            allCompany: action.payload.allCompany,
            allcompanycount: action.payload.allcompanycount


        };
    } else if (action.type == "ADD_COMPANY") {
        return {
            ...state,

        }
    } else if (action.type == "SET_ALL_EMPLOYEE") {
        return {
            ...state,
            allEmployee: action.payload.allEmployee,
            allEmpCount: action.payload.allEmpCount,

        }
    } else if (action.type == "ADD_EMPLOYEE") {
        return {
            ...state,
            data: action.payload.data
        }
    } else if (action.type == "SET_ALL_USERADMIN") {
        return {
            ...state,
            allAdminuser: action.payload.allAdminuser,
            getuseradmincount: action.payload.getuseradmincount
        }
    } else if (action.type == 'ADD_ADMIN_USER') {
        return {
            ...state,
        }
    } else if (action.type == "SET_ALL_TASK") {
        return {
            ...state,
            alltask: action.payload.alltask,
            reportTaskCount: action.payload.reportTaskCount
        }
    } else if (action.type == "ALL_SINGLE_USER_TASK") {
        return {
            ...state,
            allsingleusertask: action.payload.allsingleusertask,
            userInfo: action.payload.userInfo
        }
    } else if (action.type == "UPDATE_STATUS") {
        return {
            ...state,
        }
    } else if (action.type == "UPDATE_COMPANY") {
        return {
            ...state,
            companyUpdate: action.payload.companyUpdate
        }
    } else if (action.type == "GET_SINGLE_COMPANY") {
        return {
            ...state,
            singlecompany: action.payload.singlecompany

        }
    } else if (action.type == "UPDATE_EMPLOYEE") {
        return {
            ...state,
            employeeUpdate: action.payload.employeeUpdate
        }
    } else if (action.type == "GET_SINGLE_EMPLOYEE") {
        return {
            ...state,
            singleemployee: action.payload.singleemployee
        }
    } else if (action.type == "GET_SINGLE_USER_ADMIN") {
        console.log(action.payload.singleuseradmin, "_________________insideeee");
        return {
            ...state,
            singleuseradmin: action.payload.singleuseradmin
        }
    } else if (action.type == "UPDATE_USER_ADMIN") {
        return {
            ...state,
            userAdminUpdate: action.payload.userAdminUpdate
        }
    } else if (action.type == "EMPLOYEE_DELETE") {
        return {
            ...state,
            getcompanyemployee: [...action.payload.changeemp]

        }
    } else if (action.type == "COMPANY_DELETE") {
        return {
            ...state,
            allCompany: [...action.payload.changecompany]
        }
    } else if (action.type == "USER_ADMIN_DELETE") {
        return {
            ...state,
            allAdminuser: [...action.payload.changeadmin]
        }
    } else if (action.type == "ALL_TASK_BY_DATE") {
        return {
            ...state,
            alltaskofday: action.payload.alltaskofday,
            workDurationOfDay: action.payload.workDurationOfDay,
            taskcount: action.payload.taskcount
        }
    }
    else if (action.type == "ALL_ADMIN_TASK") {
        return {
            ...state,
            allusertask: action.payload.allusertask,
            allusertaskCount: action.payload.allTaskCount


        }
    } else if (action.type == "GET_COMPANY_EMPLOYEE") {
        return {
            ...state,
            getcompanyemployee: action.payload.getcompanyemployee,
            allEmpCount: action.payload.allEmpCount
        }
    } else if (action.type == "SET_ALL_TASK_OF_SINGLE_COMPANY") {
        return {
            ...state,
            employeeTaskOfSingleCompany: action.payload.employeeTaskOfSingleCompany,
            employeeTaskCountOfSingleCompany: action.payload.employeeTaskCountOfSingleCompany
        }
    } else if (action.type == "ALL_TASK_BY_TWO_DATE") {
        return {
            ...state,
            alltaskoftwoday: action.payload.alltaskoftwoday,
            taskcountoftwodate: action.payload.taskcountoftwodate,
            workDurationOfTwoDay: action.payload.workDurationOfTwoDay

        }
    } else if (action.type == "ALL_EMPLOYEE_GET") {
        return {
            ...state,
            allemployeegetbyadmin: action.payload.allemployeegetbyadmin

        }
    } else if (action.type == "UPDATE_PASSWORD") {
        return {
            ...state,
            updatePassword: action.payload.updatePassword

        }
    } else if (action.type == "SINGLE_EMPLOYEE_TASK") {
        return {
            ...state,
            alltaskofsingleemployee: action.payload.alltaskofsingleemployee,
            taskcount: action.payload.taskcount
        }
    } else if (action.type == "SET_TOTAL_TASK_OF_SINGLE_COMPANY") {
        return {
            ...state,
            totaltaskofcompany: action.payload.totaltaskofcompany,
            totaltaskofcompanyCount: action.payload.totaltaskofcompanyCount
        }
    } else if (action.type == "TOTAL_TASK_BY_TWO_DATE") {
        return {
            ...state,
            totaltaskoftwoday: action.payload.totaltaskoftwoday,
            totaltaskcountoftwodate: action.payload.totaltaskcountoftwodate

        }
    } else if (action.type == "ADMIN_RESTORE") {
        return {
            ...state,
            allAdminuser: [...action.payload.changeadmin]
        }
    } else if (action.type == "EMPLOYEE_RESTORE") {
        return {
            ...state,
            getcompanyemployee: [...action.payload.changeemp]
        }
    } else if (action.type == "COMPANY_RESTORE") {
        return {
            ...state,
            allCompany: [...action.payload.changecompany]
        }
    }


};

const signIn = (dispatch) => {
    return async ({ email, password, setError, router }) => {
        try {


            console.log("inside trycatch");
            let response = await instance.post("/signin", { email, password });
            console.log(response, "_________________response");
            console.log(response.message, "_________________responseMessage");
            const datadoc = response.data.result;
            const token = response.data.token
            const message = response.data.message

            console.log(message, "________________msg");

            dispatch({ type: "SIGN_IN", payload: { datadoc, token, message } });

            console.log(datadoc.user_type_id, "_________________alldataaaaa");
            console.log(token, "_________________tokennnnn");
            console.log(message[0], "_________________messageeeee");


            Cookies.set("user_id", datadoc._id)
            Cookies.set("user_type_id", datadoc.user_type_id)
            Cookies.set("companyName", datadoc.company_name)

            Cookies.set("email", datadoc.email)

            localStorage.setItem("token", token);
            localStorage.setItem("user_type_id", datadoc.user_type_id);
            localStorage.setItem("user_id", datadoc._id);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user_email", datadoc.email);
            localStorage.setItem("user_first_name", datadoc.first_name);
            localStorage.setItem("user_last_name", datadoc.last_name);


            if (datadoc.user_type_id == 1) {
                router.push("/dashboard")
            }
            if (datadoc.user_type_id == 2) {
                router.push("/adminusers")
            }
            if (datadoc.user_type_id == 3) {
                router.push("/employee")
            }
            if (datadoc.user_type_id == 4) {
                router.push("/reports")
            }


        } catch (error) {

            console.log(error);
            setError(error)


        }
    };
};

const signOut = (dispatch) => {
    return async ({ user_id }) => {

        try {

            let token = localStorage.getItem("token")
            await instance.post("/signout", { user_id }, { headers: { Authorization: `Bearer ${token}` } })


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


            await instance.post("/signout", { user_id })
            console.log("logged out runnn");
            dispatch({ type: "SIGN_OUT" });
            router.push("/")
        } catch (error) {
            // console.log(error, "---signou");
        }
    };
};


const addCompany = (dispatch) => {
    return async ({ company_name, first_name, last_name, email, password, phone, updated_by, company_status }) => {


        try {
            let response = await instance.post("/createcompany", { company_status, company_name, first_name, last_name, email, password, phone, updated_by });

            const data = response.data.result;
            console.log(data, "_______________dataaa");
            dispatch({ type: "ADD_COMPANY", payload: data });
        } catch (error) {

        }



    }
}
const addEmployee = (dispatch) => {
    return async ({ id, first_name, last_name, email, password, gender, phone, city, employee_status }) => {

        console.log("inside addEmp");
        try {
            console.log("inside trycatch addEmp");
            let response = await instance.post("/createemployee", { id, employee_status, first_name, last_name, email, gender, city, password, phone });
            console.log(response, "_______________________NEWresponse");
            const data = response.data.result;


            dispatch({ type: "ADD_EMPLOYEE", payload: data });
        } catch (error) {
            console.log(error?.response.data.message, "_______________messageeeToday");
        }
    }
}


const addAdminuser = (dispatch) => {
    return async ({ company_id, first_name, last_name, email, password, gender, phone, user_admin_status }) => {

        console.log("inside addEmp");
        try {
            console.log("inside trycatch addEmp");
            let response = await instance.post("/createuseradmin", { company_id, user_admin_status, first_name, last_name, email, gender, password, phone });
            console.log(response, "_______________________NEWresponse");
            const data = response.data.result;
            console.log(data, "_______________dataaaempppp");
            dispatch({ type: "ADD_ADMIN_USER", payload: data });
        } catch (error) {

        }
    }
}


const getAllCompany = (dispatch) => {
    return async ({ }) => {
        try {
            let token = localStorage.getItem("token")

            let getcompany = await instance.get(`/getallcompany`, { headers: { Authorization: `Bearer ${token}` } })
            //    console.log(getcompany.date.message);
            dispatch({ type: "SET_ALL_COMPANY", payload: { allCompany: getcompany.data.result, allcompanycount: getcompany.data.allCompanyCount } })

        } catch (error) {
            console.log(error);
        }
    }

}

const getAllEmployee = (dispatch) => {
    return async ({ id, page }) => {
        try {
            // let token = localStorage.getItem("token")
            let getemployee = await instance.post(`/getallemployee/${page}`, { id })


            dispatch({ type: "SET_ALL_EMPLOYEE", payload: { allEmployee: getemployee.data.result, allEmpCount: getemployee.data.empCount } })

        } catch (error) {
            console.log(error);
        }
    }

}

const getAllAdminuser = (dispatch) => {
    return async ({ company_id, page = 1 }) => {
        try {
            let token = localStorage.getItem("token")
            let getuseradmin = await instance.post(`/getalluseradmin/${page}`, { company_id }, { headers: { Authorization: `Bearer ${token}` } })


            dispatch({ type: "SET_ALL_USERADMIN", payload: { allAdminuser: getuseradmin.data.result, getuseradmincount: getuseradmin.data.allAdminCount } })

        } catch (error) {
            console.log(error);
        }
    }

}

const getAllEmployeeTaskOfCompany = (dispatch) => {
    return async ({ id, page = 1 }) => {
        try {
            let token = localStorage.getItem("token")
            let employeeTaskOfCompany = await instance.post(`/alltaskofsinglecompany/${page}`, { id }, { headers: { Authorization: `Bearer ${token}` } })

            // console.log(employeeTaskOfCompany.data.message,"__________________token");
            dispatch({ type: "SET_ALL_TASK_OF_SINGLE_COMPANY", payload: { employeeTaskOfSingleCompany: employeeTaskOfCompany.data.result, employeeTaskCountOfSingleCompany: employeeTaskOfCompany.data.allTaskOfCompanyCount } })

        } catch (error) {
            console.log(error);
        }
    }

}

const getTotalTaskOfCompany = (dispatch) => {
    return async ({ id }) => {
        try {
            // let token = localStorage.getItem("token")
            let employeeTaskOfCompany = await instance.post(`/totaltaskofsinglecompany`, { id })

            // console.log(employeeTaskOfCompany.data.message,"__________________token");
            dispatch({ type: "SET_TOTAL_TASK_OF_SINGLE_COMPANY", payload: { totaltaskofcompany: employeeTaskOfCompany.data.result, totaltaskofcompanyCount: employeeTaskOfCompany.data.allTaskOfCompanyCount } })

        } catch (error) {
            console.log(error);
        }
    }

}


const getAllTask = (dispatch) => {


    return async ({ page }) => {
        try {

            let getalltask = await instance.get(`/alltaskadmin/${page}`)

            dispatch({ type: "SET_ALL_TASK", payload: { alltask: getalltask.data.result, reportTaskCount: getalltask.data.allTaskCount } })

        } catch (error) {
            console.log(error);
        }
    }

}

const getSingleUserAdmin = (dispatch) => {
    return async ({ id }) => {
        try {

            let getsingleuseradmin = await instance.post(`/getsingleuseradmin`, { id })
            console.log(getsingleuseradmin.data.result, "______________uuuuuu");
            dispatch({ type: "GET_SINGLE_USER_ADMIN", payload: { singleuseradmin: getsingleuseradmin.data.result } })

        } catch (error) {
            console.log(error);
        }
    }

}

const getSingleCompany = (dispatch) => {
    return async ({ id }) => {
        try {

            let getsinglecompany = await instance.post(`/getsinglecompany`, { id })

            dispatch({ type: "GET_SINGLE_COMPANY", payload: { singlecompany: getsinglecompany.data.result } })

        } catch (error) {
            console.log(error);
        }
    }

}
const getSingleEmployee = (dispatch) => {
    return async ({ id }) => {
        try {

            let getsingleemployee = await instance.post(`/getsingleemployee`, { id })

            dispatch({ type: "GET_SINGLE_EMPLOYEE", payload: { singleemployee: getsingleemployee.data.result } })

        } catch (error) {
            console.log(error);
        }
    }

}


const allEmployeeOfCompany = (dispatch) => {
    return async ({ id, page = 1 }) => {
        try {
            let token = localStorage.getItem("token")
            let employeeOfCompany = await instance.post(`/allemployeeofcompany/${page}`, { id }, { headers: { Authorization: `Bearer ${token}` } })

            dispatch({ type: "GET_COMPANY_EMPLOYEE", payload: { getcompanyemployee: employeeOfCompany.data.result, allEmpCount: employeeOfCompany.data.empCount } })

        } catch (error) {
            console.log(error);
        }
    }

}

const getAllSingleUserTask = (dispatch) => {

    return async ({ user_id, page = 1, currentDate }) => {
        try {

            let getallsingleusertask = await instance.post(`/getallsingleusertask/${page}`, { user_id, currentDate })
            console.log(getallsingleusertask.data, "oooo");
            dispatch({ type: "ALL_SINGLE_USER_TASK", payload: { allsingleusertask: getallsingleusertask.data.result, userInfo: getallsingleusertask.data.userinfo } })

        } catch (error) {
            console.log(error);
        }
    }

}

const updateCompantStatus = (dispatch) => {
    return async ({ company_id, currentStatus }) => {
        try {

            let updateCompany = await instance.post(`/updatecompanystatus`, { company_id, currentStatus })

            dispatch({ type: "UPDATE_STATUS", payload: { updateStatus: updateCompany.data.result } })

        } catch (error) {
            console.log(error);
        }
    }
}

const updateCompany = (dispatch) => {
    return async ({ id, company_name, email, phone, password, company_status }) => {
        try {

            let updateCompany = await instance.post(`/updatecompany`, { id, company_name, email, phone, password, company_status })

            dispatch({ type: "UPDATE_COMPANY", payload: { companyUpdate: updateCompany.data.result } })

        } catch (error) {
            console.log(error);
        }
    }
}

const updateEmployee = (dispatch) => {
    return async ({ adminuser_id, id, first_name, last_name, email, gender, employee_status, phone }) => {
        try {

            let updateEmployee = await instance.post(`/updateemployee`, { adminuser_id, id, employee_status, first_name, last_name, email, gender, phone })

            dispatch({ type: "UPDATE_EMPLOYEE", payload: { employeeUpdate: updateEmployee.data.result } })

        } catch (error) {
            console.log(error);
        }
    }
}
const updateUserAdmin = (dispatch) => {
    return async ({ id, first_name, last_name, email, password, gender, phone, user_admin_status }) => {
        try {

            let updateuseradmin = await instance.post(`/updateuseradmin`, { id, user_admin_status, first_name, last_name, email, password, gender, phone })
            console.log(updateuseradmin.data.result, "____________auth inside");
            dispatch({ type: "UPDATE_USER_ADMIN", payload: { userAdminUpdate: updateuseradmin.data.result } })

        } catch (error) {
            console.log(error);
        }
    }
}

const employeeDelete = (dispatch) => {
    return async ({ id, oldemplist }) => {
        try {

            let deleteEmployee = await instance.post(`/deleteemployee`, { id })
            let changeemp = oldemplist.map((e) => {
                if (e._id == id) {
                    return { ...e, isEmployeeDeleted: true }
                } else {
                    return e
                }
            })

            dispatch({ type: "EMPLOYEE_DELETE", payload: { employeeDelete: deleteEmployee.data.result, changeemp } })

        } catch (error) {
            console.log(error);
        }
    }
}

const companyDelete = (dispatch) => {
    return async ({ id, oldcompanylist }) => {
        try {

            let deleteCompany = await instance.post(`/deletecompany`, { id })
            let changecompany = oldcompanylist.map((e) => {
                if (e._id == id) {
                    return { ...e, isCompanyDeleted: true }
                } else {
                    return e
                }
            })


            dispatch({ type: "COMPANY_DELETE", payload: { companyDelete: deleteCompany.data.result, changecompany } })

        } catch (error) {
            console.log(error);
        }
    }
}


const companyRestore = (dispatch) => {
    return async ({ id, oldcompanylist }) => {
        try {

            let restoreCompany = await instance.post(`/restorecompany`, { id })
            let changecompany = oldcompanylist.map((e) => {
                if (e._id == id) {
                    return { ...e, isCompanyDeleted: false }
                } else {
                    return e
                }
            })
            dispatch({ type: "COMPANY_RESTORE", payload: { companyRestore: restoreCompany.data.result, changecompany } })

        } catch (error) {
            console.log(error);
        }
    }
}
const employeeRestore = (dispatch) => {
    return async ({ id, oldemplist }) => {
        try {

            let restoreEmployee = await instance.post(`/restoreemployee`, { id })
            let changeemp = oldemplist.map((e) => {
                if (e._id == id) {
                    return { ...e, isEmployeeDeleted: false }
                } else {
                    return e
                }
            })
            dispatch({ type: "EMPLOYEE_RESTORE", payload: { employeeRestore: restoreEmployee.data.result, changeemp } })

        } catch (error) {
            console.log(error);
        }
    }
}

const adminRestore = (dispatch) => {
    return async ({ id, oldadminlist }) => {
        try {

            let restoreAdmin = await instance.post(`/restoreadmin`, { id })
            let changeadmin = oldadminlist.map((e) => {
                if (e._id == id) {
                    return { ...e, isUserAdminDeleted: false }
                } else {
                    return e
                }
            })
            dispatch({ type: "ADMIN_RESTORE", payload: { adminRestore: restoreAdmin.data.result, changeadmin } })

        } catch (error) {
            console.log(error);
        }
    }
}

const userAdminDelete = (dispatch) => {
    return async ({ id, oldadminlist }) => {
        try {

            let deleteUserAdmin = await instance.post(`/deleteuseradmin`, { id })
            let changeadmin = oldadminlist.map((e) => {
                if (e._id == id) {
                    return { ...e, isUserAdminDeleted: true }
                } else {
                    return e
                }
            })
            dispatch({ type: "USER_ADMIN_DELETE", payload: { userAdminDelete: deleteUserAdmin.data.result, changeadmin } })

        } catch (error) {
            console.log(error);
        }
    }
}

const getTaskByDay = (dispatch) => {

    return async ({ user_id, date, page = 1, currentDate, selectedToDate }) => {
        try {

            let getalltaskofday = await instance.post(`/checktaskbydate/${page}`, { user_id, date, currentDate, selectedToDate, page })
            console.log(getalltaskofday.data.result, "________________________getalltaskofday");
            console.log(getalltaskofday.data.totalHourOfDay, "________________________totalHourOfDay");
            console.log(getalltaskofday.data.taskCount, "________________________countTask");
            dispatch({ type: "ALL_TASK_BY_DATE", payload: { alltaskofday: getalltaskofday.data.result, taskcount: getalltaskofday.data.taskCount, workDurationOfDay: getalltaskofday.data.totalHourOfDay } })

        } catch (error) {
            console.log(error);
        }
    }

}

const admingetTaskByTwoDay = (dispatch) => {

    return async ({ user_id, fromDate, toDate, page = 1, setLoading }) => {
        try {

            let getalltaskoftwoday = await instance.post(`/taskbytwodateforadmin/${page}`, { user_id, fromDate, toDate, page })

            dispatch({ type: "ALL_TASK_BY_TWO_DATE", payload: { alltaskoftwoday: getalltaskoftwoday.data.result, taskcountoftwodate: getalltaskoftwoday.data.taskCount, workDurationOfTwoDay: getalltaskoftwoday.data.totalWorkingDuration } })
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

}

const admingetTotalTaskByTwoDay = (dispatch) => {

    return async ({ user_id, fromDate, toDate, setLoading }) => {
        try {

            let getalltaskoftwoday = await instance.post(`/totaltaskofsingleemployeeforadmin`, { user_id, fromDate, toDate })

            dispatch({ type: "TOTAL_TASK_BY_TWO_DATE", payload: { totaltaskoftwoday: getalltaskoftwoday.data.result, totaltaskcountoftwodate: getalltaskoftwoday.data.taskCount } })
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

}


const getAllUsersTask = (dispatch) => {

    return async ({ user_id, page = 1 }) => {
        try {

            let getalltaskofday = await instance.post(`/alltaskadmin/${page}`, { updated_by: user_id, })
            console.log(getalltaskofday.data.result, "________________________getalltaskofday");
            // console.log(getalltaskofday.data.totalHourOfDay, "________________________totalHourOfDay");
            dispatch({ type: "ALL_ADMIN_TASK", payload: { allusertask: getalltaskofday.data.result, allTaskCount: getalltaskofday.data.allTaskCount } })

        } catch (error) {
            console.log(error);
        }
    }

}

const getAllEmployeeforsearch = (dispatch) => {

    return async ({ id }) => {
        try {

            let getallemployee = await instance.post(`/getemployeeofsinglecompanysearch`, { id, })

            dispatch({ type: "ALL_EMPLOYEE_GET", payload: { allemployeegetbyadmin: getallemployee.data.result } })

        } catch (error) {
            console.log(error);
        }
    }

}


const updatePassword = (dispatch) => {
    return async ({ email, password }) => {
        try {

            let resetpass = await instance.post(`/updatePassword`, { email, password, })

            dispatch({ type: "UPDATE_PASSWORD", payload: { updatePassword: resetpass.data.message } })


        } catch (error) {

        }
    }
}

const singleEmployeeTask = (dispatch) => {

    return async ({ user_id, setLoading }) => {
        try {

            let getsingleemployeetask = await instance.post(`/alltaskofsingleemployee`, { user_id })

            dispatch({ type: "SINGLE_EMPLOYEE_TASK", payload: { alltaskofsingleemployee: getsingleemployeetask.data.result, taskcount: getsingleemployeetask.data.empTaskCount } })
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

}





export const { Context, Provider } = createDataContext(
    AuthReducer,
    {
        signIn,
        signOut,
        getAllCompany,
        addCompany,
        getAllEmployee,
        addEmployee,
        addAdminuser,
        getAllAdminuser,
        getAllTask,
        getAllSingleUserTask,
        updateCompantStatus,
        updateCompany,
        getSingleCompany,
        updateEmployee,
        getSingleEmployee,
        getSingleUserAdmin,
        updateUserAdmin,
        employeeDelete,
        companyDelete,
        userAdminDelete,
        getTaskByDay,
        getAllUsersTask,
        allEmployeeOfCompany,
        companyRestore,
        getAllEmployeeTaskOfCompany,
        admingetTaskByTwoDay,
        getAllEmployeeforsearch,
        updatePassword,
        singleEmployeeTask,
        getTotalTaskOfCompany,
        admingetTotalTaskByTwoDay,
        employeeRestore,
        adminRestore
    }, {
    userData: {},
    isSignout: false,
    userToken: "",
    isloggedIn: false,
    allCompany: [],
    result: [],
    allEmployee: [],
    allAdminuser: [],
    result: [],
    alltask: [],
    allsingleusertask: [],
    singlecompany: [],
    singleemployee: [],
    singleuseradmin: [],
    allusertask: [],
    allusertaskCount: 0,
    getcompanyemployee: [],
    employeeTaskOfSingleCompany: [],
    alltaskoftwoday: [],
    allemployeegetbyadmin: [],
    alltaskofsingleemployee: [],
    totaltaskofcompany: [],
    totaltaskoftwoday: []


}
)
// /alltaskadmin/:page