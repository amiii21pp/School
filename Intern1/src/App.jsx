import { useEffect, useState } from "react";
import Nav from "./components/Nav";

function App() {
  const images = [
    "/PHOTOS/Untitled.jpg",
    "/PHOTOS/Untitled2.jpg",
    "/PHOTOS/Untitled3.jpg"
  ];

  const [index, setIndex] = useState(0);

  const reviews = [
    {
      text: "Amazing teachers and great environment.",
      name: "Rahul"
    },
    {
      text: "Helped me improve academically and personally.",
      name: "Priya"
    },
    {
      text: "Best school experience I've had.",
      name: "Aman"
    }
  ];

  const [reviewIndex, setReviewIndex] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    const imgInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(imgInterval);
  }, []);

  useEffect(() => {
    const reviewInterval = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(reviewInterval);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED");

    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await res.text();
      alert(result);
    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  return (
    <>
      <Nav />

      <section
        id="home"
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(15,23,42,0.7), rgba(15,23,42,0.7)), url(${images[index]})`
        }}
      >
        <div className="hero-content">
          <h1>Heeralal Ramnivas Inter College</h1>
          <p>Shaping future leaders with knowledge and discipline</p>
        </div>
      </section>

      <section id="reviews" className="section">
        <h2>Student Reviews</h2>

        <div className="review-slider">
          <div className="review-card">
            <p>"{reviews[reviewIndex].text}"</p>
            <h4>- {reviews[reviewIndex].name}</h4>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <h2>Contact Us</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <textarea name="message" placeholder="Message" onChange={handleChange}></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </>
  );
}

export default App;