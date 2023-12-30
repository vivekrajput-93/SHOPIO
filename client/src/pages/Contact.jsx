import React, { useState } from "react";
import Layout from "../components/Layouts/Layout";
import "../CSS/Contact.css";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PlaceIcon from "@mui/icons-material/Place";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Grid } from "@mui/material";

const Contact = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const accordionItems = [
    {
      title: "What kinds of products do you offer?",
      content: " Our e-commerce platform features a diverse range of products, from electronics and fashion to home essentials and more. Explore our catalog for a wide array of choices to suit your needs.",
    },
    {
      title: " How long does delivery take?",
      content: "We prioritize swift delivery! Depending on your location and product availability, deliveries typically take 2 days. Rest assured, we strive for timely shipments.",
    },
    {
      title: "How can I contact customer support?",
      content: " Our dedicated support team is available 24 hours a day, 7 days a week. Reach out via our chat feature on the website or email us at support1729@email.com",
    },
    {
      title: " What is your return policy?",
      content: "We have a hassle-free return policy. If your purchase doesn't meet expectations, simply return it within 7 days for a refund or exchange.",
    },
    {
      title: "What payment methods do you accept?",
      content: " We accept various payment methods, including credit/debit cards, PayPal, and other secure options, ensuring a smooth checkout process.",
    },
    {
      title: " Is my personal information secure?",
      content: "Your security is our priority. We employ robust encryption methods to safeguard your data, ensuring a safe and secure shopping environment.",
    },
  ];

  const itemsInRows = Array.from(Array(3), (_, row) => (
    <Grid container spacing={2} key={row}>
      {accordionItems.slice(row * 2, row * 2 + 2).map((item, col) => (
        <Grid item xs={6} key={col}>
          <div className="accord-item">
            <div
              className={`accord-item-header ${
                activeIndex === row * 2 + col ? "active" : ""
              }`}
              onClick={() => toggleAccordion(row * 2 + col)}
            >
              {item.title}
              {activeIndex === row * 2 + col ? (
                <ExpandLessIcon className="arrowUp" />
              ) : (
                <ExpandMoreIcon className="arrowdown" />
              )}
            </div>
            <hr />
            {activeIndex === row * 2 + col && (
              <div className="accord-item-content">{item.content}</div>
            )}
          </div>
        </Grid>
      ))}
    </Grid>
  ));

  return (
    <Layout>
      <div className="main">
        <div className="contact">
          <h2 className="contact-heading">Get in Touch !</h2>
          <div className="contact-cards">
            <section className=" slide card-one">
              <span>
                <PhoneEnabledIcon />
              </span>
              <span>+91 9457233321</span>
              <span>+91 9784372211</span>
            </section>
            <section className="slide card-two">
              <span>

                <MailOutlineIcon />
              </span>
              <span>vivekraj93@gmail.com</span>
              <span>support1729@gmail.com</span>
            </section>
            <section className="slide card-three">
              <span>
                <PlaceIcon />
              </span>
              <span>1-14, Suryanagar Colony</span>
              <span>Hyderabad, India</span>
            </section>
          </div>
        </div>
        <div className="accord">
          <h1 className="text">Frequently Asked Question !</h1>
          {itemsInRows.map((row, index) => (
            <div key={index}>{row}</div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
