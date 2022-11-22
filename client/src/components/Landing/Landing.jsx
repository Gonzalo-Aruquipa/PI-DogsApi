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
            <button className="boton" onClick={clickHome}>Iniciar</button>
            </div>
    )
}