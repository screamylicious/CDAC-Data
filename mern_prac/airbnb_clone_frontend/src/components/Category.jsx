import { useEffect } from "react";
import { config } from "../config";

function Category({ title, details, icon }) {
  return (
    <div
      style={{ display: "inline-block", marginRight: 20, textAlign: "center" }}
    >
      <img style={{ width: 24 }} src={`${config.url}/image/${icon}`} alt="" />
      <div style={{ fontWeight: "600", fontSize: 15 }}>{title}</div>
    </div>
  );
}
export default Category;
