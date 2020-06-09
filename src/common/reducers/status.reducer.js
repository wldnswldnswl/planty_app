
const LOGIN = 'LOGIN';

const LOGOUT = 'LOGOUT';



// Action Creators

export const login = () => ({ type: LOGIN });

export const logout = () => ({ type: LOGOUT });



const initialState = {

  status: 0

};



export default function isLogin(state = initialState, action) {

  switch (action.type) {

    case LOGIN:

      return {

        ...state,

        status : 1

      };

    case LOGOUT:

      return {

        ...state,

        status : 0

      };

    default:

      return state;

  }

};