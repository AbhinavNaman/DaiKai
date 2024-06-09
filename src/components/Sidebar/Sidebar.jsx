import { useEffect, useState } from "react";
import {
  Center,
  Tooltip,
  UnstyledButton,
  Stack,
  rem,
  Button,
} from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Sidebar.module.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export function Sidebar() {
  const navigate = useNavigate();
  const [userid, setUserid] = useState(localStorage.getItem("userid"));

  useEffect(()=>{
    if(localStorage.getItem("userid")){
      setUserid(localStorage.getItem("userid"));
    }
  },[])
  const logout = async () => {
    localStorage.clear();
    await signOut(auth);
    navigate("/landing");
  };
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          <Tooltip
            label="Home"
            position="right"
            transitionProps={{ duration: 0 }}
          >
            <Link to="/">
              <Button className={classes.link}>
                <IconHome2
                  style={{ width: rem(20), height: rem(20) }}
                  stroke={1.5}
                />
              </Button>
            </Link>
          </Tooltip>

{!userid && (

          <Tooltip
            label="Dashboard"
            position="right"
            transitionProps={{ duration: 0 }}
          >
            <Link to="/clubdashboard">
              <Button className={classes.link}>
                <IconGauge
                  style={{ width: rem(20), height: rem(20) }}
                  stroke={1.5}
                />
              </Button>
            </Link>
          </Tooltip>
)}
{userid && (

          <Tooltip
            label="all clubs"
            position="right"
            transitionProps={{ duration: 0 }}
          >
            <Link to="/allclubs">
              <Button className={classes.link}>
                <IconGauge
                  style={{ width: rem(20), height: rem(20) }}
                  stroke={1.5}
                />
              </Button>
            </Link>
          </Tooltip>
)}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
      {userid ? (
        <Tooltip
          label="userdashboard"
          position="right"
          transitionProps={{ duration: 0 }}
        >
          <Link to="/userdashboard">
            <Button className={classes.link}>
              <IconUser
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
              />
            </Button>
          </Link>
        </Tooltip>
      ) : (

        <Tooltip
          label="Login"
          position="right"
          transitionProps={{ duration: 0 }}
        >
          <Link to="/auth/user/login">
            <Button className={classes.link}>
              <IconUser
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
              />
            </Button>
          </Link>
        </Tooltip>
      )}
        <Tooltip
          label="Logout"
          position="right"
          transitionProps={{ duration: 0 }}
        >
          <Button className={classes.link} onClick={logout}>
            <IconLogout
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
          </Button>
        </Tooltip>
      </Stack>
    </nav>
  );
}
