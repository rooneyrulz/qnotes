import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { ROLES } from "../../config/roles";
import useAuth from "../../hooks/useAuth";

const USER_REGEX =
  /^([A-Za-z0-9]{3,20}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();
  const { username: currentUser } = useAuth();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isError) {
      toast(error?.data?.message || "Something went wrong!", {
        type: "error",
      });
    }

    if (isDelError) {
      toast(delerror?.data?.message || "Something went wrong!", {
        type: "error",
      });
    }
  }, [delerror?.data?.message, error?.data?.message, isDelError, isError]);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      if (isSuccess) {
        toast(`User updated!`, {
          type: "success",
        });
      }
      if (isDelSuccess) {
        toast(`User deleted!`, { type: "success" });
      }
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    deleteUser({ id: user.id })
      .then((res) => {
        if (user.username === currentUser) {
          localStorage.removeItem("token");
          window.location.href = process.env.REACT_APP_BASE_URL;
        }
      })
      .catch((err) => toast(`Something went wrong!`, { type: "error" }));
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const content = (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <div className="form__title-row">
        <h2>Edit User</h2>
        <div className="form__action-buttons">
          <button
            className="icon-button"
            title="Save"
            onClick={onSaveUserClicked}
            disabled={!canSave}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button
            className="icon-button"
            title="Delete"
            onClick={onDeleteUserClicked}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
      <label className="form__label" htmlFor="username">
        Username: <span className="nowrap">[3-20 letters]</span>
      </label>
      <input
        className={`form__input ${validUserClass}`}
        id="username"
        name="username"
        type="text"
        autoComplete="off"
        value={username}
        onChange={onUsernameChanged}
      />

      <label className="form__label" htmlFor="password">
        Password: <span className="nowrap">[empty = no change]</span>{" "}
        <span className="nowrap">[4-12 chars incl. !@#$%]</span>
      </label>
      <input
        className={`form__input ${validPwdClass}`}
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={onPasswordChanged}
      />

      <label
        className="form__label form__checkbox-container"
        htmlFor="user-active"
      >
        ACTIVE:
        <input
          className="form__checkbox"
          id="user-active"
          name="user-active"
          type="checkbox"
          checked={active}
          onChange={onActiveChanged}
        />
      </label>

      <label className="form__label" htmlFor="roles">
        ASSIGNED ROLES:
      </label>
      <select
        id="roles"
        name="roles"
        className={`form__select ${validRolesClass}`}
        multiple={true}
        size="3"
        value={roles}
        onChange={onRolesChanged}
      >
        {options}
      </select>
    </form>
  );

  return content;
};
export default EditUserForm;
