import { useEffect, useState } from "react";
import Category from "../components/Category";
import axios from "axios";
import { getCategories } from "../services/category";
function CategoryList() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const result = await getCategories();
    if (result.status === "success") {
      setCategories(result.data);
    }
  }
  // const response = axios.get("http://localhost:4000/category");
  // const result = response.data;
  // console.log(result);
  // const categories = result["data"];
  // console.log(categories);
  return (
    // <div>
    //   {categories.map((category) => {
    //     return <Category title={category.title} details={category.details} />;
    //   })}
    // </div>
    <div className="container-fluid px-4 py-5" id="custom-cards">
      <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        {categories.map((category) => {
          return (
            <Category
              title={category.title}
              details={category.details}
              icon={category.icon}
            />
          );
        })}
      </div>
      <hr />
    </div>
  );
}
export default CategoryList;
