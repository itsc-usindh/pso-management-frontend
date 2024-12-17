import { useState } from "react";
import FormInput from "../../Components/FormInput";
import CallAPI from "../../Utils/callApi";

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const loginHandler = async () => {
        if (!username || !password) {
            alert("Username and Password is required ...");
            return;
        }
        const loginRes = await CallAPI('auth/login','POST', {username,password});
        if(loginRes.token){
            window.localStorage.login = JSON.stringify(loginRes);
            window.localStorage.token = loginRes.token;
            setIsLoggedIn(true);
        }
    }
    return (
        <div className="light login">
            <div className="slider-container">
                <div className="slider">
                    <div className="col-md-8 pt-4 px-4">
                        <p className="mb-2">WELCOM TO</p>
                        <h2>University of Sindh</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto nobis, eum omnis, ipsam ducimus repellendus est molestias dolore pariatur eos vero exercitationem odio cupiditate sit error iste magni ipsa et.</p>
                    </div>
                </div>
            </div>

            <div className="form">
                <h1>Login</h1>
                <p className="mt-3">Use your offcial credentials to login to the system.</p>
                <div className="my-3">
                    <FormInput label="User name" setValue={setUsername} />
                </div>
                <div className="my-3">
                    <FormInput label="Password" type="password" setValue={setPassword} />
                </div>
                <button className="butn col-12 mb-4" onClick={loginHandler}>Login</button>
                <p>If you don't have an account then contact management to get one.</p>
            </div>
        </div>
    );
}


export default Login;