import jwtDecode from "jwt-decode";

export const getUsernameFromApptoken = (): string => {

  const apptoken = localStorage.getItem("apptoken");
  if (apptoken === undefined || apptoken === null)
    throw new Error('Error fetching apptoken');

  const decodedApptoken: any = jwtDecode(apptoken);

  if (decodedApptoken.username === undefined)
    throw new Error('Error extracting username from apptoken');
  
  return decodedApptoken.username.toString();
}
