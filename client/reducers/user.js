function user(state = [], action) {
  switch (action.type) {


    case 'HANDLE_USER': {
      return { ...state, userid: action.json.userId, name: action.json.name, email: action.json.email, initialized: true };
    }

    default:
      return state;

  }
}

export default user;
