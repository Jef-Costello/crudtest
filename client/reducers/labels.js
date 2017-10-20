function labels(state = [], action) {
  switch (action.type) {

    case 'HANDLE_LABELS':
      return { ...state, all: action.json.labels };

    default:
      return state;

  }
}

export default labels;
