import { useNavigate } from "react-router-dom";
import CategoryList from "./categorylist";

function Home() {
  const navigate = useNavigate();
  function onLogout() {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <div>
      <h1>hello from home</h1>
      <CategoryList />
      <button onClick={onLogout}>logout</button>
    </div>
  );
}
export default Home;
