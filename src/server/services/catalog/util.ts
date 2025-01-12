import {
  TCategoryReturnType,
  TCategoryWithRelations,
} from "@/server/services/catalog/getCatalogByUserIDWithData";

export const helper = (data: TCategoryWithRelations): TCategoryReturnType => {
  return data.reduce(
    (acc, row) => {
      const posts = acc.posts;
      const rating = acc.rating;
      const subCategories = acc.sub_categories;

      const rate = row.rating;
      const post = row.posts;
      const subCat = row.sub_categories;

      if (post && !posts.find((i) => i.id === post.id)) {
        posts.push(post);
      }

      if (rate && !rating.find((i) => i.id === rate.id)) {
        rating.push(rate);
      }

      if (subCat && !subCategories.find((i) => i.id === subCat.id)) {
        subCategories.push(subCat);
      }

      return acc;
    },
    {
      categories: data[0].categories,
      posts: data[0].posts ? [data[0].posts] : [],
      sub_categories: data[0].sub_categories ? [data[0].sub_categories] : [],
      rating: data[0].rating ? [data[0].rating] : [],
    },
  );
};
