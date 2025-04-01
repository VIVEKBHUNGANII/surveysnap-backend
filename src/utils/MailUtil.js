//to,from,subject,text
const mailer = require("nodemailer");

///function

const sendingMail = async (to, subject, text) => {
  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "vivektest9640@gmail.com",
      pass: "mzil wfom ucfl ghsl",
    },
  });

  const mailOptions = {
    from: "vivektest9640@gmail.com",
    to: to,
    subject: subject,
    // text: text,
    html: text,
  };

  const mailresponse = await transporter.sendMail(mailOptions);
  console.log(mailresponse);
  return mailresponse;
};

module.exports = {
  sendingMail,
};
// sendingMail("vivekpatel9640@gmail.com", "Test Mail", "this is test mail");
