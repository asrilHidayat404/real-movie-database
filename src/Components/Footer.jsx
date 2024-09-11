const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h3>Real-Movie Database</h3>
        </div>
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="footer-social">
          <a href="https://mobile.facebook.com/alvin.ucihasharinggan?eav=AfYXV5FfMzMItwRuXbNI-dXcDg9v-hHaTGbh8pTlEe3_y8vtbRpxxeCY1uSSD1rWARA&paipv=0" className="fa fa-facebook" target="_blank"></a>
          <a href="https://wa.me/6281249356051" className="fa fa-whatsapp" target="_blank"></a>
          <a href="#" className="fa fa-instagram"></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Real-Movie Database. Copyright Protected.</p>
      </div>
    </footer>
  )
}

export default Footer
