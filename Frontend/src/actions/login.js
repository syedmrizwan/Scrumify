import { loginService } from "../services/loginService";
import { showLoader } from "./loader";
import { showSuccessSnackBar, showErrorSnackBar } from "./snackbars";

export const LOGIN_ACTIONS = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR'
}

export function login(payload) {
    return (dispatch) => {
        dispatch(showLoader(true))
        loginService.login(payload).then((response) => {
            if (response.ok) {
                response.json().then((result) => {
                    result.flag = true;
                    result.message = "Logged In Successfully"
                    dispatch((showSuccessSnackBar()))
                    dispatch(showLoader(false))
                })
            } else {
                console.log(response)
                let result = {
                    flag: true,
                    message: "Temporary Error Message!"
                }

                dispatch(showErrorSnackBar(result))
                dispatch(showLoader(false))

            }
        })
    }
}