import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

import background from "../assests/images/hospital1.jpg";
import "../assests/AddStaff.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function AddStaff() {
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [dept, setDept] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [profileImg, setProfileImg] = useState(null);

  // Validation schema
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[A-Za-z\s]+$/, "Invalid naming format"),

    post: yup
      .string()
      .required("Post is required")
      .oneOf(
        ["assistant", "officer", "manager"],
        "Should be assistant, officer, or manager"
      ),

    dept: yup.string().required("Department is required"),

    contactNo: yup
      .string()
      .matches(/^\d{3}-\d{7}$/, "Invalid contactno format")
      .required("Contact number is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Catch value of image file
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setProfileImg(URL.createObjectURL(img));
    }
  };

  const addProfile = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/profile/save", {
        name: data.name,
        post: data.post,
        dept: data.dept,
        contactNo: data.contactNo,
        profileImg: profileImg,
      });

      setName("");
      setPost("");
      setDept("");
      setContactNo("");
      setProfileImg("");
      alert("Successfully created!");
      //console.log(...response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% cover",
        padding: "0% 0% 0% 0%",
      }}
    >
      <Header />
      <div className="add-container">
        <h1 className="register-title">Staff registration</h1>
        <form className="frm" onSubmit={handleSubmit(addProfile)}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              {...register("name")}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>
          <div className="form-group">
            <label>Post</label>
            <input
              type="text"
              className={`form-control ${errors.post ? "is-invalid" : ""}`}
              {...register("post")}
            />
            {errors.post && (
              <div className="invalid-feedback">{errors.post.message}</div>
            )}
          </div>
          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              className={`form-control ${errors.dept ? "is-invalid" : ""}`}
              {...register("dept")}
            />
            {errors.dept && (
              <div className="invalid-feedback">{errors.dept.message}</div>
            )}
          </div>
          <div className="form-group">
            <label>ContactNo</label>
            <input
              type="text"
              className={`form-control ${errors.contactNo ? "is-invalid" : ""}`}
              {...register("contactNo")}
            />
            {errors.contactNo && (
              <div className="invalid-feedback">{errors.contactNo.message}</div>
            )}
          </div>
          <div className="col-12">
            <h5>Upload profile picture</h5>
            <div className="p-3 mb-2 bg-info text-white">
              <img src={profileImg} alt="Profile" className="profilePic" />
              <h1>Select Image</h1>
              <input type="file" name="myImage" onChange={onImageChange} />
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary" id="btn9">
              Add Staff
            </button>
            <a className="btn btn-success" id="home" href="/">
              Home
            </a>
          </div>
        </form>
      </div>
      <div className="footer">Designed by Buddhika Sadun</div>
    </div>
  );
}

export default AddStaff;
