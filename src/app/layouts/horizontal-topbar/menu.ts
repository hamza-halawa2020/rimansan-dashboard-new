import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true,
  },
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'ti ti-home',
    subItems: [
      {
        id: 3,
        label: 'MENUITEMS.DASHBOARD.LIST.ANALYTICS',
        link: '/',
        parentId: 2,
        icon: 'ti ti-chart-line', // Icon for analytics
      },
      {
        id: 5,
        label: 'MENUITEMS.DASHBOARD.LIST.ECOMMERCE',
        link: '/ecommerce',
        parentId: 2,
        icon: 'ti ti-shopping-cart', // Icon for ecommerce
      },
    ],
  },
  {
    id: 24,
    label: 'MENUITEMS.APPS.LIST.ADDRESS',
    icon: 'ti ti-map-pin',
    subItems: [
      {
        id: 1,
        label: 'MENUITEMS.APPS.LIST.COUNTRIES',
        link: '/apps/countries',
        parentId: 24,
        icon: 'ti ti-world', // Icon for countries
      },
      {
        id: 2,
        label: 'MENUITEMS.APPS.LIST.CITIES',
        link: '/apps/cities',
        parentId: 24,
        icon: 'ti ti-building', // Icon for cities
      },
      {
        id: 3,
        label: 'MENUITEMS.APPS.LIST.SHIPMENTS',
        link: '/apps/shipments',
        parentId: 24,
        icon: 'ti ti-truck', // Icon for shipments
      },
      {
        id: 4,
        label: 'MENUITEMS.APPS.LIST.ADDRESS',
        link: '/apps/addresses',
        parentId: 24,
        icon: 'ti ti-map', // Icon for addresses
      },
    ],
  },
  {
    id: 10,
    label: 'MENUITEMS.APPS.LIST.SIDEBARBANNER',
    icon: 'ti ti-layout-sidebar-right',
    link: '/apps/ad-side-bar-banners',
    parentId: 8,
  },
  {
    id: 23,
    label: 'MENUITEMS.APPS.LIST.CATEGORIES',
    icon: 'ti ti-list-check',
    link: '/apps/categories',
    parentId: 8,
  },
  {
    id: 23,
    label: 'MENUITEMS.APPS.LIST.CERTIFICATIONS',
    icon: 'ti ti-certificate',
    link: '/apps/certifications',
    parentId: 8,
  },
  {
    id: 23,
    label: 'MENUITEMS.APPS.LIST.CLIENTS',
    icon: 'ti ti-users',
    link: '/apps/clients',
    parentId: 8,
  },
  {
    id: 23,
    label: 'MENUITEMS.APPS.LIST.CONTACTS',
    icon: 'ti ti-address-book',
    link: '/apps/contacts',
    parentId: 8,
  },
  {
    id: 11,
    label: 'MENUITEMS.APPS.LIST.COUPONS',
    icon: 'ti ti-tag',
    link: '/apps/coupons',
    parentId: 8,
  },
  {
    id: 2,
    label: 'MENUITEMS.APPS.LIST.COURSES',
    icon: 'ti ti-book',
    subItems: [
      {
        id: 9,
        label: 'MENUITEMS.APPS.LIST.COURSES',
        link: '/apps/courses',
        parentId: 8,
        icon: 'ti ti-book', // Icon for courses
      },
      {
        id: 10,
        label: 'MENUITEMS.APPS.LIST.COURSE_REVIEW',
        link: '/apps/course-review',
        parentId: 8,
        icon: 'ti ti-star', // Icon for course reviews
      },
    ],
  },
  {
    id: 9,
    label: 'MENUITEMS.APPS.LIST.EVENT',
    icon: 'ti ti-calendar-event',
    link: '/apps/events',
    parentId: 8,
  },
  {
    id: 9,
    label: 'MENUITEMS.APPS.LIST.FAQS',
    icon: 'ti ti-help',
    link: '/apps/faqs',
    parentId: 8,
  },
  {
    id: 9,
    label: 'MENUITEMS.APPS.LIST.INSTRUCTORS',
    icon: 'ti ti-school',
    link: '/apps/instructors',
    parentId: 8,
  },
  {
    id: 9,
    label: 'MENUITEMS.APPS.LIST.MAIN_SLIDER',
    icon: 'ti ti-slideshow',
    link: '/apps/main-sliders',
    parentId: 8,
  },
  {
    id: 9,
    label: 'MENUITEMS.APPS.LIST.POSTS',
    icon: 'ti ti-article',
    link: '/apps/posts',
    parentId: 8,
  },
  {
    id: 2,
    label: 'MENUITEMS.APPS.LIST.PRODUCTS',
    icon: 'ti ti-shopping-cart',
    subItems: [
      {
        id: 9,
        label: 'MENUITEMS.APPS.LIST.PRODUCTS',
        link: '/apps/products',
        parentId: 8,
        icon: 'ti ti-shopping-cart', // Icon for products
      },
      {
        id: 10,
        label: 'MENUITEMS.APPS.LIST.PRODUCT_REVIEW',
        link: '/apps/product-review',
        parentId: 8,
        icon: 'ti ti-star', // Icon for product reviews
      },
    ],
  },
  {
    id: 23,
    label: 'MENUITEMS.APPS.LIST.TAGS',
    icon: 'ti ti-tag',
    link: '/apps/tags',
    parentId: 8,
  },
  {
    id: 23,
    label: 'MENUITEMS.APPS.LIST.SOCIAL_LINKS',
    icon: 'ti ti-share',
    link: '/apps/social-links',
    parentId: 8,
  },
  {
    id: 23,
    label: 'MENUITEMS.APPS.LIST.USERS',
    icon: 'ti ti-user',
    link: '/apps/users',
    parentId: 8,
  },
  {
    id: 23,
    label: 'MENUITEMS.APPS.LIST.ORDERS',
    icon: 'ti ti-shopping-cart',
    link: '/apps/orders',
    parentId: 8,
  },
  {
    id: 23,
    label: 'MENUITEMS.APPS.LIST.PAYMENTS',
    icon: 'ti ti-credit-card',
    link: '/apps/payments',
    parentId: 8,
  },
  {
    id: 142,
    label: 'MENUITEMS.CHARTS.TEXT',
    icon: 'ti ti-chart-pie',
    subItems: [
      {
        id: 143,
        label: 'MENUITEMS.CHARTS.LIST.LINE',
        link: '/charts/apex-line',
        parentId: 142,
        icon: 'ti ti-chart-line', // Icon for line chart
      },
      {
        id: 144,
        label: 'MENUITEMS.CHARTS.LIST.AREA',
        link: '/charts/apex-area',
        parentId: 142,
        icon: 'ti ti-chart-area', // Icon for area chart
      },
      {
        id: 145,
        label: 'MENUITEMS.CHARTS.LIST.COLUMN',
        link: '/charts/apex-column',
        parentId: 142,
        icon: 'ti ti-chart-bar', // Icon for column chart
      },
      {
        id: 146,
        label: 'MENUITEMS.CHARTS.LIST.BAR',
        link: '/charts/apex-bar',
        parentId: 142,
        icon: 'ti ti-chart-bar', // Icon for bar chart
      },
      {
        id: 147,
        label: 'MENUITEMS.CHARTS.LIST.MIXED',
        link: '/charts/apex-mixed',
        parentId: 142,
        icon: 'ti ti-chart-line', // Icon for mixed chart
      },
      {
        id: 148,
        label: 'MENUITEMS.CHARTS.LIST.TIMELINE',
        link: '/charts/apex-timeline',
        parentId: 142,
        icon: 'ti ti-timeline', // Icon for timeline chart
      },
      {
        id: 149,
        label: 'MENUITEMS.CHARTS.LIST.CANDLESTICK',
        link: '/charts/apex-candlestick',
        parentId: 142,
        icon: 'ti ti-candle', // Icon for candlestick chart
      },
      {
        id: 150,
        label: 'MENUITEMS.CHARTS.LIST.BOXPLOT',
        link: '/charts/apex-boxplot',
        parentId: 142,
        icon: 'ti ti-box', // Icon for boxplot chart
      },
      {
        id: 151,
        label: 'MENUITEMS.CHARTS.LIST.BUBBLE',
        link: '/charts/apex-bubble',
        parentId: 142,
        icon: 'ti ti-bubble', // Icon for bubble chart
      },
      {
        id: 152,
        label: 'MENUITEMS.CHARTS.LIST.SCATTER',
        link: '/charts/apex-scatter',
        parentId: 142,
        icon: 'ti ti-scatter', // Icon for scatter chart
      },
      {
        id: 153,
        label: 'MENUITEMS.CHARTS.LIST.HEATMAP',
        link: '/charts/apex-heatmap',
        parentId: 142,
        icon: 'ti ti-heatmap', // Icon for heatmap chart
      },
      {
        id: 154,
        label: 'MENUITEMS.CHARTS.LIST.TREEMAP',
        link: '/charts/apex-treemap',
        parentId: 142,
        icon: 'ti ti-tree', // Icon for treemap chart
      },
      {
        id: 155,
        label: 'MENUITEMS.CHARTS.LIST.PIE',
        link: '/charts/apex-pie',
        parentId: 142,
        icon: 'ti ti-chart-pie', // Icon for pie chart
      },
      {
        id: 156,
        label: 'MENUITEMS.CHARTS.LIST.RADIALBAR',
        link: '/charts/apex-radialbar',
        parentId: 142,
        icon: 'ti ti-chart-donut', // Icon for radial bar chart
      },
      {
        id: 157,
        label: 'MENUITEMS.CHARTS.LIST.RADAR',
        link: '/charts/apex-radar',
        parentId: 142,
        icon: 'ti ti-radar', // Icon for radar chart
      },
      {
        id: 158,
        label: 'MENUITEMS.CHARTS.LIST.POLARAREA',
        link: '/charts/apex-polar',
        parentId: 142,
        icon: 'ti ti-chart-polar', // Icon for polar area chart
      },
    ],
  },
  {
    id: 161,
    label: 'MENUITEMS.ICONS.TEXT',
    icon: 'ti ti-icons',
    link: '/icons/bootstrap',
    parentId: 159,
  },
];
