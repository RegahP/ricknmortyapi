
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";


export const BackToList: React.FC = () => {
  return (
    <Link to="/" className="text-sm text-emerald-600 hover:underline">
      <FaArrowLeft className="inline-block mr-1" /> Back to list
    </Link>
  );
}