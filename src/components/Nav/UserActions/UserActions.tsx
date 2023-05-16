import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./UserActions.module.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { authSelector } from "@/redux/authSlice/authSlice";
import { useSelector } from "react-redux";
import Link from "next/link";
const UserActions = () => {
  const [active, setActive] = useState(false);
  const { isAuth, role } = useSelector(authSelector);
  const onHover = () => setActive((prev) => !prev);
  return (
    <button
      onMouseEnter={onHover}
      onClick={() => setActive(true)}
      onMouseLeave={onHover}
      aria-label="user-actions"
      className={style["user"]}
    >
      <FontAwesomeIcon size="lg" icon={faUser}></FontAwesomeIcon>
      <ul
        className={`${style["user-actions"]} ${
          active ? "shown" : style["hidden"]
        }`}
      >
        {isAuth ? (
          <>
            <li>
              <Link href={"/profile"}>Profile</Link>
            </li>
            <li>
              <Link href={"/logout"}>Logout</Link>
            </li>
            {role == "ADMIN" && (
              <li>
                <Link href={"/admin"}>Admin dashboard</Link>
              </li>
            )}
          </>
        ) : (
          <>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
          </>
        )}
      </ul>
    </button>
  );
};
export default UserActions;
