import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
type Props = {
  from: number;
  to: number;
  duration: number;
};
const NumberCounter = ({ from, to, duration }: Props) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration: duration });
    return controls.stop;
  }, []);

  return <motion.span>{rounded}</motion.span>;
};
export default NumberCounter;
