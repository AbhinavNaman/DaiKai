import { useState } from "react";
import {
  Paper,
  TextInput,
  PasswordInput,
  MultiSelect,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import classes from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebaseConfig"; // Adjust the path as needed
import { createUserWithEmailAndPassword } from "firebase/auth";

export function UserRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    college:"",
    interests: [],
    clubsFollowed: [],
    eventsRegistered: [],
    profilePicture:
      "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_640.jpg",
  });

  const handleClick = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const userid = user.uid;
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("userid", userid);

      const response = await axios.post(
        `https://us-central1-my-project-fd5eb.cloudfunctions.net/userRegisterFunction`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newUser = response.data;
      if (newUser) {
        navigate("/");
      }
    } catch (error) {
      navigate("auth/user/register");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelectChange = (field) => (selectedItems) => {
    setFormData({ ...formData, [field]: selectedItems });
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={40}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          User Registration
        </Title>
        <TextInput
          label="First Name:"
          placeholder="Your First Name"
          size="md"
          mt="md"
          onChange={handleChange}
          name="firstName"
          value={formData.firstName}
        />
        <TextInput
          label="Last Name:"
          placeholder="Your Last Name"
          size="md"
          mt="md"
          onChange={handleChange}
          name="lastName"
          value={formData.lastName}
        />
        <TextInput
          label="Email:"
          placeholder="Your Email"
          size="md"
          mt="md"
          onChange={handleChange}
          name="email"
          value={formData.email}
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
        <TextInput
          label="College:"
          placeholder="Your College"
          size="md"
          mt="md"
          onChange={handleChange}
          name="college"
          value={formData.college}
        />
        <MultiSelect
          label="Interests:"
          placeholder="Select your interests"
          mt="md"
          size="md"
          data={[
            { value: "sports", label: "Sports" },
            { value: "music", label: "Music" },
            { value: "art", label: "Art" },
            { value: "tech", label: "Technology" },
            { value: "comedy", label: "Comedy" },
            // Add more options as needed
          ]}
          value={formData.interests}
          onChange={handleMultiSelectChange("interests")}
        />
         
        <Button fullWidth mt="xl" size="md" onClick={handleClick}>
          Register
        </Button>
        <Text ta="center" mt="md">
          Already a member?{" "}
          <Anchor
            href="#"
            fw={700}
            onClick={(event) => {
              event.preventDefault();
              navigate("/auth/user/login");
            }}
          >
            Login
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
