export const MENUS_DATA = {
  header : [
    {
      label: '后台管理',
    },
  ],
  sidebar: [
    {
      label: '开发配置',
      icon : 'far fa-circle',
      items: [
        {
          label     : '应用系统',
          icon      : 'fas fa-arrow-right',
          routerLink: ['/uasp/applic'],
        },
        {
          label     : '功能菜单',
          icon      : 'fas fa-arrow-right',
          routerLink: ['/uasp/func'],
        },
      ],
    },
    {
      header: '标签',
    },
    {
      label     : '重要',
      icon      : 'far fa-circle',
      iconClass : 'text-danger',
      routerLink: [
        '/blank',
      ],
    },
    {
      label     : '警告',
      icon      : 'fas fa-circle',
      iconClass : 'text-warning',
      routerLink: [
        '/blank',
      ],
    },
    {
      label     : '信息',
      icon      : 'fas fa-circle',
      iconClass : 'text-info',
      routerLink: [
        '/blank',
      ],
    },
  ],
};
