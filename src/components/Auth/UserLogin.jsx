import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import classes from "./Auth.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export function UserLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleClick = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const userid = user.uid;
      const token = await user.getIdToken();
      console.log(user);
      localStorage.setItem("token", token);
      localStorage.setItem("userid", userid);
      localStorage.setItem("userid", userid);
      navigate("/");
    } catch (error) {
      navigate("/auth/user/login");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={40}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          User Login
        </Title>
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
        <Button fullWidth mt="xl" size="md" onClick={handleClick}>
          Login
        </Button>
        <Text ta="center" mt="md">
          Don&apos;t have an Account?{" "}
          <Anchor
            href="#"
            fw={700}
            onClick={(event) => {
              event.preventDefault();
              navigate("/auth/user/register");
            }}
          >
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
