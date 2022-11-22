import React from "react";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Badge,
} from "reactstrap";
import axios from "axios";
import * as Icon from "react-feather";
import { logoutUser } from "../../../redux/actions/auth/loginActions";
import { connect, useDispatch } from "react-redux";

const UserDropdown = (props) => {
  const dispatch = useDispatch();

  return (
    <DropdownMenu>
      <DropdownItem tag="a" href="#">
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">Edit Profile</span>
      </DropdownItem>
      <DropdownItem
        tag="a"
        href="#"
        onClick={() => {
          dispatch(logoutUser());
        }}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Log Out</span>
      </DropdownItem>
    </DropdownMenu>
  );
};

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    suggestions: [],
  };

  componentDidMount() {
    axios.get("/api/main-search/data").then(({ data }) => {
      this.setState({ suggestions: data.searchResult });
    });
  }

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch,
    });
  };

  capitalizeFirstLetter(string) {
    return string && string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const fullName = this.capitalizeFirstLetter(this.props.usersData.fullname);
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">{fullName}</span>
              <span className="user-status">
                <Badge color="light-success">
                  NIK :{" "}
                  {this.props.usersData.nisornik
                    ? this.props.usersData.nisornik
                    : ""}
                </Badge>
              </span>
            </div>
            <span data-tour="user">
              <img
                src={this.props.usersData.avatars}
                onError={(e) => {
                  return (e.target.src =
                    "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png");
                }}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersData: state.auth.auth.users,
  };
};

export default connect(mapStateToProps, null)(NavbarUser);
