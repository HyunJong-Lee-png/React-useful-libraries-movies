import { useRecoilState } from "recoil";
import { hourSelector, minuteAtom } from "../atom";

export default function TimeTrans() {
  const [minute, setMinute] = useRecoilState(minuteAtom);
  const [hour, setHour] = useRecoilState(hourSelector);

  return (
    <>
      <input type='number' value={minute} onChange={(e) => {
        setMinute(+e.target.value);
        //+'' -> 0
        //+'1' -> 1
      }} />
      <input type='number' value={hour} onChange={(e) => {
        setHour(+e.target.value)
      }} />
    </>
  );
}