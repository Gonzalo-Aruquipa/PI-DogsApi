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
    <div >
        <div>
        <Link to='/home'>
        <button >Home</button>
        </Link>
        </div>
      <div className='grid'>
        <img  src={`${image}`} alt={`imagen de: ${name}`}/>
      </div>
      <h2>Name: {name}</h2>
      <h2>Height: {`${height && height[0]} - ${height && height[1]} Cm`}</h2>
      <h2>Weight: {`${weight && weight[0]} - ${weight && weight[1]} Kg`}</h2>
      <h2>Life Span: {life_span}</h2>
      <h2 >Temperaments: 
        {
        temperaments.map((temps) => <span key={temps+Math.random}> {temps}</span>)
        }
      </h2>
    </div>
  )
}

export default Detail