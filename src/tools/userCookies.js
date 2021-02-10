import cookie from 'js-cookie';

export function setUserCookie(userInfo) {
  const arr = Object.entries(userInfo);
  arr.forEach((item) => {
    cookie.set(item[0], item[1]);
  });
}

export function getUserCookie() {
  return {
    username: cookie.get('username'),
    appkey: cookie.get('appkey'),
    role: cookie.get('role'),
    email: cookie.get('email'),
  };
}

export function removeCookie() {
  cookie.remove('username');
  cookie.remove('appkey');
  cookie.remove('role');
  cookie.remove('email');
  return true;
}
