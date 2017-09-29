function connection(state = [], action) {
  switch (action.type) {

    case 'GET_TOKEN':
      var cookies = document.cookie.split(';');

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
      document.cookie = 'cloggedin=true;path=/';
      document.cookie = `ctoken=${action.json};path=/`;
      document.cookie = 'cdtoken=efe;path=/';
      // document.cookie = 'cloggedin=true';
      return { ...state, token: action.json, error: 'succes', loggedin: true };

    case 'LOG_OUT':

      document.cookie = 'cloggedin=false;path=/';
      document.cookie = 'ctoken=;path=/';
      document.cookie = 'user=;path=/';
      document.cookie = 'email=;path=/';
      location.assign('https://www.sublation.nl/web/app_dev.php');
      return { ...state, token: '', loggedin: false };

    case 'HANDLE_USER': {
      // document.cookie = 'path=/';
      document.cookie = `user=${action.json.name};path=/`;
      document.cookie = `email=${action.json.email};path=/`;
    //  const cuser = { ...state.user, name: action.json.name, email: action.json.email };
      return { ...state, loggedIn: true };
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
