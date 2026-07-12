import { motion } from "framer-motion";

const dot = {
  animate: {
    y: [0, -6, 0],
  },
};

const TypingIndicator = () => {
  return (
    <div className="flex w-fit items-center gap-2 rounded-full bg-zinc-900 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          variants={dot}
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          className="h-2 w-2 rounded-full bg-cyan-400"
        />
      ))}
    </div>
  );
};

export default TypingIndicator;