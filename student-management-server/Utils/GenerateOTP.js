exports.generateOTP = ()=>{
    let OTP = '';
    for (let i = 0; i <= 3; i++) {
              let ranVal = Math.round(Math.random()*9);
              OTP = OTP+ranVal;
    }
    return OTP;
  }


//   function generateOTP(otp_length) {
//     // Declare a digits variable which stores all digits
//     var digits = "0123456789";
//     let OTP = "";
//     for (let i = 0; i < otp_length; i++) {
//         OTP += digits[Math.floor(Math.random() * 10)];
//     }
//     return OTP.toString();
// }

// function generateCourseCode() {
//     // Declare a characters variable which stores all characters
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let courseCode = "";
//     for (let i = 0; i < 6; i++) {
//         courseCode += characters[Math.floor(Math.random() * characters.length)];
//     }
//     return courseCode.toString();
// }
