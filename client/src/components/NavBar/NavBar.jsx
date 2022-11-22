import './navbar.css'
import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
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
    <header>
        <div>
          <nav className="site-header" >
              <div>
                {/* <NavLink  to={"/home"}>Home</NavLink> */}

              </div>
                <div className='div'>
                  <p>Show Alphabetically</p> 
                <select onChange={handleAlphabetic} defaultValue={'DEFAULT'} >
                <option value="DEFAULT" disabled >---</option>
                <option value="AZ">A-Z</option>
                <option value="ZA">Z-A</option>
              </select>
                </div>

              <div className='div'>
                <p>Show by weight</p> 
                <select onChange={handleWeight} defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled>---</option>
                <option value="max">Max</option>
                <option value="min">Min</option>
              </select>
              </div>

              <div className='div'>
                <p>Show By Temperaments</p>
                <select onChange={handleTemperaments } defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled>---</option>
                 {
                  temps.map(temperament => 
                    <option value={temperament.name} key={temperament.id}>{temperament.name}</option>
                  )
                 }
                </select>
              </div>

              <div className='div'>
               <p>filter by createds</p>
                <select onChange={handleCreated} defaultValue={'DEFAULT'}>
                 <option value="DEFAULT" disabled >---</option>
                 <option value="created">Dogs Created</option>
                 <option value="apiDogs">Dogs Api</option>
                </select>
              </div>

              <div className='div'>
              <input type="text" value={dogName} onChange={handleChange} placeholder='Search...'/>
              <button type='submit' onClick={handleSubmit}>Search</button>
              </div>

              <div>
              <NavLink exact to={"/createDog"}>Create dog</NavLink>
              </div>
          </nav>
        </div>
    </header>
  )
}

export default NavBar