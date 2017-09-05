function connection(state = [], action) {
  switch (action.type) {

    case 'GET_TOKEN':
      document.cookie = `ctoken=${action.json}`;
      document.cookie = 'cloggedin=true';
      return { ...state, token: action.json, error: 'succes', loggedin: true };

    case 'LOG_OUT':
      location.assign('/web/app_dev.php/');
      document.cookie = 'cloggedin=false';
      document.cookie = 'ctoken=null';
      return { ...state, token: '', loggedin: false };

    case 'HANDLE_USER': {
      document.cookie = `user=${action.json.name}`;
      document.cookie = `email=${action.json.email}`;
      const cuser = { ...state.user, name: action.json.name, email: action.json.email };
      return { ...state, user: cuser, loggedIn: true };
    }


    case 'LOGIN_ERROR':

      if (action.payload.xhr.statusText === 'Unauthorized') {
        return { ...state, loginerror: ' Naam of wachtwoord incorrect.' };
      }
      return { ...state, loginerror: 'er ging iets mis, probeer het later nog eens.' };

    case 'LAST_ACTION':
      return { ...state, lastaction: action };

    case 'LOAD_ERROR':

      return state;

    case 'LOADING':
      return { ...state, loading: true };

    case 'LOAD_COMPLETE':
      return { ...state, loading: false };

    case 'CANCEL':
      return { ...state, loading: false };

    case 'FLUSH_TOKEN':
      return { ...state, token: null };


    case 'START_REFRESH':
      return { ...state, refreshing: true };
    case 'FINISH_REFRESH':
      return { ...state, refreshing: false };


    default:
      return state;

  }
}

export default connection;
