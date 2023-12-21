import React, { useState } from 'react'
import Layout from '../components/Layouts/Layout'
import { useAuth } from '../context/auth'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Grid } from '@mui/material';
const Home = () => {
  const [auth, setAuth] = useAuth();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const accordionItems = [
    {
      title: 'Item 1',
      content: 'Content for Item 1...',
    },
    {
      title: 'Item 2',
      content: 'Content for Item 2...',
    },
    {
      title: 'Item 3',
      content: 'Content for Item 3...',
    },
    {
      title: 'Item 4',
      content: 'Content for Item 4...',
    },
    {
      title: 'Item 5',
      content: 'Content for Item 5...',
    },
    {
      title: 'Item 6',
      content: 'Content for Item 6...',
    },
  ];

  const itemsInRows = Array.from(Array(3), (_, row) => (
    <Grid container spacing={2} key={row}>
      {accordionItems.slice(row * 2, row * 2 + 2).map((item, col) => (
        <Grid item xs={6} key={col}>
          <div className="accordion-item">
            <div
              className={`accordion-item-header ${activeIndex === row * 2 + col ? 'active' : ''}`}
              onClick={() => toggleAccordion(row * 2 + col)}
            >
              {item.title}
              {activeIndex === row * 2 + col ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            {activeIndex === row * 2 + col && (
              <div className="accordion-item-content">{item.content}</div>
            )}
          </div>
        </Grid>
      ))}
    </Grid>
  ));

  return (
    <Layout>
   <div className="accordion">
      {itemsInRows.map((row, index) => (
        <div key={index}>{row}</div>
      ))}
    </div>

    </Layout>
  )
}

export default Home