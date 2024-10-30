import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  text-align: center;
  color:black;
  line-height: 200px;
`;

const boxVariants = {
  initial: (custom: boolean) => {
    return {
      x: custom ? -window.innerWidth / 2 : window.innerWidth,
      scale: 0,
      opacity: 0
    }
  },
  visible: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1
    }
  },
  leaving: (custom: boolean) => {
    return {
      x: custom ? window.innerWidth / 2 : -window.innerWidth / 2,
      scale: 0,
      opacity: 0,
      transition: {
        duration: 1
      }
    }
  },
};

function Motion9() {
  const [id, setId] = useState(1);
  const [direction, setDirection] = useState(false);

  const next = () => {
    setId((prev) => prev === 10 ? 10 : prev + 1);
    setDirection(false);
  }
  const prev = () => {
    setId((prev) => prev === 1 ? 1 : prev - 1);
    setDirection(true)
  }

  return (
    <Wrapper>
      <button onClick={next}>Next</button>
      <button onClick={prev}>Prev</button>
      <AnimatePresence custom={direction} mode='wait'>
        <Box

          key={id}
          custom={direction}
          variants={boxVariants}
          initial="initial"
          animate="visible"
          exit="leaving"
        >{id}
        </Box>
      </AnimatePresence>
    </Wrapper>
  );
}

export default Motion9