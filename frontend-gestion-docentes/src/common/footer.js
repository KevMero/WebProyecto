import React from "react";

const Footer = props => {
    return (
    <footer className="footer">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 footer-copyright">
                    <p className="mb-0">{"Copyright 2020 © "}</p>
                </div>
                <div className="col-md-6">
                    <p className="pull-right mb-0">{"Administrador de empleados"}
                        <i className="fa fa-university"></i>
                    </p>
                </div>
            </div>
        </div>
</footer>
)};

export default Footer;