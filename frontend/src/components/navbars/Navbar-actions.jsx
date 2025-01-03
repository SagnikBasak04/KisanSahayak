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
import HomeIcon from "@mui/icons-material/Home";
import { IoCloudUpload } from "react-icons/io5";
import { FaCamera, FaHistory } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const { logout } = useLogout();

    const menuOptions = [
        {
            text: "Home",
            icon: <HomeIcon className="text-xl" />,
            link: "/home"
        },
        {
            text: "Upload",
            icon: <IoCloudUpload className="text-xl" />,
            link: "/upload"
        },
        {
            text: "Capture",
            icon: <FaCamera className="text-xl" />,
            link: "/capture"
        },
        {
            text: "Dashboard",
            icon: <MdAnalytics className="text-xl" />,
            link: "/dashboard"
        },
        {
            text: "MarketPlace",
            icon: <ShoppingCartRoundedIcon />,
            link: "/marketplace"
        },
        {
            text: "History",
            icon: <FaHistory />,
            link: "/history"
        }
    ];

    return (
        <nav className="px-3">
            <div className="nav-logo-container">
                <img src={Logo} alt="" className="h-[30px] w-full" />
            </div>
            <div className="navbar-links-container hidden md:flex ml-4">
                <Link to="/home">Home</Link>
                <Link to="/upload">Upload</Link>
                <Link to="/capture">Capture</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/history">History</Link>
                <Link to="/marketplace"><BsCart2 /></Link>
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
                                    <Link to={item.link}>{item.text}</Link>
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