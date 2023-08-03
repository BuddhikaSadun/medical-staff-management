import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import background from "../assests/images/hospital1.jpg";
import "../assests/UpdateStaff.css";
import Header from "./Header";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UpdateStaff = (props) => {
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [dept, setDept] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const { id } = useParams();

  // Validation schema
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[A-Za-z\s]+$/, "Invalid naming format"),

    post: yup
      .string()
      .required("Post is required")
      .test(
        "post-value",
        "Should be assistant, officer, or manager",
        (value) => {
          if (value) {
            return ["assistant", "officer", "manager"].includes(value);
          }
          return true; // Pass the validation if no value is provided (optional field).
        }
      ),

    dept: yup.string().required("Department is required"),

    contactNo: yup
      .string()
      .required("Contact number is required")
      .matches(/^\d{3}-\d{7}$/, "Invalid contactno format"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/profile/${id}`);
        const profileData = response.data;
        //console.log(response.data);
        setName(profileData.name);
        setPost(profileData.post);
        setDept(profileData.dept);
        setContactNo(profileData.contactNo);
        setProfileImg(profileData.profileImg);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setProfileImg(URL.createObjectURL(img));
    }
  };

  const update = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `http://localhost:8000/profile/update/${id}`,
        {
          name: name,
          post: post,
          dept: dept,
          contactNo: contactNo,
          profileImg: profileImg,
        }
      );
      setName(response.data.name);
      setPost(response.data.post);
      setDept(response.data.dept);
      setContactNo(response.data.contactNo);
      setProfileImg(response.data.profileImg);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRrepeat: " no-repeat",
        backgroundSize: "100%",
        backgroundSize: "cover",
      }}
    >
      <Header />
      <div className="container">
        <h1 className="empreg">Staff Update</h1>
        <form className="frm" onSubmit={handleSubmit(update)}>
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
              Update Staff
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
};

export default UpdateStaff;
