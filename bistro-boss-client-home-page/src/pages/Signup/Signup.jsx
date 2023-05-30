import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Authcontext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import swal from "sweetalert";
import { FaGoogle } from "react-icons/fa";
const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const goTo = location?.state?.pathname || "/";
  const { createUserWithEmAndPass, loginWithGoogle } = useContext(Authcontext);
  const [captcha, setCaptcha] = useState("");
  const [isValid, setIsValid] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const { email, password, name, photourl } = form;
    console.log(email.value, password.value);
    createUserWithEmAndPass(email.value, password.value)
      .then((resault) => {
        updateProfile(resault.user, {
          displayName: name.value,
          photoURL: photourl.value,
        })
          .then(() => {
            // Profile updated!
            console.log(resault.user);
            const { displayName, email, photoURL } = resault.user;
            const userToSave = { displayName, email, photoURL };
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userToSave),
            })
              .then((res) => res.json())
              .then((data) => console.log(data));
            swal("success!", "success full signup", "success");
            navigate(goTo);
          })
          .catch((error) => {
            // An error occurred
            console.log(error.massage);
          });
        // console.log(resault.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const hendleGoogleLogin = () => {
    loginWithGoogle()
      .then((resault) => {
        console.log(resault.user);
        const { displayName, email, photoURL } = resault.user;
        const userToSave = { displayName, email, photoURL };
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
            swal("success!", "success full signup", "success");
            navigate(goTo);
          });
      })
      .catch((err) => {
        console.log(err);
      });
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
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign up now!</h1>
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
                <span className="label-text">name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                className="input input-bordered"
              />
            </div>
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
                <span className="label-text">Photo url</span>
              </label>
              <input
                type="text"
                placeholder="Photo url"
                name="photourl"
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
                value="Signup"
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
            <Link to="/login" className="label-text-alt link link-hover">
              alrady have an account ? Login.
            </Link>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Signup;
