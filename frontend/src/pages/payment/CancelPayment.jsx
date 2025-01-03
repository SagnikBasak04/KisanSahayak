import { Box, Typography } from '@mui/material'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CancelPayment = () => {
    const navigate = useNavigate();
    const totalPrice = useSelector((state) => state.productPrice);
    
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box width="100%" display="flex" flexDirection="row" bgcolor="#ff2212" p={1}>
                <Typography sx={{
                    fontSize: "18px",
                    marginLeft: "47%",
                    marginRight: "0.5%"
                }}>
                    $ {totalPrice}
                </Typography>
                <CancelIcon/>
            </Box>
            <Box m={10}>
                <Box display="flex" flexDirection="column">
                    <Typography style={{fontSize: "4rem", fontFamily: "Montserrat"}}>
                        Payment Cancelled
                    </Typography>
                    <Typography> 
                        Your order has been cancelled.
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={5}>
                    <Typography display="flex" flexDirection="row" onClick={() => navigate("/")} sx={{
                        textDecorationLine: "underline",
                        fontSize: "14px",
                        "&:hover": {
                            cursor: "pointer",
                            color: "#005eff"
                            },
                    }}>
                        Return back to home
                        <Box>
                            <ArrowOutwardIcon/>
                        </Box>
                    </Typography>
                    <Typography display="flex" flexDirection="row" onClick={() => navigate("/marketplace")} sx={{
                        textDecorationLine: "underline",
                        fontSize: "14px",
                        "&:hover": {
                            cursor: "pointer",
                            color: "#005eff"
                            },
                    }}>
                        Return back to marketplace
                        <Box>
                            <ArrowOutwardIcon/>
                        </Box>
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default CancelPayment
