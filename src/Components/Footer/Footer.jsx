import "./Footer.scss";

const Footer = () => {
    return(
        <footer className="footer">
            <div
                style={{
                    width: "20px",
                    height: "3px",
                    background: "linear-gradient(90deg, transparent, rgb(160, 96, 240))"
                }}
            ></div>
            <p>Miloš Žvan - &copy; 2026</p>
            <div
                style={{
                    width: "20px",
                    height: "3px",
                    background: "linear-gradient(90deg, transparent, rgb(58, 138, 240))"
                }}
            ></div>
        </footer>
    )
}
export default Footer;
