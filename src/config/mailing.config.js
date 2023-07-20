import nodemailer from 'nodemailer'
import config from './config.js'
const transporter = nodemailer.createTransport({
    service:'gmail',
    port:587,
    auth:{
        user:config.userEmail,
        pass:config.passEmail
    }

})

async function sendEmail(email){
await transporter.sendMail({        
        from:email.from,
        to:email.to,
        subject:email.subject,
        html:email.html,

    })
}

    export{transporter,sendEmail}