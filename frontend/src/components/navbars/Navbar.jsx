import { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      link: ""
    },
    {
      text: "About",
      icon: <InfoIcon />,
      link: "#about-section-container"
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
      link: "#testimonial-id"
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      link: "#contact-id"
    },
  ];

  return (
    <nav>
      <div className="nav-logo-container">
        <img src="/KisanSahayak.png" alt="logo" style={{ width: "90%", height: "30px" }} />
      </div>
      <div className="navbar-links-container hidden md:flex ml-4">
        <a href="">Home</a>
        <a href="#about-section-container">About</a>
        <a href="#testimonial-id">Testimonials</a>
        <a href="#contact-id">Contact</a>
        <a onClick={() => navigate("/login")} href="">Login</a>
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
                  <a href={item.link}>{item.text}</a>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />

          <div className="flex items-center gap-6 hover:bg-gray-100  px-4 m-1 cursor-pointer" onClick={() => { navigate("/login") }}>
            <button className="text-gray-500 bg-transparent border-none outline-none hover:bg-gray-100"><MdLogin className="w-[23px] h-[50px] object-cover" /></button>
            <span>Login</span>
          </div>
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;