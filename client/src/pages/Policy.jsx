import React from "react";
import Layout from "../components/Layouts/Layout";
import "../CSS/Policy.css";

const Policy = () => {
  return (
    <Layout>
      <div className="main-section">
        <h4 className="text-center about-heading">Policy Privacy</h4>
        <div className="card-policy">
          <div className="card-left">
            <ul>
              <li>Getting Started</li>
              <li>Overview</li>
            </ul>
            <ul>
              <li>Privacy</li>
              <li>Shopio private policy</li>
              <li>Policy FAQ</li>
            </ul>
            <ul>
              <li>Data Request</li>
              <li>Data request policy</li>
              <li>Data request overview</li>
              <li>Transparency report</li>
            </ul>
            <ul>
              <li>Compliance</li>
              <li>Cookie policy</li>
              <li>Shopio's GDPR commitment</li>
              <li>
                California consumer privacy act
                <br />
                (CCPA) FAQ
              </li>
              <li>CCPA metric disclosure</li>
            </ul>
          </div>
          <div className="card-right">
            <section className="policy-text">
              <h5>Effective date: 14th December 2023</h5>
              <p>
                This Privacy Policy describes how Shopio collects, uses and
                discloses information and what choices you have with respect to
                the information.
              </p>
              <p>
                When we refer to "Shopio", we mean the Shopio entity that acts as
                the controller or processor of your information, as explained in
                more detail in the "Identifying the Data Controller and
                Processor" section below.
              </p>
            </section>
            <section className="policy-table">
              
              <ul className="policy-table">
              <li>Table of contents:</li>
                <li>Applicability of this Privacy Policy</li>
                <li>Information we collect and receive</li>
                <li>How we use information</li>
                <li>Data retention</li>
                <li>How we share and disclose information</li>
                <li>Security</li>
                <li> Age limitations</li>
                <li> Changes to this Privacy Policy</li>
                <li>International data transfers</li>
                <li> Data Protection Officer</li>
                <li> Identifying the Data Controller and Processor</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
