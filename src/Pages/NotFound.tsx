import notFoundVector from "../assets/notFoundVector.png";
import CButton from "../components/CButton";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen overflow-hidden">
      <img src={notFoundVector} alt="" className="w-1/2" />
      <p className="text-4xl">Page not found</p>
      <CButton className="rounded-lg" onClick={() => navigate("/")}>
        Go to Home
      </CButton>
    </div>
  );
}
