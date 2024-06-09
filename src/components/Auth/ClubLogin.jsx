import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
} from "@mantine/core";
import classes from "./Auth.module.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export function ClubLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleClick = async () => {
    try {
      const clubAdminCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const clubAdmin = clubAdminCredential.user;
      const clubAdminId = clubAdmin.uid;
      const token = await clubAdmin.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("clubAdminId", clubAdminId);
      navigate("/clubdashboard");
    } catch (error) {
      navigate("/auth/club/login");
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
          Club Login
        </Title>
        <TextInput
          label="Email:"
          placeholder="enter club email id"
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

        <Button fullWidth mt="xl" size="md" onClick={handleClick}>
          Login
        </Button>
        <Text ta="center" mt="md">
          New Cub?{" "}
          <Link to="/auth/club/register" fw={700}>
            Register Here
          </Link>
        </Text>
      </Paper>
    </div>
  );
}
