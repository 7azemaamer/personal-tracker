import React from "react";
import styles from './Layout.module.css';
import Nav from "../Nav/Nav";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout(){
    return <>
        <Nav/>
        <div className={`${styles["min-height"]} py-5 container`}>
            <Outlet/>
        </div>
        <Footer/>
    </>
} 