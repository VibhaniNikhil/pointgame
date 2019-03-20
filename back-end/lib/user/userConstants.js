const messages = {
    SuccessAddUserData: "You have successfully added",
    SuccessGetUserData: "Your data getting successfull",
    SuccessUpdateUserData: "Your data updated successfully",
    ErrrorAddUserData: "Your data not adding",
    ErrrorGetUserData: "Your data not getting",
    ErrrorUpdateUserData: "Your data not updating",
};
  
const codes = {
    SUCCESS: 200,
    BADREQUEST: 400,
    FORBIDDEN: 403,
    NOTFOUND: 404,
    INTRNLSRVRERR: 500,
}

module.exports = {
    MESSAGES: messages,
    CODES: codes    
}