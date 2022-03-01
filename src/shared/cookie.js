const getCookie = (name) => {
  const value = '; ' + document.cookie;

  const parts = value.split('; ' + name + '=');

  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
};

const setCookie = (name, value, exp = 5) => {
  const date = new Date();

  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

const deleteCookie = (name) => {
  document.cookie = name + `=; expires=Thu, 01 Jan 1999 00:00:10 GMT;;path=/`;
};

export { getCookie, setCookie, deleteCookie };
