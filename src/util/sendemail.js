async function sendVerificationEmail(to,subject,body){
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"your_email",
            pass:"your_password"
        }
    });

    const mailOptions = {
        from:"your_email",
        to,
        subject,
        html:body
    };

    await transporter.sendMail(mailOptions)

}

export default sendVerificationEmail;