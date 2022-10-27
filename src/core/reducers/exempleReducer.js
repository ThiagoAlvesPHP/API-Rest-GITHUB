export const exempleInitialState = {
  name: '',
  age: 0
}

export const exempleReducer = (state, action) => {
  switch(action.type) {
    case 'CHANGE_ALL':
      return {...state, name: action.payload.name, age: action.payload.age};
    break;
  }

  return state;
}