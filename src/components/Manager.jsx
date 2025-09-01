import React from "react";
import { useState, useRef, useEffect } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [showIcon, setShowIcon] = useState(false);
  const [passwordArray, setpasswordArray] = useState([]);
  // const passwwordRef = useRef();

  useEffect(() => {
    let passwordArray = localStorage.getItem("passwords");
    if (passwordArray) {
      setpasswordArray(JSON.parse(passwordArray));
    }
  }, []);

  const showPassword = () => {
    //   alert("show the password")
    setShowIcon((currentValue) => !currentValue);
  };

  const savePassword = () => {
    if(form.site.length >3 && form.username.length >3 &&form.password.length >3){

    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, { ...form, id: uuidv4() }]);
    setForm({ site: "", username: "", password: "" });
    toast('Password saved successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
          }
          else{
        toast('Error: Password not saved!');
    }
  };

  const deletePassword = (id) => {
    console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if(c){
            setpasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id))) 
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
  };

  const editPassword = (id) => {
    console.log("Editing password with id ", id)
        setForm(passwordArray.filter(i=>i.id===id)[0]) 
        setpasswordArray(passwordArray.filter(item=>item.id!==id)) 
  }


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);

    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="">
        <div className="fixed  inset-0 -z-10 w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] bg-fixed"></div>
      </div>

      <div className="  text-white  p-3  md:px-70 md:mycontainer min-h-[88.2vh] ">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-amber-300">&lt;</span>
          <span className="">Pass</span>
          <span className="text-amber-300 ">OP / &gt;</span>
        </h1>
        <p className="text-lg text-center">
          Manage Your <span className="text-amber-200">Password</span> All In
          One Place
        </p>
        <div className="text-white flex flex-col  p-4  gap-7 items-center ">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="border border-s-white rounded-full text-white p-4 py-1 w-full"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-5">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="placeholder:text-sm border border-s-white rounded-full text-white p-4 py-1 w-full"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="placeholder:text-xs border border-s-white rounded-full text-white p-4 py-1 w-full"
                type={showIcon ? "text" : "password"}
                name="password"
                id="password"
              />
              <span
                className="absolute right-1.5 top-2.5 text-sm  cursor-pointer"
                onClick={showPassword}
                ref={ref}
              >
                {showIcon ? <FaEye /> : <FaEyeSlash />}{" "}
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="bg-amber-300 flex justify-center items-center rounded-full  max-w-fit hover:bg-amber-200 text-sm px-7 py-1.5 cursor-pointer gap-2 border-1 border-amber-400"
          >
            <lord-icon
              className="rounded-lg "
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save 
          </button>
        </div>
        <div className="passwords ">
          <h2 className="font-bold text-xl py-4">Your passwords</h2>
          {passwordArray.length === 0 && <div>No passwords saved</div>}
          {passwordArray.length != 0 && (
             <table className="table-auto w-full rounded-lg overflow-hidden bg-transparent mb-10">
              <thead className="bg-amber-300 text-black  ">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-black/30 text-white  ">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex justify-center items-center">
                          <a
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              className="invert cursor-pointer"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex justify-center items-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              className="invert cursor-pointer"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex justify-center items-center">
                          <span>{item.password}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              className="invert cursor-pointer"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="justify-center py-2 border border-white text-center w-32">
                        <span
                          className="cursor-pointer mx-1.5 invert"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1.5 invert"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
