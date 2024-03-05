import React, { useState } from "react";
import css from "./ReactForm.module.scss";
import img from "../img/logo.png";
const ReactForm = () => {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    designation: null,
    fullName: null,
    mobileNumber: null,

    personalEmail: null,
    officeEmail: null,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data : ", formData);
    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${apiUrl}/form-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        setStatus("Error in form submission");
        throw new Error(`HTTP Error! Status: ${response.status}`);
      } else {
        const responseData = await response.json();
        setStatus(responseData.message);
        console.log(responseData);
      }
    } catch (error) {
      console.log("error in sending form data : ", error);
      setStatus("Error in form submission");
    }
  };
  return (
    <div>
      <div className={css.wrapper}>
        <div className={css.container}>
          <div className={css.left}>
            <img src={img} alt="logo" />
          </div>
          <div className={css.right}>
            <span className={css.headText}>Registration</span>
            <form
              action=""
              onSubmit={(e) => handleSubmit(e)}
              className={css.formSection}
            >
              <input
                type="text"
                placeholder="Designation.."
                required={true}
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Full Name.."
                required={true}
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Mobile Number.."
                required={true}
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email.."
                required={true}
                name="personalEmail"
                value={formData.personalEmail}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Office Email Id.."
                required={true}
                name="officeEmail"
                value={formData.officeEmail}
                onChange={handleChange}
              />
              <button type="submit">Submit</button>
            </form>
            {status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactForm;
