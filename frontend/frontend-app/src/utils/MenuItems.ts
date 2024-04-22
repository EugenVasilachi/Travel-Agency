type MenuItemType = {
  title: string;
  path: string;
  cName: string;
};

export const MenuItems: MenuItemType[] = [
  {
    title: "All",
    path: "/destinations",
    cName: "dropdown-link",
  },
  {
    title: "Promoted",
    path: "/destinations?isPromoted=true",
    cName: "dropdown-link",
  },
];
