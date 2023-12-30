import React, {useEffect, useState} from 'react'
import Layout from "../components/Layouts/Layout.jsx"
import "../CSS/About.css";

const About = () => {
  const [counter, setCounter] = useState({
    products: 0,
    ratedProducts: 0,
    categories: 0
  });

  useEffect(() => {
    const finalValues = {
      products: 5000,
      ratedProducts: 800,
      categories: 40
    };

    const duration = 1500; // Duration for the count animation in milliseconds
    const interval = 50; // Interval for each step in the animation

    const counters = { ...counter };
    Object.keys(finalValues).forEach(key => {
      let count = 0;
      const step = Math.ceil(finalValues[key] / (duration / interval));
      const intervalId = setInterval(() => {
        count += step;
        if (count >= finalValues[key]) {
          count = finalValues[key];
          clearInterval(intervalId);
        }
        counters[key] = count;
        setCounter({ ...counters });
      }, interval);
    });

    
  }, []);
  return (
    <Layout>
      <>
        <h1 className="about-heading">About Us !</h1>
        <div className='about-card'>
          <div className='left'>
            <h2>We are you favourite Store.</h2>
            <p>At Shopio, we're passionate about delivering an unparalleled shopping experience. With a commitment to convenience, quality, and customer satisfaction, we bring together a vast array of products tailored to your needs.
              <br/>
              
               It's a destination where innovation meets affordability. We strive to make every click an adventure, ensuring seamless transactions, timely deliveries, and a delightful journey from browsing to unboxing.</p>
          </div>
          <div className='right'>
            <img src='/assets/About.jpg' alt='about' className='about' />
          </div>
        </div>
        <section className='about-product'>
        <ul className='about-list'>
          <li className='about-li'>
            <span>Numbers Speak For <br /> Themselves!</span>
          </li>
          <li className='about-li'>
            <span>{counter.products}+</span>
            <span>Curated Products</span>
          </li>
          <li className='about-li'>
            <span>{counter.ratedProducts}+</span>
            <span>Rated Products</span>
          </li>
          <li className='about-li'>
            <span>{counter.categories}+</span>
            <span>Product Categories</span>
          </li>
        </ul>
      </section>
      </>
    </Layout>
  )
}

export default About