import { motion } from 'framer-motion';

const Spinner2 = () => {
    return (
        <div className="flex justify-center items-center h-screen -mt-32">
            <div className="relative flex justify-center items-center">
                <motion.div
                    className="absolute w-20 h-20 border-4 border-yellow-500 border-t-orange-500 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                ></motion.div>
                <div className="w-4 h-4 bg-yellow-500 rounded-full animate-ping"></div>
            </div>
        </div>
    );
};

export default Spinner2;