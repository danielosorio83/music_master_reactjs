class Shared {

  constructor(){
    this.access_token = null;
    this.expires_in = 0;
  }

  get_access_token(){
    if (this.expires_in < (new Date()).getTime()){
      const FETCH_URL = 'http://localhost:3001/spotify';
      fetch(FETCH_URL, { method: 'POST', mode: 'cors', cache: 'no-store', async: false })
        .then(response => response.json())
        .then(json => {
          this.access_token = json['access_token'];
          this.expires_in = (new Date()).getTime() + json['expires_in'] * 1000;
          return this.access_token;
        });
    }else{
      return this.access_token;
    }
  }

  my_options(){
    return {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + this.get_access_token()
      },
      mode: 'cors',
      cache: 'default'
    }
  }
}

export default Shared;