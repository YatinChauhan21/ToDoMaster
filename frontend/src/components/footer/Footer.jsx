import React from 'react'
import './footer.css'
function Footer() {
  return (
    <footer className="footer">
    <div className="container">
      <h4 className="footer-title">TaskMaster</h4>
      <p className="footer-text">&copy; {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer
