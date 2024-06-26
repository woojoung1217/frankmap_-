import { useRecoilValue } from "recoil";
import Calendar from "../../components/calendar/Calendar";
import { userState } from "@/atoms/userstate";

const Page = () => {
  return (
    <>
      <Calendar />
    </>
  );
};

export default Page;
