export const AsideMenuAdminGeneral = {
    items: [
      {
        title: 'Dashboard',
        root: true,
        name: "dashboard",
        icon: 'flaticon2-architecture-and-city',
        svg: './assets/media/svg/icons/Design/Layers.svg',
        page: '/dashboard',
        translate: 'MENU.DASHBOARD',
        bullet: 'dot',
      },
      { section: 'Usuario' },
      {
        title: 'Usuarios',
        root: true,
        name: "users",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/General/User.svg',
        page: '/users',
        submenu: [
          {
            title: 'Gestion Usuarios',
            page: '/users/list'
          }
        ]
      },
      { section: 'Productos' },
      {
        title: 'categorias',
        root: true,
        name: "categorias",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Design/Layers.svg',
        page: '/categorias',
        submenu: [
          {
            title: 'lista',
            page: '/categorias/list'
          }
        ]
      },
      {
        title: 'productos',
        root: true,
        name: "productos",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Devices/Laptop.svg',
        page: '/productos',
        submenu: [
          {
            title: 'Crear Producto ',
            page: '/productos/registrar-producto'
          },
          {
            title: 'lista Producto',
            page: '/productos/lista-de-todos-los-productos'
          },
        ]
      },
      {
        title: 'sliders',
        root: true,
        name: "sliders",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Layout/Layout-3d.svg',
        page: '/sliders',
        submenu: [
          {
            title: 'lista Sliders',
            page: '/sliders/lista-sliders'
          }
        ]
      },
      {
        title: 'Cupones',
        root: true,
        name: "cupones",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Devices/Cardboard-vr.svg',
        page: '/cupones',
        submenu: [
          {
            title: 'Registrar Cupon',
            page: '/cupones/registrar-cupon'
          },
          {
            title: 'Lista Cupones',
            page: '/cupones/listar-cupones'
          }
        ]
      },
      {
        title: 'Descuento',
        root: true,
        name: "descuento",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/General/Clipboard.svg',
        page: '/descuento',
        submenu: [
          {
            title: 'Registrar Descuento',
            page: '/descuento/registrar-descuento'
          },
          {
            title: 'Lista Descuentos',
            page: '/descuento/listar-descuento'
          }
        ]
      },
    ]
}