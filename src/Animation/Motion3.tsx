import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  background: linear-gradient(90deg, #f953c6, #b91d73);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.3);
`;

export default function Motion3() {

  return (
    <Wrapper>
      <Box
        whileHover={{ scale: 1.5, rotateZ: 90, transition: { duration: 0.5, type: 'spring' } }}
        whileTap={{ scale: 1, borderRadius: '50%', rotateZ:-90,transition: { duration: 0.5 } }}
      />
    </Wrapper>
  );
}