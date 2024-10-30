import { motion, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 200vh;
  background: linear-gradient(90deg, #f953c6, #b91d73);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255,255,255,0.3);
  border-radius: 10px;
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const InnerBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,1);
  border-radius: 10px;
  transform-origin: 50% 100%;
  position: absolute;
  top:100%;
`;

export default function Motion6() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);
  const innerScale = useTransform(scrollYProgress, [0, 1], [1, 2])

  return (
    <Wrapper>
      <Box style={{ scale }}>
        <InnerBox style={{ scale: innerScale }} />
      </Box>
    </Wrapper>
  );
}