const initialState = {
  dogsAll: [],
  dogsCreated: [],
  dogsDetail: [],
  temperaments: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DOGS_ALL":
      return {
        ...state,
        dogsAll: action.payload,
      };

    case "GET_DOGS_QUERY":
      return {
        ...state,
        dogsAll: action.payload,
      };
    case "GET_CREATE_DOGS":
      return {
        ...state,
        dogsAll: action.payload,
      };
    case "GET_DOGS_API":
      return {
        ...state,
        dogsAll: action.payload,
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "GET_TEMPERAMENTS_FILTER":
      return {
        ...state,
        dogsAll: action.payload,
      };
    case "GET_ALPHABETIC":
      return {
        ...state,
        dogsAll: action.payload,
      };
    case "GET_MIN_MAX":
      return {
        ...state,
        dogsAll: action.payload,
      };
    case "DOG_DETAIL":
      return {
        ...state,
        dogsDetail: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
