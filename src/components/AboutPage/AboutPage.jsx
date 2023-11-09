import React from 'react';
import './AboutPage.css'

function AboutPage() {
  return (
    <div className="container">
      <div className='pagetitle'>
        <h1> About </h1>
      </div>

      <div className="text-container">
        <div className='technologies'>
          <h2>Technologies Used:</h2>
          <ul>
            <li>JavaScript</li>
            <li>React</li>
            <li>Amazon Web Services (Amazon S3) </li>
            <li>Redux</li>
            <li>Saga</li>
            <li>Node.js</li>
            <li>Express</li>
            <li>PostgreSQL</li>
            <li>Material UI</li>
            <li>Passport</li>
          </ul>
        </div>
        <div className='future-goals'>
          <h2>Future Goals:</h2>
          <ul>
            <li>Add ability to upload multiple Images and short video </li>
            <li>Add categories for the bucket list and separate those
              categories between short term, medium, and long term goals. </li>
          </ul>
        </div>
      </div>

    </div>
  );
}

export default AboutPage;