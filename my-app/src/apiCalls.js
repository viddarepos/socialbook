import axios from "axios";

export const loginCall = async (user, dispatch) => {
    dispatch({ type: "LOGIN_START" });


    //pravim request
    try {
        const response = await axios.post("auth/login", user)
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data })
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err })

    }
}

export const registerCall = async (user, dispatch) => {
    dispatch({ type: "REGISTER_START" });

    try {
        const response = await axios.post("auth/register", user)
        dispatch({ type: "REGISTER_SUCCESS", paload: response });
    }
    catch (err) {
        dispatch({ type: "REGISTER_FAILURE", payload: err })
    }
}