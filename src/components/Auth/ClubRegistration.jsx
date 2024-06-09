import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  NativeSelect,
} from "@mantine/core";
import classes from "./Auth.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Adjust the path as needed

export function ClubRegistration() {
  // const [file, setFile] = useState(null);
  // const [fileName, setFileName] = useState("Choose a file");
  // const handleFileChange = (e) => {
  //   setFile(e.target?.files[0]);
  //   setFileName(e.target?.files[0] ? e.target?.files[0].name : "file");
  // };
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
    collegeName: "",
    description: "",
    profilePicture: null,
  });

  const handleClick = async () => {
    const clubAdminCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const clubAdmin = clubAdminCredential.user;
    const clubAdminId = clubAdmin.uid;
    const token = await clubAdmin.getIdToken();
    localStorage.setItem("token", token);
    localStorage.setItem("clubAdminId", clubAdminId);
    try {
      const response = await axios.post(
        `https://us-central1-my-project-fd5eb.cloudfunctions.net/clubRegisterFunction`,
        {
          name: formData.name,
          email: formData.email,
          collegeName: formData.collegeName,
          description: formData.description,
          // profilePicture: file,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        navigate("/clubdashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div
      className={classes.wrapper}
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
      }}
    >
      <Paper className={classes.form} radius={0} p={40}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Club Registration
        </Title>
        {/* <div style={{ position: "relative", display: "inline-block" }}>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".jpg"
            style={{ display: "none" }}
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            style={{
              padding: "10px",
              border: "2px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
              color: "#333",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Choose File
          </label>
          <span style={{ marginLeft: "20px", marginRight: "20px" }}>
            {fileName}
          </span>
        </div> */}
        <TextInput
          label="Club Name:"
          placeholder="Enter Club Name"
          size="md"
          mt="md"
          onChange={handleChange}
          name="name"
          value={formData.name}
        />
        <TextInput
          label="Club Description:"
          placeholder="Enter Club Description"
          size="md"
          mt="md"
          onChange={handleChange}
          name="description"
          value={formData.description}
        />
        <TextInput
          label="Club Head Email ID:"
          placeholder="Enter Email "
          size="md"
          mt="md"
          onChange={handleChange}
          name="email"
          value={formData.email}
        />
        <TextInput
          label="College Name:"
          placeholder="Enter College "
          size="md"
          mt="md"
          onChange={handleChange}
          name="collegeName"
          value={formData.collegeName}
        />
        <PasswordInput
          label="Password:"
          placeholder="Your Password"
          mt="md"
          size="md"
          onChange={handleChange}
          name="password"
          value={formData.password}
        />
        <NativeSelect
          label="Type:"
          mt="md"
          size="md"
          value={formData.type}
          onChange={(e) =>
            handleChange({ target: { name: "type", value: e.target.value } })
          }
          data={[
            { value: "sports", label: "Sports" },
            { value: "arts", label: "Arts" },
            { value: "tech", label: "Tech" },
            { value: "music", label: "Music" },
          ]}
        />

        <Button fullWidth mt="xl" size="md" onClick={handleClick}>
          Register Club
        </Button>
        <Text ta="center" mt="md">
          Club already registerd?{" "}
          <Link to="/auth/club/login" fw={700}>
            Login
          </Link>
        </Text>
      </Paper>
    </div>
  );
}
