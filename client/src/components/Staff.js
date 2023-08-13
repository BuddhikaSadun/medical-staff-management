import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assests/images/logo.png";
import axios from "axios";
import Header from "./StaffHeader";
import background from "../assests/images/hospital1.jpg";
import "../assests/Staff.css";

function Staff() {
  const [profileList, setProfileList] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { sid } = useParams;

  useEffect(() => {
    axios
      .get("http://localhost:8000/profile/get")
      .then((response) => setProfileList(response.data.profile))
      .catch((error) => console.error(error));
  }, []);

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/profile/delete/${id}`
      );
      if (response) {
        alert("Sucessfully deleted!!");
      } else {
        console.log("Unsuccessful!!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProfileList = profileList.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="head"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRrepeat: " no-repeat",
        backgroundSize: "100%",
        backgroundSize: "cover",
      }}
    >
      <Header />
      <div className="container">
        <img src={logo} alt={"hospital"} />

        <div>
          <h2>Staff management</h2>

          <nav className="navbar">
            <div className="container-fluid">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="searchQuery"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </nav>
          <br />

          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Department</th>
                <th>Post</th>
                <th>Contact Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfileList.map((profile, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{profile.name}</td>
                  <td>{profile.dept}</td>
                  <td>{profile.post}</td>
                  <td>{profile.contactNo}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => {
                        navigate(`/update/${profile.id}`);
                      }}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => deleteHandler(profile.id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-success "
        style={{ margin: "-15% 0% 0% 20%" }}
      >
        <a href="/add" style={{ textDecoration: "none", color: "white" }}>
          Add Staff
        </a>
      </button>

      <button
        type="button"
        className="btn btn-message"
        style={{
          margin: "-15% 0% 0% 50%",
        }}
      >
        <a className="btn btn-success" href="/report">
          Report
        </a>
      </button>
    </div>
  );
}
export default Staff;
