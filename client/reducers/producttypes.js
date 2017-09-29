function producttypes(state = [], action) {
  switch (action.type) {

    case 'HANDLE_PRODUCTTYPES':
      return { ...state, all: action.json.producttypes };

    default:
      return state;

  }
}

export default producttypes;
