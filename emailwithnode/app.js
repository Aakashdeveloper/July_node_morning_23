let nodemailer = require('nodemailer');
let dotenv = require('dotenv');
dotenv.config();

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'ahanda205@gmail.com',
        pass:process.env.PASS
    }
})

let mailOption = {
    form:'ahanda205@gmail.com',
    to:'ahanda206@hotmail.com',
    subject:'Sending Email July Node',
    text:'This is text and test email'
}

transporter.sendMail(mailOption,(err,info) => {
    if(err) console.log(err)
    else{
        console.log(`Email Sent: ${info.response}`)
    }
})