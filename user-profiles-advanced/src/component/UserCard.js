import { Card, Button } from "antd";
import {
  EditOutlined,
  DeleteFilled,
  HeartOutlined,
  HeartFilled,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "./UserCard.css";

function UserCard({ details, onEdit, onDelete, onToggleLike }) {
  const { username, email, phone, website, liked } = details;

  const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`;

  return (
    <Card
      cover={
        <div className="avatar-container">
          <img alt="profile" src={avatarUrl} className="avatar-img" />
        </div>
      }
      actions={[
        <Button
          key="like"
          className="bottom-button"
          type="text"
          danger
          onClick={onToggleLike}
          icon={
            liked ? (
              <HeartFilled className="icon-heart-filled" />
            ) : (
              <HeartOutlined className="icon-heart" />
            )
          }
        />,
        <Button
          key="edit"
          type="text"
          className="bottom-button edit-btn"
          icon={<EditOutlined />}
          onClick={onEdit}
        />,
        <Button
          key="delete"
          type="text"
          className="bottom-button delete-btn"
          icon={<DeleteFilled />}
          onClick={onDelete}
        />,
      ]}
    >
      <Card.Meta
        title={username}
        description={
          <div className="user-details">
            <p>
              <MailOutlined className="user-icon" />
              {email}
            </p>
            <p>
              <PhoneOutlined className="user-icon" />
              {phone}
            </p>
            <p>
              <GlobalOutlined className="user-icon" />
              {website}
            </p>
          </div>
        }
      />
    </Card>
  );
}

export default UserCard;
