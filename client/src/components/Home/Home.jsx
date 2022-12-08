import "./home.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { getDogsAll } from "../../actions";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

const Home = () => {
  //obtener el state
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogsAll);
  // const dogsAllCreated = useSelector(state  => state.dogsCreated);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const lastDogIndex = currentPage * dogsPerPage;
  const firstDogIndex = lastDogIndex - dogsPerPage;
  const currentDogs = dogs.slice(firstDogIndex, lastDogIndex);

  useEffect(() => {
    dispatch(getDogsAll());
  }, [dispatch]);

  return (
    <div className="colorback">
      <div>
        <NavBar />
      </div>
      <div>
        <Pagination
          totalDogs={dogs.length}
          dogsPerPage={dogsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      <div className="grid">
        {currentDogs.map((dog) => (
          <div key={dog.id}>
            <Link to={"/detail/" + dog.id}>
              {
                <Card
                  key={dog.id}
                  image={dog.image}
                  name={dog.name}
                  temperaments={dog.temperaments}
                  weight={`${dog.weight[0]} - ${dog.weight[1]}`}
                />
              }
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
