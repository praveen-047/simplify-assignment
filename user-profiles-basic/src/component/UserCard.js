import "./UserCard.css";
function UserCard(props) {
  const { details } = props;
  const { username, email, phone, company, website, address } = details; //these are the props passed from the parent component

  const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`;

  return (
    <div className="container user-card">
      <div className="row">                        {/* bootstrap row is used to create a horizontal layout for columns */}
        <div className="col-12 col-sm-auto m-0 p-0"> {/*first bootstrap col is used to pack the user profile image*/}
          <div className="profile-container">
            <img src={avatarUrl} alt="profile" />
          </div>
        </div>

        <div className="col-12 col-sm-8 m-0 p-0">      {/*second bootstrap col is used to pack the user details*/}
          <h1 className="username">{username}</h1>
          <h1 className="user-details-heading">
            Email: <span className="user-details-span">{email}</span>
          </h1>
          <h1 className="user-details-heading">
            Phone: <span className="user-details-span">{phone}</span>
          </h1>
          <h1 className="user-details-heading">
            Company: <span className="user-details-span">{company.name}</span>
          </h1>
          <h1 className="user-details-heading">
            Website: <span className="user-details-span">{website}</span>
          </h1>
          <h1 className="user-details-heading">
            Address:{" "}
            <span className="user-details-span">
              {address.street}, {address.suite}, {address.city},{" "}
              {address.zipcode}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
