import axios from "axios";
export const getDogsAll = () => {
    return async function (dispatch) {
        try{
        const response = await axios.get(`http://localhost:3001/dogs`);
        return dispatch({
            type: "GET_DOGS_ALL",
            payload: response.data
        });
    }catch(error){
        console.log(error)
    }
    };
};

export const getDogsQuery= (name) => {
    return async function (dispatch) {
        try{
        const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({
            type: "GET_DOGS_QUERY",
            payload: response.data
        });
    }catch(error){
        console.log(error)
    }
    };
};

export const getCreateDogs = () => {
    
    return async function (dispatch) {
        try{
        const response = await axios.get(`http://localhost:3001/dogs/created`);
        return dispatch({
            type: "GET_CREATE_DOGS",
            payload: response.data,
        });
    }catch(error){
        console.log(error)
    }
    };
};
export const getDogsApi= () => {
    
    return async function (dispatch) {
        try{
        const response = await axios.get(`http://localhost:3001/dogs/api`);
        return dispatch({
            type: "GET_DOGS_API",
            payload: response.data,
        });
    }catch(error){
        console.log(error)
    }
    };
};
export const  getTemperaments = () => {
    return async function (dispatch) {
        try{
        const response = await axios.get(`http://localhost:3001/temperaments`);
        return dispatch({
            type: "GET_TEMPERAMENTS",
            payload: response.data,
        });
    }catch(error){
        console.log(error)
    }
    };
};
//filter by temperaments
export const  getTemperamentsFilter = (temp) => {
        return async function (dispatch) {
            try{
            const response = await axios.get(`http://localhost:3001/dogs`);
            if(temp){
                const filterDogs = response.data.filter(dog => dog.temperaments.includes(temp));
                return dispatch({
                    type: "GET_TEMPERAMENTS_FILTER",
                    payload: filterDogs
                });
            }else{
                const filterDogs = response.data.map(dog => {return {id:dog.id, name: dog.name, temperaments: dog.temperaments, weight: dog.weight, image: dog.image}});
                return dispatch({
                    type: "GET_TEMPERAMENTS_FILTER",
                    payload: filterDogs
                });
        }
        }catch(error){
            console.log(error)
        }
        };
};

//order by alphabetic
export const getAlphabetic= (alpha) => {
    return async function (dispatch) {
        try{
        const response = await axios.get(`http://localhost:3001/dogs`);
        if(alpha === "AZ"){
            const filterDogs = response.data.sort((a,b)=> a.name.toLowerCase().toString() - b.name.toLowerCase().toString()).map(dog => dog);
            return dispatch({
                type: "GET_ALPHABETIC",
                payload: filterDogs
            });
            
        }else{
            const filterDogs = response.data.sort((a,b)=> a.name.toLowerCase().toString() - b.name.toLowerCase().toString()).reverse().map(dog => dog);
            return dispatch({
                type: "GET_ALPHABETIC",
                payload: filterDogs
            });
            }

        
    }catch(error){
        console.log(error)
    }
    };
};

//order by weight
export const getWeight= (minmax) => {
    return async function (dispatch) {
        try{
        const response = await axios.get(`http://localhost:3001/dogs`);

        if(minmax === "max"){
            const filterDogs = response.data.sort((a,b)=> a.weight[0] - b.weight[0]).reverse().map(p => p);
            return dispatch({
                type: "GET_MIN_MAX",
                payload: filterDogs
            });
            
        }else{
            const filterDogs = response.data.sort((a,b)=> a.weight[0] - b.weight[0]).map(p => p);
            return dispatch({
                type: "GET_MIN_MAX",
                payload: filterDogs
            });
        }
        
    }catch(error){
        console.log(error)
    }
    };
};
// dog create

export const postDog = (data) => {
    return async function () {
        
        const dogs = await axios.post(`http://localhost:3001/dogs`,data);
        return dogs
    
    };
};
//show detail
export const getDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/dogs/${id}`);
            console.log(response)
        return dispatch({
            type: "DOG_DETAIL",
            payload: response.data
        });
        } catch (error) {
            console.log(error);
        }
    }
};
