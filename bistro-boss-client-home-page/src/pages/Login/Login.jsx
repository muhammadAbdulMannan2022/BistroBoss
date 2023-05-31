import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { FaGoogle } from "react-icons/fa";
import { Authcontext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const goTo = location?.state?.pathname || "/";
  const { signInWithEmAndPass, loginWithGoogle } = useContext(Authcontext);
  const [captcha, setCaptcha] = useState("");
  const [isValid, setIsValid] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const { email, password } = form;
    console.log(email.value, password.value);
    signInWithEmAndPass(email.value, password.value)
      .then((result) => {
        console.log(result.user);
        navigate(goTo);
      })
      .catch((err) => console.log(err));
  };
  const handleValidCaptcha = (e) => {
    console.log(e.target.value);
    setCaptcha(e.target.value);
    const isOk = validateCaptcha(e.target.value, false);
    setIsValid(isOk);
  };
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const hendleGoogleLogin = () => {
    loginWithGoogle()
      .then((resault) => {
        console.log(resault.user);
        const { displayName, email, photoURL, uid } = resault.user;
        const userToSave = { displayName, email, photoURL, uid };
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userToSave),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            navigate(goTo);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                onChange={handleValidCaptcha}
                type="text"
                placeholder="Type the text captcha"
                name="captcha"
                value={captcha}
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                className={` ${
                  isValid ? "btn btn-primary" : " btn bg-primary btn-disabled"
                }`}
                value="login"
              />
            </div>
          </form>
          <div className="form-control">
            <hr className="w-full h-[2px]" />
            <div className="text-center mt-4">
              <button
                onClick={hendleGoogleLogin}
                className="p-2 bg-gray-600 rounded-full"
              >
                <FaGoogle className="w-5 h-5" />
              </button>
            </div>
          </div>
          <label className="label ms-10 mb-5">
            <Link to="/signup" className="label-text-alt link link-hover">
              don't have an account ? create one.
            </Link>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Login;
