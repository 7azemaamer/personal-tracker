import React from "react";
import styles from './NotFound.module.css';

export default function NotFound(){

    return <>
        <div className="container mt-5 d-flex justify-content-center align-items-center">
            <div className="row text-center">
                <h2 className="fs-0">Error 404!</h2>
                <p>This page is not found</p>
            </div>
        </div>
    </>
} 