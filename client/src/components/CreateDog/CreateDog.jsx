import './createdog.css'
import React from 'react'
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom'
import { getTemperaments, postDog } from '../../actions';


export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Name is required';
  } else if (!/[ a-zA-Z]/.test(input.name)) {
    errors.name = 'Invalid name, no characters or numbers allowed';
  }
  //height
  if (!input.min_height) {
    errors.min_height = 'Height min is required';
  } else if (!/[ 0-9]/.test(input.min_height)) {
    errors.min_height = 'Invalid number, no characters';
  }

  if (!input.max_height) {
    errors.max_height = 'Height max is required';
  } else if (!/[ 0-9]/.test(input.max_height)) {
    errors.max_height = 'Invalid number, no characters';
  }
  //weight
  if (!input.min_weight) {
    errors.min_weight = 'Weight min is required';
  } else if (!/[ 0-9]/.test(input.min_weight)) {
    errors.min_weight = 'Invalid number, no characters';
  }

  if (!input.max_weight) {
    errors.max_weight = 'Weight max is required';
  } else if (!/[ 0-9]/.test(input.max_weight)) {
    errors.max_weight = 'Invalid number, no characters';
  }
  //life_span
  if (!input.life_span) {
    errors.life_span = 'Life span is required';
  }
  
  return errors;
};



const CreateDog = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector(state => state.temperaments);

  // const [button, setButton] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperaments: []
  });
  const [form, setForm] = useState({
      name: "",
      min_height: "",
      max_height: "",
      min_weight: "",
      max_weight: "",
      life_span:  "",
      image: "",
      temperaments: [],
  })
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  let handleInputChange = (e) =>{
  setForm({...form,[e.target.name]: e.target.value});
  setErrors(validate({...form,[e.target.name]: e.target.value}));
  }

  const handleSelect = (e) => {
      setForm({
          ...form,
          temperaments: [...form.temperaments, e.target.value]
      })
  }

  const handleDelete = (e) => {
    setForm({
        ...form,
        temperaments: form.temperaments.filter(temp => temp !== e)
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDog(form));
    alert("Dog successfully created");
    setForm({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperaments: []
    });
  }
  
  return (
    <div>
        <form  action="" id='form' onSubmit={handleSubmit}>
              <div>
                <Link to='/home'>
                <button >Home</button>
                </Link>
              </div>
            <div >
                


                <div  className='div'>
                <label > Name</label>
                <input
                className={errors.name && 'danger'} 
                type="text" 
                name='name' 
                value={form.name}
                required 
                onChange={ (e) => handleInputChange(e)}
                />
                {errors.name && (<p className="danger">{errors.name}</p>)}
                </div>
                

                <div  className='div'>
                <label > Height - min</label>
                <input 
                type="number"
                name='min_height'
                value={form.min_height}
                min='0'
                required
                onChange={handleInputChange}/>
                {errors.min_height && (<p className="danger">{errors.min_height}</p>)}

                <label > Height - max</label>
                <input 
                type="number"
                name='max_height'
                value={form.max_height}
                min={form.min_height}
                required
                onChange={handleInputChange}/>
                {errors.max_height && (<p className="danger">{errors.max_height}</p>)}
                </div>

                
                <div  className='div'>
                <label > Weight - min</label>
                <input 
                type="number"
                name='min_weight'
                value={form.min_weight}
                min='0'
                required
                onChange={handleInputChange}/>
                {errors.min_weight && (<p className="danger">{errors.min_weight}</p>)}

                <label > Weight - max</label>
                <input 
                type="number"
                name='max_weight'
                value={form.max_weight}
                min={form.min_weight}
                required
                onChange={handleInputChange}/>
                {errors.max_weight && (<p className="danger">{errors.max_weight}</p>)}
                </div>

                <div  className='div'>
                <label > Life span</label>
                <input 
                type="text"
                placeholder='example: 1 - 2 years'
                name='life_span'
                value={form.life_span}
                required
                onChange={handleInputChange}/>
                {errors.life_span && (<p className="danger">{errors.life_span}</p>)}
                </div>

                <div  className='div'>
                <label > Image</label>
                <input 
                type="text"
                placeholder='Enter url of your image'
                name='image'
                value={form.image}
                onChange={handleInputChange}/>
                </div>

                <div className='div'>
                <p>Show By Temperaments</p>
                <select onChange={handleSelect} defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled>---</option>
                 {
                  temperaments.map(temperament => 
                    <option value={temperament.name} key={temperament.id}>{temperament.name}</option>
                  )
                 }
                </select>
                </div>

                

                
            </div>


            
            <button 
            type='submit'
            // onChange={handleSubmit}
            form='form'>Create Dog</button>
        </form>
        <div >
              <div >
              <h2>Temperaments</h2>
              </div>
              <div>
              {form.temperaments.map(temperament => 
              <div  key={temperament} onClick={() => handleDelete(temperament)}>
              <p>{`${temperament} X`}</p>
              </div>    
              )}
              </div>
              </div>
    </div>
  )
}

export default CreateDog