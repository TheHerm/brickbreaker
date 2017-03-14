
/* -----------------    CONSTANTS    ------------------ */

export const INCREMENT_COUNT = 'INCREMENT_COUNT';

/* ------------       REDUCER     ------------------ */
const initialState = 0
export default function reducer (count = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNT: {
      return count++;
    }
    default: return groups;
  }
}