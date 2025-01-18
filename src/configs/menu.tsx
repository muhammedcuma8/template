import { BaseMenu } from "../utils/types/baseMenu";

const getMenuConfig = (t: any): BaseMenu[] => {
  return [
    {
      label: t("Pages.title"),
      icon: "pi pi-fw pi-star-fill",
      items: [
        {
          label: t("Pages.Empty"),
          icon: "pi pi-fw pi-circle-off",
          to: "/",
        },
        {
          label: t("Pages.Articles"),
          icon: "pi pi-fw pi-table",
          to: "/pages/articles",
        },
        {
          label: t("Pages.Products"),
          icon: "pi pi-fw pi-box",
          to: "/pages/products",
        },
        {
          label: t("Pages.ProductsCURD"),
          icon: "pi pi-fw pi-box",
          to: "/pages/productsCRUD",
        },
        {
          label: t("Pages.Form"),
          icon: "pi pi-fw pi-box",
          to: "/pages/form",
        },
        {
          label: t("Pages.Access Control"),
          icon: "pi pi-fw pi-key",
          items: [
            {
              label: t("Pages.Users"),
              icon: "pi pi-fw pi-users",
              to: "/pages/Users",
            },
            {
              label: t("Pages.Roles"),
              icon: "pi pi-fw pi-sliders-h",
              to: "/pages/roles",
            },

            {
              label: t("Pages.Permissions"),
              icon: "pi pi-fw pi-bolt",
              to: "/pages/Permissions",
            },
            {
              label: t("Pages.Pages"),
              icon: "pi pi-fw pi-book",
              to: "/pages/Pages",
            },
            {
              label: t("Pages.userRoles"),
              icon: "pi pi-fw pi-book",
              to: "/pages/userRoles",
            },
          ],
        },
      ],
    },
  ];
};

export default getMenuConfig;
