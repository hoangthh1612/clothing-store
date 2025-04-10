import {
  DownOutlined,
  LineChartOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SoundOutlined,
  UpOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

export const subMenusData = [
  {
    label: "Order management",
    path: "order",
    icon: <ShoppingCartOutlined style={{ fontSize: 20 }} />,
    subNav: [
      {
        label: "All",
        path: "/seller/order",
      },
      {
        label: "Cancelled",
        path: "/seller/order?type=cancelled",
      },
    ],
  },
  {
    label: "Product management",
    path: "product",
    icon: <ShoppingOutlined style={{ fontSize: 20 }} />,
  subNav: [
      {
        label: "All products",
        path: "/seller/product/all",
      },
      {
        label: "Create product",
        path: "/seller/product/new",
      },
      {
        label: "Product categories",
        path: "/seller/product/category",
      },
      {
        label: "Attributes",
        path: "/seller/product/attribute",
      }
    ],
  },
  // {
  //   label: "Sales analysis",
  //   path: "analysis",
  //   icon: <LineChartOutlined style={{ fontSize: 20 }} />,
  //   subNav: [
  //     {
  //       label: "Overview",
  //       path: "/seller/analysis/overview",
  //     },
  //     {
  //       label: "livestream",
  //       path: "/seller/analysis/livestream",
  //     },
  //   ],
  // },
  {
    label: "Livestream",
    path: "livestream",
    icon: <VideoCameraOutlined style={{ fontSize: 20 }} />,
    subNav: [
      // {
      //   label: "Create livesream",
      //   path: "/seller/livestream/create",
      // },
      {
        label: "Livestream management",
        path: "/seller/livestream/list",
      },
    ],
  },
  {
    label: "Marketing channel",
    path: "marketing",
    icon: <SoundOutlined style={{ fontSize: 20 }} />,
    subNav: [
      {
        label: "All voucher",
        path: "/seller/marketing/list-voucher",
      },
      {
        label: "Create voucher",
        path: "/seller/marketing/create-voucher",
      },
    ],
  },

  {
    label: "Setting",
    path: "setting",
    icon: <SettingOutlined style={{ fontSize: 20 }} />,
    subNav: [
      {
        label: "Account",
        path: "/seller/setting/account",
      },
      // {
      //   label: "Address",
      //   path: "/seller/setting/address",
      // },
      {
        label: "Shop profile",
        path: "/seller/setting/shop-profile",
      },
    ],
  },
];


// import {
//     DownOutlined,
//     LineChartOutlined,
//     SettingOutlined,
//     ShoppingCartOutlined,
//     ShoppingOutlined,
//     SoundOutlined,
//     UpOutlined,
//     VideoCameraOutlined,
//   } from "@ant-design/icons";
  
//   type subNav = {
//     label: string;
//     path: string;
//   }
//   type subMenuType = {
//     label: string;
//     path: string;
//     icon: any;
//     subNav: subNav[];
//   }
//   export const subMenusData: subMenuType[] = [
//     {
//       label: "Order management",
//       path: "order",
//       icon: ShoppingCartOutlined,
//       subNav: [
//         {
//           label: "All",
//           path: "/seller/order",
//         },
//         {
//           label: "Canceled",
//           path: "cancel",
//         },
//       ],
//     },
//     {
//       label: "Product management",
//       path: "product",
//       icon: ShoppingOutlined,
//     subNav: [
//         {
//           label: "All products",
//           path: "/seller/product/all",
//         },
//         {
//           label: "Create product",
//           path: "/seller/product/new",
//         },
//       ],
//     },
//     {
//       label: "Sales analysis",
//       path: "analysis",
//       icon: LineChartOutlined,
//       subNav: [
//         {
//           label: "Overview",
//           path: "/seller/analysis/overview",
//         },
//         {
//           label: "livestream",
//           path: "/seller/analysis/livestream",
//         },
//       ],
//     },
//     {
//       label: "Livestream",
//       path: "livestream",
//       icon: VideoCameraOutlined,
//       subNav: [
//         // {
//         //   label: "Create livesream",
//         //   path: "/seller/livestream/create",
//         // },
//         {
//           label: "Livestream management",
//           path: "/seller/livestream/list",
//         },
//       ],
//     },
//     {
//       label: "Marketing channel",
//       path: "marketing",
//       icon: SoundOutlined,
//       subNav: [
//         {
//           label: "All voucher",
//           path: "/seller/marketing/list-voucher",
//         },
//         {
//           label: "Create voucher",
//           path: "/seller/marketing/create-voucher",
//         },
//       ],
//     },
  
//     {
//       label: "Setting",
//       path: "setting",
//       icon: SettingOutlined,
//       subNav: [
//         {
//           label: "Account",
//           path: "/seller/setting/account",
//         },
//         {
//           label: "Address",
//           path: "/seller/setting/address",
//         },
//         {
//           label: "Shop profile",
//           path: "/seller/setting/shop-profile",
//         },
//       ],
//     },
//   ];
  