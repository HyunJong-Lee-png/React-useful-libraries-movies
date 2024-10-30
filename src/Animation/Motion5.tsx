import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
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


export default function Motion5() {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-(window.innerWidth) / 2, (window.innerWidth) / 2], [2, 0.1]);
  const background = useTransform(x,
    [-(window.innerWidth) / 2, 0, (window.innerWidth) / 2],
    ['linear-gradient(90deg, #373b44, #4286f4)',
      'linear-gradient(90deg, #f953c6, #b91d73)',
      'linear-gradient(90deg, #11998e, #38ef7d)']);
  const rotateZ = useTransform(x, [-(window.innerWidth) / 2, (window.innerWidth) / 2], [-360, 360]);

  useEffect(() => {
    x.on('change', () => {
      console.log(x.get());
    })

  }, [])
  return (
    <Wrapper
      style={{ background }}
    >
      <Box
        style={{ x, scale, rotateZ }}
        drag='x'
      />
    </Wrapper>

  );
}