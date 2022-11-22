import React from "react";
import * as Icon from "react-feather";

const horizontalMenuConfig = [
  {
    id: "home",
    title: "Home",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/",
  },
  {
    id: "users",
    title: "Users",
    type: "item",
    icon: <Icon.User size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/users",
  },
  {
    id: "rooms",
    title: "Rooms",
    type: "item",
    icon: <Icon.BookOpen size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/rooms",
  },
  // {
  //   id: "usersApp",
  //   title: "User",
  //   type: "dropdown",
  //   icon: <Icon.User size={16} />,
  //   children: [
  //     {
  //       id: "userList",
  //       title: "List",
  //       type: "item",
  //       icon: <Icon.Circle size={10} />,
  //       navLink: "/app/user/list",
  //       permissions: ["admin", "editor"],
  //     },
  //     {
  //       id: "userView",
  //       title: "View",
  //       type: "item",
  //       icon: <Icon.Circle size={10} />,
  //       navLink: "/app/user/view",
  //       permissions: ["admin", "editor"],
  //     },
  //     {
  //       id: "userEdit",
  //       title: "Edit",
  //       type: "item",
  //       icon: <Icon.Circle size={10} />,
  //       navLink: "/app/user/edit",
  //       permissions: ["admin", "editor"],
  //     },
  //   ],
  // },
];

export default horizontalMenuConfig;
