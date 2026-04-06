const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amiyprakash0@gmail.com",
        pass: "jaflgtjduvoclqwr"
      }
    });

    await transporter.sendMail({
      from: "amiyprakash0@gmail.com",
      to: "amiyprakash0@gmail.com",
      replyTo: email,
      subject: "New Contact Form Submission",
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
      `
    });

    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).send("Error sending email");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});