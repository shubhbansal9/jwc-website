import React from 'react'
import { useNavigate } from 'react-router-dom'; 
import './Failure.css';
import Footer from '../components/footer';
const Failure = () => {
    const navigate = useNavigate()
    return (
        <div className="danger-container">
        <div className="alert-row justify-content-center">
          <div className="col-md-6 text-center">
              <div className="alert alert-danger text-center">
                  <h4 className="alert-heading">Oops, something went wrong!</h4>
              </div>
              <a className="alert-home" href='/'>Back to Home</a>
          </div>
        </div>
        <Footer/>
      </div>
      );
}

export default Failure