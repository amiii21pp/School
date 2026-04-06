const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("Missing required fields");
  }

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});