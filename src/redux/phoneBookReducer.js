import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  filter: '',
};

const phoneBookSlice = createSlice({
  name: 'phoneBook',
  initialState,
  reducers: {
    setHandleAddContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    setOnDeleteContact: (state, action) => {
      state.filter = '';
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );

    },
    setOnFilterContact: (state, action) => {
      state.filter = action.payload;
    }
  }
})
export const {
  setHandleAddContact,
  setOnDeleteContact,
  setOnFilterContact,
} = phoneBookSlice.actions;

export const phoneBookReducer = phoneBookSlice.reducer;












// export const phoneBookReducer = (state = initialState, action) => { // { type: 'phoneBook/toAddContact', payload: newContact }
//   switch (action.type) {
//     case 'phoneBook/toAddContact': {
//       return {
//         ...state,
//         contacts: [...state.contacts, action.payload],
//       };
//     }
//     case 'phoneBook/toChangeFilter': {
//       return {
//         ...state,
//         filter: action.payload,
//       };
//     }
//     case 'phoneBook/toDeleteContact': {
//       return {
//         ...state,
//         filter: "",
//         contacts: state.contacts.filter(
//           contact => contact.id !== action.payload
//         ),
//       };
//     }
//     default:
//       return state;
//   }
// };


// export const setHandleAddContact = (newContact) => {
//   return ({
//     type: 'phoneBook/toAddContact',
//     payload: newContact,
//   });
// };



// export const setOnDeleteContact = (id) => {
//   return ({
//     type: 'phoneBook/toDeleteContact',
//     payload: id,
//   });
// };

// export const setOnFilterContact = (event) => {
//   const inputFilterValue = event.target.value;
//   return ({
//     type: 'phoneBook/toChangeFilter',
//     payload: inputFilterValue,
//   });
// };