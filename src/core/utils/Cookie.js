// LIBs
import jsCookie from "js-cookie";

// Link da LIB: https://github.com/js-cookie/js-cookie

// Inseri um cookie 
export const set = (name, value, options = {}) => {
  if(options.session) {
    jsCookie.set(name, value, { expires: options.expires });
  } else {
    jsCookie.set(name, value);
  }
}

// Mostra um cookie
export const get = (name) => {
  return jsCookie.get(name);
}

// Remove um cookie
export const remove = (name) => {
  jsCookie.remove(name);
}