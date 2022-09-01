import jwtDecode from "jwt-decode";
import { CategoryInterface, SelectInterface } from "./interfaces";

export const getUsernameFromApptoken = (): string => {

  const apptoken = localStorage.getItem("apptoken");
  if (apptoken === undefined || apptoken === null)
    throw new Error('Error fetching apptoken');

  const decodedApptoken: any = jwtDecode(apptoken);

  if (decodedApptoken.username === undefined)
    throw new Error('Error extracting username from apptoken');
  
  if (Date.now() >= decodedApptoken.exp * 1000)
    throw new Error('apptoken is expired')
  
  return decodedApptoken.username.toString();
}

export const convertToSelectInterface = (categories: CategoryInterface[]): any[] => {

  const options: SelectInterface[] = [];

  categories.map( (category: CategoryInterface) => {
      options.push({value: category.id.toString(), label: category.name})
  });

  return options;
}