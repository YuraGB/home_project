import { addNewCategory } from "@/server/actions/catalog/addNewCategory";

export const createNewCategory = async (data: {
  name: string;
  description: string;
  userId: number;
}) => {
  return addNewCategory(data);
};
