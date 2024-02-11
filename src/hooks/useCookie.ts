import Cookies from "js-cookie";

export default function useCookie() {
  const setCookie = (name: string, value: string) => Cookies.set(name, value);
  const getCookie = (name: string) => Cookies.get(name);
  const removeCookie = (name: string) => Cookies.remove(name);

  return { setCookie, getCookie, removeCookie };
}
