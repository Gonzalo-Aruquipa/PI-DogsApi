import './navbar.css'
import React, {useState, useEffect} from 'react'
import { Link} from 'react-router-dom'
import { getDogsQuery, getCreateDogs, getDogsApi,getTemperaments, getTemperamentsFilter, getAlphabetic, getWeight} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';


const NavBar = () => {
  const dispatch= useDispatch();
  const [dogName, setDogName] = useState("");
  const temps = useSelector(state => state.temperaments);
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  //filter by create
  const handleChange = (e) => {
    e.preventDefault()
    setDogName(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogsQuery(dogName));

  }
 //filter by dogs created or dogs from api
  const handleCreated = (e) => {
    switch (e.target.value) {
      case "apiDogs":
        dispatch(getDogsApi());
        break;
      case "created":
        dispatch(getCreateDogs());
        break;
    }
  }

  //filter by temperaments
  const handleTemperaments = (e) => {
    e.preventDefault();
    dispatch(getTemperamentsFilter(e.target.value));
  }
  //filter by alphebetic
  
  const handleAlphabetic = (e) => {
    e.preventDefault();
    dispatch(getAlphabetic(e.target.value));
  }

  //filter by weight
  
  const handleWeight = (e) => {
    e.preventDefault();
    dispatch(getWeight(e.target.value));
  }



  return (
    <header >
        <div >
          <nav className="site-header " >
              

                <div className='divv'>
                  <p className='text'>Show Alphabetically</p> 
                <select className='selectfilter' onChange={handleAlphabetic} defaultValue={'DEFAULT'} >
                <option value="DEFAULT" disabled >---</option>
                <option value="AZ">A-Z</option>
                <option value="ZA">Z-A</option>
              </select>
                </div>

              <div className='divv'>
                <p className='text'>Show by Weight</p> 
                <select className='selectfilter' onChange={handleWeight} defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled>---</option>
                <option value="max">Max</option>
                <option value="min">Min</option>
              </select>
              </div>

              <div className='divv'>
                <p className='text'>Show By Temperaments</p>
                <select  className='selectfilter' onChange={handleTemperaments } defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled>---</option>
                 {
                  temps.map(temperament => 
                    <option value={temperament.name} key={temperament.id}>{temperament.name}</option>
                  )
                 }
                </select>
              </div>

              <div className='divv'>
               <p className='text'>Filter by Createds</p>
                <select className='selectfilter' onChange={handleCreated} defaultValue={'DEFAULT'}>
                 <option value="DEFAULT" disabled >---</option>
                 <option value="created">Dogs Created</option>
                 <option value="apiDogs">Dogs Api</option>
                </select>
              </div>

              <div className='divv'>
              <button className='botonnn' type='submit' onClick={handleSubmit}>Search</button>
              <input  className='search' type="text" value={dogName} onChange={handleChange} placeholder='Search...'/>
              </div>


              
              <div className='divv'>
              <Link to='/createDog'>
              <button className='botonn'>Create Dog</button>
              </Link>
              </div>
          </nav>
        </div>
    </header>
  )
}

export default NavBar