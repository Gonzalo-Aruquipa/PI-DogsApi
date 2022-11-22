import './card.css'
import React from "react";

const Card = ({name, image, temperaments, weight}) => {
return(
    <div >
      <div >
        <img  src={`${image}`} alt={`imagen de: ${name}`}/>
      </div>
      <h2 className='div'>Name: {name}</h2>
      <div >Temperaments: 
        {
        temperaments.map((temps) => <span key={temps+Math.random}> {temps}</span>)
        }
      </div>
      <div>Weight: {weight} Kg
      </div>
      
    </div>

)
}
export default Card