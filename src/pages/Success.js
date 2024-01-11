import React from 'react'
import './Success.css';
import Footer from '../components/footer';
const Success = () => {
    return (
      <div className='success-page'>
        <div className="success-container">
          <div className="alert-row justify-content-center">
            <div className="col-md-6 text-center">
                <div className="alert alert-success text-center">
                    <h4 className="alert-heading">Payment Successful. <br></br>A confirmation mail shall to your email id soon.</h4>
                </div>
                <a className="alert-home" href='/'>Back to Home</a>
            </div>
          </div>
          
        </div>
        <Footer/>
        </div>
      );
}

export default Success