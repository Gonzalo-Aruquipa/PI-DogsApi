import "./landing.css"
import React from "react";
import { useHistory } from "react-router-dom";

export default function Landing(){

    const history = useHistory();
    const clickHome=() =>{
        history.push("/home")
    }
    return(
            <div  className="landing">
                <div className="divi">
            <button className="boton" onClick={clickHome}>Go Home</button>

                </div>
            </div>
    )
}