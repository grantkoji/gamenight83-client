import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
const Footer = () => {

    // <em>Flatiron 2020, Powered with </em>
    // <i class='devicon-react-original-wordmark'></i>
//     <small className='footer-right'>
//     <em>6Feet Productions</em>
// </small>
    return (
        <Navbar fixed='bottom' className='footer'>
            <small className='footer-left'>6------Feet------Productions</small>    
        </Navbar>
    )
}
export default Footer;