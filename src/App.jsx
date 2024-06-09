import "@mantine/core/styles.css";
import "./App.css";
import { Suspense } from "react";
import { MantineProvider } from "@mantine/core";
// import { Navbar } from "./components/Navbar/Navbar";
// import { Hero } from "./components/Hero/Hero";
// import { Sidebar } from "./components/Sidebar/Sidebar";
// import { EventCard } from "./components/EventCard/EventCard";
import { UserRegistration } from "./components/Auth/UserRegistration";
import { UserLogin } from "./components/Auth/UserLogin";
// import { SearchInput } from "./components/SearchInput/SearchInput";
// import { Form } from "./components/Form/Form";
// import { Footer } from "./components/Footer/Footer";
import UserEventDetails from "./components/UserEventDetails/UserEventDetails";
import ClubDashboard from "./components/ClubDashboard/ClubDashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { NotFound } from "./components/NotFound/NotFound";
import { RecoilRoot, useRecoilValue } from "recoil";
import { ClubRegistration } from "./components/Auth/ClubRegistration";
import { ClubLogin } from "./components/Auth/ClubLogin";
import EventCalendar from "./components/EventCalendar";
import UserDashboard from "./pages/UserDashboard";
import CollegePage from "./pages/CollegePage";
import { fetchUser } from "./store/atoms";
import Landing from "./pages/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/clubdashboard",
    element: <ClubDashboard />,
    errorElement: <NotFound />,
  },
  {
    path: "/userdashboard",
    element: <UserDashboard />,
    errorElement: <NotFound />,
  },
  {
    path: "/auth/user/register",
    element: <UserRegistration />,
    errorElement: <NotFound />,
  },
  {
    path: "/auth/user/login",
    element: <UserLogin />,
    errorElement: <NotFound />,
  },
  {
    path: "/auth/club/register",
    element: <ClubRegistration />,
    errorElement: <NotFound />,
  },
  {
    path: "/auth/club/login",
    element: <ClubLogin />,
    errorElement: <NotFound />,
  },
  {
    path: "/usereventdetail/:eventid",
    element: <UserEventDetails />,
    errorElement: <NotFound />,
  },
  {
    path: "/allclubs",
    element: <CollegePage />,
    errorElement: <NotFound />,
  },
  // {
  //   path: "/cal",
  //   element: <EventCalendar />,
  //   errorElement: <NotFound />,
  // },
  {
    path: "/collegepage",
    element: <CollegePage />,
    errorElement: <NotFound />,
  },
  {
    path:"/club/details/:clubid",
    element: <ClubDashboard />,
    errorElement: <NotFound />,
  },
  {
    path: "/landing",
    element: <Landing />,
    errorElement: <NotFound />,
  },
]);

function App() {
  return (
    <RecoilRoot>
      <Suspense
        fallback={
          <div>
            <img
              src="https://memetemplate.in/uploads/1640209279.jpeg"
              alt="waiting..."
            />
          </div>
        }
      >
        <MantineProvider defaultColorScheme="dark">
          <RouterProvider router={router} />
        </MantineProvider>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
