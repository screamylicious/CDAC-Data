function User({ name, weight, height }) {
  // return (
  //   <div>
  //     {obj.map((person) => {
  //       return (
  //         <div>
  //           <div>Name : {person.name}</div>
  //           <div>Weight : {person.weight}</div>
  //           <div>Height : {person.height}</div>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
  // console.log(props);
  // const obj = props.object;
  // const { name, weight, height } = obj;
  return (
    // <div className="user">
    //   {/* <div>Name = {props.userName}</div>
    //   <div>Weight = {props.userWeight}</div>
    //   <div>Height = {props.eight}</div>
    //   <div>----------</div> */}

    //   {/* <div>Name = {name}</div>
    //   <div>Weight = {weight}</div>
    //   <div>Height = {height}</div>
    //   <div>----------</div> */}

    // </div>
    <td>
      <div className="border rounded">
        <div>Name : {name}</div>
        <div>Weight : {weight}</div>
        <div>Height : {height}</div>
      </div>
    </td>
  );
}
export default User;
