import { useNavigate } from "react-router-dom";
import Button from "./Button";

const ButtonBack = () => {
  const navigate = useNavigate();
  return (
    <Button type="back" onClick={() => navigate(-1)}>
      &larr; Back
    </Button>
  );
};

export default ButtonBack;
