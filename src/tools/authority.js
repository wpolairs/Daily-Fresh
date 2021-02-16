const menuRouters = {
  coustomer: [
    {
      name: 'product',
    },
    {
      name: 'list',
    },
    {
      name: 'add',
    },
    {
      name: 'edit',
    },
  ],
  admin: [
    {
      name: 'product',
    },
    {
      name: 'list',
    },
    {
      name: 'add',
    },
    {
      name: 'category',
    },
    {
      name: 'edit',
    },
  ],
};

/**
 * 过滤掉没有权限的路由
 * @param {String} role
 * @param {Array} routers
 */
export default function getAuthorityRouter(role, routers) {
  const routerName = menuRouters[role].map((item) => item.name);
  const resultRouter = routers.filter((router) => {
    const obj = router;
    if (routerName.includes(obj.name)) {
      if (obj.children) {
        obj.children = obj.children.filter((child) => routerName.includes(child.name));
      }
      return true;
    }
    return false;
  });
  return resultRouter;
}
