export const login = (user) => {
    return {
        type: "SET_LOGIN",
        payload: {
            authUser: user,
        },
    };
};
export const logout = () => {
    return {
        type: "SET_LOGOUT",
        payload: {
            authUser: null,
        },
    };
};