const initialState = {
  files: [],
};
const filesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_FILES":
      return {
        ...state,
        files: action.payload,
      };
    case "DELETE_FILES":
      return {
        ...state,
        files: state.files.filter((file) => file._id !== action.payload),
      };
    default:
      return state;
  }
};

export default filesReducer;
