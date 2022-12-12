import './createdog.css'
import React from 'react'
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom'
import { getTemperaments, postDog, startUploadingFile } from '../../actions';
import {IconButton} from "@mui/material";
import {UploadOutlined} from "@mui/icons-material"
import { useRef } from 'react';
import SweetAlert2 from "react-sweetalert2"
import { useHistory} from "react-router-dom";

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
  const images_c = useSelector(state => state.images);
  const navigate = useHistory();

  const [swalProps, setSwalProps] = useState({});

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
    form.image = images_c;
    dispatch(postDog(form));
    navigate.push("/home");

    // alert("Dog successfully created");
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

  

  const fileInputRef = useRef();
  const onFileInputChange = ({target}) => {
    if(target.files === 0) return;
    dispatch(startUploadingFile(target.files));

  }
  
  return (
    <div className='divglobal'>
              <div className='divdc'>
                <Link to='/home'>
                <button className='botonhomec '></button>
                </Link>
              </div>


                <form  action="" id='form' onSubmit={handleSubmit}>

               <div className='div-containerc'>
                 <div  className='div'>
                 <label className='tem'>Name</label>
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
                 <label className='tem'> Height - min</label>
                 <input 
                 type="number"
                 name='min_height'
                 value={form.min_height}
                 min='0'
                 required
                 onChange={handleInputChange}/>
                 {errors.min_height && (<p className="danger">{errors.min_height}</p>)}

                 <label className='tem'> Height - max</label>
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
                 <label className='tem'> Weight - min</label>
                 <input 
                 type="number"
                 name='min_weight'
                 value={form.min_weight}
                 min='0'
                 required
                 onChange={handleInputChange}/>
                 {errors.min_weight && (<p className="danger">{errors.min_weight}</p>)}

                 <label className='tem'> Weight - max</label>
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
                 <label className='tem'> Life span</label>
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
                 <label className='tem'> Image</label>
                 <input
                 type = "file"
                 ref = {fileInputRef}
                 onChange = {onFileInputChange}
                 style = {{ display: "none"}} 
                 />
                 <IconButton
                 color='primary'
                onClick={()=> fileInputRef.current.click()}
                 >
                  <UploadOutlined/>
                 </IconButton>
                 </div>

                 <div className='div'>
                 <label className='tem'>Add Temperaments</label>
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


            </form>
            <div className='divcv'>
            {/* <button 
            className='botonnc'
            type='submit'
            form='form'>Create Dog
            </button> */}
            <button  className='botonnc'
             type='submit'
             form='form'
             onClick={() => {
              setSwalProps({
                  show: true,
                  title: '¡El Perro ha sido creado exitosamente!',
                  icon: 'success',
              });
          }}
             >
                Create Dog
            </button>

            <SweetAlert2 {...swalProps} />
            </div>


            <div >
              <div >
              <h3 className='tem'> Selected Temperaments</h3>
              </div>
              <div className='div-containercc'>
              {form.temperaments.map(temperament => 
              <div  key={temperament} onClick={() => handleDelete(temperament)}>
              <p className='tem'>{`${temperament} |`}</p>
              </div>    
              )}
              </div>
              </div>

              <div>
            

            
        </div>
    </div>
  )
}

export default CreateDog
