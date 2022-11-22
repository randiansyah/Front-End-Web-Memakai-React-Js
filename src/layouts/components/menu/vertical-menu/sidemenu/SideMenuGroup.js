import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import classnames from "classnames";
import { ChevronRight } from "react-feather";
class SideMenuGroup extends React.Component {
  constructor(props) {
    super(props);
    this.flag = true;
    this.parentArray = [];
    this.childObj = {};
  }
  state = {
    isOpen: false,
    activeItem: this.props.activePath,
  };

  handleActiveItem = (url) => {
    this.setState({
      activeItem: url,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activePath !== this.props.activePath) {
      if (this.childObj.url && this.childObj.collapsed) {
        this.props.collapsedMenuPaths(this.childObj.url);
      }
      if (
        this.props.activePath === this.childObj.url &&
        !this.props.parentArr.includes(this.parentArray[0])
      ) {
        this.props.parentArr.splice(0, this.props.parentArr.length);
        this.props.parentArr.push(this.parentArray);
      } else if (this.props.parentArr.includes(this.parentArray)) {
        this.props.parentArr.splice(0, this.props.parentArr.length);
      }
    }
  }

  renderChild(item, activeGroup, handleGroupClick, handleActiveItem, parent) {
    return (
      <ul className="menu-content">
        {item.children
          ? item.children.map((child) => {
              const CustomAnchorTag =
                child.type === "external-link" ? `a` : Link;
              if (!this.parentArray.includes(item.id) && this.flag) {
                this.parentArray.push(item.id);
              }

              if (child.url && child.collapsed) {
                this.props.collapsedMenuPaths(child.url);
              }

              if (this.props.activeItemState === child.url) {
                this.childObj = child;
                this.props.parentArr.push(this.parentArray);
                this.flag = false;
              }
              if (
                (child.permissions &&
                  child.permissions.includes(this.props.currentUser)) ||
                child.permissions === undefined
              ) {
                return (
                  <li
                    key={child.id}
                    className={classnames({
                      hover: this.props.hoverIndex === child.id,
                      "has-sub": child.type === "collapse",
                      open:
                        child.type === "collapse" &&
                        activeGroup.includes(child.id),
                      "sidebar-group-active": this.props.currentActiveGroup.includes(
                        child.id
                      ),
                      active:
                        this.props.activeItemState === `/${child.url}` &&
                        child.type === "items",
                      disabled: child.disabled,
                    })}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGroupClick(child.id, item.id, child.type);
                      if (child.url && child.url !== undefined) {
                        handleActiveItem(child.url);
                      }
                      if (
                        this.props.deviceWidth <= 1200 &&
                        child.type === "item"
                      ) {
                        this.props.toggleMenu();
                      }
                    }}
                  >
                    <CustomAnchorTag
                      className={classnames({
                        "d-flex justify-content-between":
                          child.type === "collapse",
                      })}
                      to={
                        (child.url && child.type === "items") ||
                        child.type === "items"
                          ? `/${child.url}`
                          : ""
                      }
                      href={child.type === "external-link" ? child.url : ""}
                      onMouseEnter={() => {
                        this.props.handleSidebarMouseEnter(child.id);
                      }}
                      onMouseLeave={() => {
                        this.props.handleSidebarMouseEnter(child.id);
                      }}
                      key={child.id}
                      onClick={(e) => {
                        return child.type === "collapse"
                          ? e.preventDefault()
                          : "";
                      }}
                      target={child.newTab ? "_blank" : undefined}
                    >
                      <div className="menu-text">
                        <i
                          className={
                            child.icon === "icon"
                              ? "fa fa-circle-o b"
                              : `fa ${child.icon} b`
                          }
                          aria-hidden="true"
                        ></i>
                        <span className="menu-item menu-title">
                          {child.name}
                        </span>
                      </div>
                      {child.badge ? (
                        <Badge
                          color={child.badge}
                          className="float-right mr-2"
                          pill
                        >
                          {child.badgeText}
                        </Badge>
                      ) : (
                        ""
                      )}
                      {child.type === "collapse" ? (
                        <ChevronRight className="menu-toggle-icon" size={13} />
                      ) : (
                        ""
                      )}
                    </CustomAnchorTag>

                    {child.children
                      ? this.renderChild(
                          child,
                          activeGroup,
                          handleGroupClick,
                          handleActiveItem,
                          item.id
                        )
                      : ""}
                  </li>
                );
              } else if (
                child.url === this.props.activePath &&
                !child.permissions.includes(this.props.currentUser)
              ) {
                return this.props.redirectUnauthorized();
              } else {
                return null;
              }
            })
          : null}
      </ul>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderChild(
          this.props.group,
          this.props.activeGroup,
          this.props.handleGroupClick,
          this.props.handleActiveItem,
          null
        )}
      </React.Fragment>
    );
  }
}
export default SideMenuGroup;
