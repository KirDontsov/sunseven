function safeJsonParse(obj: string) {
  let json;

  try {
    json = JSON.parse(obj);
  } catch (err) {
    console.warn(err);
    return json;
  }
}

let b64DecodeUnicode = (str?: string) =>
  decodeURIComponent(
    Array.prototype.map.call(atob(str || ''), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''),
  );

// export function parseJwt(token?: string | null): any {
//   let parsed;
//   try {
//     parsed = JSON.parse(b64DecodeUnicode(token?.split('.')[1].replace('-', '+').replace('_', '/')));
//     return parsed;
//   } catch (e) {
//     console.warn(e);
//     parsed = { sub: '', role: '', iat: 0, exp: 0 };
//     return parsed;
//   }
// }

export const parseJwt = (token?: string | null) => {
  try {
    return JSON.parse(atob((token || '')?.split('.')[1]));
  } catch (e) {
    return null;
  }
};
