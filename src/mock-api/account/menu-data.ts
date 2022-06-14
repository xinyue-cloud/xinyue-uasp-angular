export const MENUS_DATA = {
  header : [
    {
      label: "我的首页",
    },
  ],
  sidebar: [
    {
      label: "系统主页",
      icon : "far fa-circle",
      items: [
        {
          label     : "监控中心",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/monitor"],
        },
        {
          label     : "工作中心",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/work-center"],
        },
        {
          label     : "个人中心",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/profile"],
        },
      ],
    },
    {
      label: "应用管理",
      icon : "far fa-circle",
      items: [
        {
          label     : "应用目录",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/apps"],
        },
        {
          label     : "应用变量",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/app-var"],
        },
      ],
    },
    {
      label: "服务管理",
      icon : "far fa-circle",
      items: [
        {
          label     : "服务目录",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/service"],
        },
        {
          label     : "服务配置",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/config"],
        },
        {
          label     : "路由配置",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/route"],
        },
        {
          label     : "接口管理",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/api"],
        },
        {
          label     : "接口分组",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/api-group"],
        },
      ],
    },
    {
      label: "订阅中心",
      icon : "far fa-circle",
      items: [
        {
          label     : "接口订阅",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/api-subscribe"],
        },
        {
          label     : "订阅管理",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/subscribe"],
        },
      ],
    },
    {
      label: "审核中心",
      icon : "far fa-circle",
      items: [
        {
          label     : "新增应用审核",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/app-audit"],
        },
        {
          label     : "接口发布审核",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/api-audit"],
        },
        {
          label     : "接口订阅审核",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/subscribe-audit"],
        },
      ],
    },
    {
      label: "系统管理",
      icon : "far fa-circle",
      items: [
        {
          label     : "用户管理",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/user"],
        },
        {
          label     : "系统配置",
          icon      : "fas fa-arrow-right",
          routerLink: ["/msp/sys-conf"],
        },
      ],
    },
    {
      header: "标签",
    },
    {
      label     : "重要",
      icon      : "far fa-circle",
      iconClass : "text-danger",
      routerLink: [
        "/blank",
      ],
    },
    {
      label     : "警告",
      icon      : "fas fa-circle",
      iconClass : "text-warning",
      routerLink: [
        "/blank",
      ],
    },
    {
      label     : "信息",
      icon      : "fas fa-circle",
      iconClass : "text-info",
      routerLink: [
        "/blank",
      ],
    },
  ],
};
