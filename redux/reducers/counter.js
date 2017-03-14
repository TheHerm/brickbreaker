
/* -----------------    CONSTANTS    ------------------ */
export const INCREMENT_COUNT = 'INCREMENT_COUNT';

/* ------------       REDUCER     ------------------ */
const initialState = 0
export const count = function(count = initialState, action){
  switch (action.type) {
    case INCREMENT_COUNT: {
      let newCount = ++count;
      return newCount;
    }
    default:{
      return count;
    } 
  }
}

/* ------------       ACTION CREATORS     ------------------ */
export const incrementCount = function(){
  return {
    type: INCREMENT_COUNT
  }
}