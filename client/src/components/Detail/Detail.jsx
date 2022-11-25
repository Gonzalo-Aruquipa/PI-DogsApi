import './detail.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { getDetail } from '../../actions';


const Detail = () => {
    const dispatch = useDispatch();
    const details = useSelector(state => state.dogsDetail);
    const {id} = useParams();

    useEffect(() => {
      dispatch(getDetail(id))
    }, [dispatch, id])

    let name, height, weight, temperaments = [], life_span, image;
    if(details[0]){
         name= details[0].name;
         height = details[0].height;
         weight = details[0].weight;
         temperaments = details[0].temperaments;
         life_span = details[0].life_span;
         image = details[0].image;
    }

  return (
    <div className='colorfon'>
      <div className='divd'>
        <Link to='/home'>
        <button className='botonhome '></button>
        </Link>
        </div>
      <div className='div-container'>
        
      <div >
        <img  className='imgsized' src={`${image}`} alt={`imagen de: ${name}`}/>
      </div>
      <p className='text-div'>Name</p>
      <span className='div-text'>{name}</span>
      <p className='text-div'>Height</p>
      <span className='div-text'> {`${height && height[0]} - ${height && height[1]} Cm`}</span>
      <p className='text-div'>Weight</p>
      <span className='div-text'>{`${weight && weight[0]} - ${weight && weight[1]} Kg`}</span>
      <p className='text-div'>Life Span</p>
      <span className='div-text'>{life_span}</span>
      <p className='text-div'>Temperaments</p>
      <span className='div-text'> 
        {
        temperaments.map((temps) => <span key={temps+Math.random}> {temps}</span>)
        }
      </span>
      </div>
    </div>
  )
}

export default Detail