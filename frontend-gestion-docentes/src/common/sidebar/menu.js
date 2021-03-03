import { Layers } from "react-feather";

export const items = [
  {
    title: "Administrativo",
    icon: Layers,
    type: "sub",
    badgeType: "primary",
    active: false,
    children: [
      { path: "/add-user", title: "Agregar Trabajores", type: "link" },
      { path: "/users", title: "Trabajadores", type: "link" },
    ],
  },
];
