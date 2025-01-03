import { useState } from "react";
import Logo from "../../../public/KisanSahayak.png";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { MdOutlineTaskAlt, MdOutlineQueryStats } from "react-icons/md";
import HomeIcon from "@mui/icons-material/Home";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const Navbar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const { logout } = useLogout();

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      type: "section",
      link: ""
    },
    {
      text: "Statistics",
      icon: <MdOutlineQueryStats />,
      type: "section",
      link: "#statistics-id"
    },
    {
      text: "Activities",
      icon: <MdOutlineTaskAlt />,
      type: "section",
      link: "#new-activities-id"
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      type: "section",
      link: "#contact-id"
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
      type: "page",
      link: "/marketplace"
    }
  ];

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="logo" className="h-[30px] w-full" />
      </div>
      <div className="navbar-links-container hidden md:flex ml-4">
        <a href="">Welcome</a>
        <a href="#testimonial-id">Statistics</a>
        <a href="#new-activities-id">New</a>
        <a href="#contact-id">Contact</a>
        <a onClick={() => navigate("/marketplace")} href="">
          <BsCart2 className="navbar-cart-icon" />
        </a>
        <button onClick={logout} className="primary-button text-black">Logout</button>
      </div>
      <div className="navbar-menu-container md:hidden">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {item.type === "section" ? (
                    <a href={item.link}>{item.text}</a>
                  ) : (
                    <Link to={item.link}>{item.text}</Link>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />

          <div className="flex items-center gap-6 hover:bg-gray-100  px-4 m-1 cursor-pointer" onClick={logout}>
            <button className="text-gray-500 bg-transparent border-none outline-none hover:bg-gray-100"><MdLogout className="w-[23px] h-[50px] object-cover" /></button>
            <span>Logout</span>
          </div>
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;