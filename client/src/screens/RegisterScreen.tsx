import { useState } from "react";
import axios from "axios";

const RegisterScreen = () => {
  const [registerForm, setRegisterForm] = useState({});

  const handleInputChanges = (e: {
    target: { value: string; name: string };
  }) => {
    setRegisterForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const submitHandler = () => {
    axios
      .post("/api/auth", {
        registerForm,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex flex-col h-[80vh] justify-center items-center p-1 min-w-[400px]">
        <div className="w-[90%] md:w-[400px] p-8 shadow-md rounded-md bg-white">
          <form onSubmit={submitHandler} className="space-y-4">
            <h1 className="text-lg md:text-3xl text-center font-bold mb-2">
              Register
            </h1>
            <div>
              <label className="text-sm md:text-lg">Email</label>
              <input
                type="text"
                name="email"
                onChange={handleInputChanges}
                className="input input-sm input-bordered w-full text-sm md:text-md"
              />
            </div>
            <div>
              <label className="text-sm md:text-lg">Username</label>
              <input
                type="text"
                name="username"
                onChange={handleInputChanges}
                className="input input-sm input-bordered w-full text-sm md:text-md"
              />
            </div>
            <div>
              <label className="text-sm md:text-lg">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleInputChanges}
                className="input input-sm input-bordered w-full text-sm md:text-md"
              />
            </div>
            <div className="flex align-middle justify-between">
              <div>
                <label className="self-center">Male</label>
                <input
                  type="radio"
                  name="radio-2"
                  className="radio "
                  defaultChecked
                />
              </div>
              <label>Female</label>
              <input type="radio" name="radio-2" className="radio " />
            </div>
            <button
              type="submit"
              className="btn btn-success text-white w-full mt-4 text-sm md:text-md"
            >
              Regsiter
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
