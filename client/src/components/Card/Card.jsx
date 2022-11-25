import './card.css'
import React from "react";

const Card = ({name, image, temperaments, weight}) => {
return(
    <div className='divcard' >
      <div >
        <img className='imgsize' src={`${image}`} alt={`imagen de: ${name}`}/>
      </div>
      <p className='textcolors' >Name: {name}</p>
      <p className='textcolors' >Temperaments:
        {
        temperaments.map((temps) => <span className='textcolorst' key={temps+Math.random}> {temps}</span>)
        }
        </p> 
      
      <p className='textcolors'>Weight: {weight} Kg
      </p>
      
    </div>

)
}
export default Card