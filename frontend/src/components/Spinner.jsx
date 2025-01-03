import { motion } from 'framer-motion';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="h-5 w-5 border-t-4 border-blue-300 border-solid rounded-full"
      />
    </div>
  );
};

export default Spinner;