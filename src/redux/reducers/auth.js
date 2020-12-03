const authReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_LOGIN":
            return action.payload.authUser;
        case "SET_LOGOUT":
            return null;
        default:
            return state;
    }
};

export default authReducer;