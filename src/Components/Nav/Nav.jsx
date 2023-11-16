import React from "react";
import styles from './Nav.module.css';
import { Link } from "react-router-dom";

export default function Nav(){

    return (
      <>
        <nav className="navbar navbar-expand-lg bg-main">
          <div className="container">
            <Link className="navbar-brand text-gray" to={"/"}>
              <b>Xtend</b>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active text-gray" to={"/"}>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-gray" to={"/summary"}>
                    Summary
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active text-gray" target="_blank" href="https://www.linkedin.com/in/hazemaamer/">
                    Contact Me
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
} 