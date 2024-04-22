import User from "../components/User";
function UserList({ obj }) {
  return (
    <table className="table">
      <tbody>
        <tr>
          {obj.map((user) => {
            return (
              <User
                name={user.name}
                weight={user.weight}
                height={user.height}
              />
            );
          })}
        </tr>
      </tbody>
    </table>
  );
}

export default UserList;
