const CallAPI = async (endpoint, method = "GET", params = null) => {
    try{
        const options = {
            method,
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'*',
              'Content-Type': 'application/json',
              'Authorization': `BEARER ${localStorage.getItem('token')}`,
            }
        }

        if(method.toLowerCase() === "post") options['body']=JSON.stringify(params);
        else if(method.toLowerCase() === "get" && params) endpoint = endpoint+"?"+Object.keys(params).map(k=>`${k}=${params[k]}`).join('&');

        const url = "http://121.52.154.50:5219/api/" + endpoint;

        const res = await fetch(url,options);

        if(res.status === 401) {
            delete window.localStorage.login;
            delete window.localStorage.token;
            window.location.href = "/";
        }

        const dataText = await res.text();
        try{
            return JSON.parse(dataText);
        }
        catch{
            return dataText
        }
    }
    catch(ex){
        return ex;
    }
}

export default CallAPI;