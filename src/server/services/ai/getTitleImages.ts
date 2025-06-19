"use server";

import { imagesUrlToBase64 } from "@/server/lib/imagesUrlToBase64";

import { getJson } from "serpapi";

/**
 * Отримує зображення для назви, використовуючи SerpAPI.
 * @param titleName Назва для пошуку зображень.
 * @returns Масив URL зображень "data:image/webp;base64...".
 */
export const getTitleImages = async (titleName: string): Promise<string[]> => {
  console.log("getTitleImages", titleName);
  const response = await getJson({
    engine: "google_images",
    api_key: process.env.SERP_API_KEY, // Get your API_KEY from https://serpapi.com/manage-api-key
    q: titleName,
    ijn: "0",
    location: "Austin, Texas",
  });
  if (response?.images_results?.length) {
    const imagesBase64Array = await imagesUrlToBase64(response.images_results);

    return imagesBase64Array.filter((image) => image !== null);
  } else {
    console.warn("No images found for title:", titleName);
    return [];
  }

  // const dummyData = {
  //   search_metadata: {
  //     id: "6852b693eb2bd118e048e8bd",
  //     status: "Success",
  //     json_endpoint:
  //       "https://serpapi.com/searches/74057b03f87fee0b/6852b693eb2bd118e048e8bd.json",
  //     created_at: "2025-06-18 12:52:35 UTC",
  //     processed_at: "2025-06-18 12:52:35 UTC",
  //     google_images_url:
  //       "https://www.google.com/search?q=i%27m+an+evil+god&oq=i%27m+an+evil+god&hl=en&gl=us&udm=2",
  //     raw_html_file:
  //       "https://serpapi.com/searches/74057b03f87fee0b/6852b693eb2bd118e048e8bd.html",
  //     total_time_taken: 3.46,
  //   },
  //   search_parameters: {
  //     engine: "google_images",
  //     q: "i'm an evil god",
  //     google_domain: "google.com",
  //     hl: "en",
  //     gl: "us",
  //     device: "desktop",
  //   },
  //   search_information: {
  //     image_results_state: "Results for exact spelling",
  //   },
  //   suggested_searches: [
  //     {
  //       name: "Xie yan",
  //       link: "https://www.google.com/search?sca_esv=c00251c694cd13aa&gl=us&hl=en&q=i+m+an+evil+god+xie+yan&uds=AOm0WdE2fekQnsyfYEw8JPYozOKzYKJ8E4Wfqkt7b1yV9P1xW2v8e4sEhTlUMIVE3gQvyW5IhsB2pxA5C_nkIxYoqE1SJsQOoEJ2T6nsprtIZLHrDgyyYXNQPc2Ae0ktNzQ0aHJZA8teTmLzVb1stu8uamikckfeXZiS8kuXWdSYsdGXz7s1x-o&udm=2&sa=X&ved=2ahUKEwiciJvUgfuNAxXuR_EDHQPFCRMQxKsJegQICxAB&ictx=0",
  //       uds: "AOm0WdE2fekQnsyfYEw8JPYozOKzYKJ8E4Wfqkt7b1yV9P1xW2v8e4sEhTlUMIVE3gQvyW5IhsB2pxA5C_nkIxYoqE1SJsQOoEJ2T6nsprtIZLHrDgyyYXNQPc2Ae0ktNzQ0aHJZA8teTmLzVb1stu8uamikckfeXZiS8kuXWdSYsdGXz7s1x-o",
  //       q: "i m an evil god xie yan",
  //       serpapi_link:
  //         "https://serpapi.com/search.json?device=desktop&engine=google_images&gl=us&google_domain=google.com&hl=en&q=i+m+an+evil+god+xie+yan&uds=AOm0WdE2fekQnsyfYEw8JPYozOKzYKJ8E4Wfqkt7b1yV9P1xW2v8e4sEhTlUMIVE3gQvyW5IhsB2pxA5C_nkIxYoqE1SJsQOoEJ2T6nsprtIZLHrDgyyYXNQPc2Ae0ktNzQ0aHJZA8teTmLzVb1stu8uamikckfeXZiS8kuXWdSYsdGXz7s1x-o",
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/e88ad2be8801c5f33fe581e96eca8b7b9b7b3c4cd70fe8b60ea1027d452c1b29.jpeg",
  //     },
  //     {
  //       name: "God wiki",
  //       link: "https://www.google.com/search?sca_esv=c00251c694cd13aa&gl=us&hl=en&q=i+m+an+evil+god+wiki&uds=AOm0WdE2fekQnsyfYEw8JPYozOKzzx1qfahp2UWthC9jUZ8uQdCgc6KVmf-V1M95sEpiSZ0s70j2OfkJ5E-zcjLgkcgCSgmHbiXigH7qIZKrfbjO-EIGF5PWWHtUi6Vz74BXNo0w6iTlLVZEO4ADj6QlOofvCz4Qwrn42pShcGjfpKwkRrdYiVU&udm=2&sa=X&ved=2ahUKEwiciJvUgfuNAxXuR_EDHQPFCRMQxKsJegQIDxAB&ictx=0",
  //       uds: "AOm0WdE2fekQnsyfYEw8JPYozOKzzx1qfahp2UWthC9jUZ8uQdCgc6KVmf-V1M95sEpiSZ0s70j2OfkJ5E-zcjLgkcgCSgmHbiXigH7qIZKrfbjO-EIGF5PWWHtUi6Vz74BXNo0w6iTlLVZEO4ADj6QlOofvCz4Qwrn42pShcGjfpKwkRrdYiVU",
  //       q: "i m an evil god wiki",
  //       serpapi_link:
  //         "https://serpapi.com/search.json?device=desktop&engine=google_images&gl=us&google_domain=google.com&hl=en&q=i+m+an+evil+god+wiki&uds=AOm0WdE2fekQnsyfYEw8JPYozOKzzx1qfahp2UWthC9jUZ8uQdCgc6KVmf-V1M95sEpiSZ0s70j2OfkJ5E-zcjLgkcgCSgmHbiXigH7qIZKrfbjO-EIGF5PWWHtUi6Vz74BXNo0w6iTlLVZEO4ADj6QlOofvCz4Qwrn42pShcGjfpKwkRrdYiVU",
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/e88ad2be8801c5f33fe581e96eca8b7bd06577fad5ef3bab49c6b725275935d2.jpeg",
  //     },
  //     {
  //       name: "Anime",
  //       link: "https://www.google.com/search?sca_esv=c00251c694cd13aa&gl=us&hl=en&q=anime+i%27m+an+evil+god&uds=AOm0WdE2fekQnsyfYEw8JPYozOKzzx1qfahp2UWthC9jUZ8uQdCgc6KVmf-V1M95sEpiSZ3AT-bqEHiODAh6mOXgPsrGeNvir2C-pQQlbK-xIGH91Bm1uB_Iqo5WzjrrLFoTOCWnxeyGV5Bm8J06PhaoP3oFA6aRu32vuwQE_BDAIHbwEzo3UNk&udm=2&sa=X&ved=2ahUKEwiciJvUgfuNAxXuR_EDHQPFCRMQxKsJegQICBAB&ictx=0",
  //       uds: "AOm0WdE2fekQnsyfYEw8JPYozOKzzx1qfahp2UWthC9jUZ8uQdCgc6KVmf-V1M95sEpiSZ3AT-bqEHiODAh6mOXgPsrGeNvir2C-pQQlbK-xIGH91Bm1uB_Iqo5WzjrrLFoTOCWnxeyGV5Bm8J06PhaoP3oFA6aRu32vuwQE_BDAIHbwEzo3UNk",
  //       q: "anime i'm an evil god",
  //       serpapi_link:
  //         "https://serpapi.com/search.json?device=desktop&engine=google_images&gl=us&google_domain=google.com&hl=en&q=anime+i%27m+an+evil+god&uds=AOm0WdE2fekQnsyfYEw8JPYozOKzzx1qfahp2UWthC9jUZ8uQdCgc6KVmf-V1M95sEpiSZ3AT-bqEHiODAh6mOXgPsrGeNvir2C-pQQlbK-xIGH91Bm1uB_Iqo5WzjrrLFoTOCWnxeyGV5Bm8J06PhaoP3oFA6aRu32vuwQE_BDAIHbwEzo3UNk",
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/e88ad2be8801c5f33fe581e96eca8b7b04ecc6c4644d6e4f31f3f9034dda3a0a.jpeg",
  //     },
  //     {
  //       name: "Martial arts",
  //       link: "https://www.google.com/search?sca_esv=c00251c694cd13aa&gl=us&hl=en&q=martial+arts+i%27m+an+evil+god&uds=AOm0WdE2fekQnsyfYEw8JPYozOKzdihfXF8cYFD-5kb2K9Cev1fBp_uFHZ6ZbEKxL-QKLPdoxWWfPF-vK-DxGkIOpPPUGasBi5_SpkJa1eQeF9WNxvEDLyGId_5Z2Gf3eskS5tjDm6oxyljczVfQcKCQmpdTbNzhpUO2C-hGRoYCWaZXP11IlS8&udm=2&sa=X&ved=2ahUKEwiciJvUgfuNAxXuR_EDHQPFCRMQxKsJegQIERAB&ictx=0",
  //       uds: "AOm0WdE2fekQnsyfYEw8JPYozOKzdihfXF8cYFD-5kb2K9Cev1fBp_uFHZ6ZbEKxL-QKLPdoxWWfPF-vK-DxGkIOpPPUGasBi5_SpkJa1eQeF9WNxvEDLyGId_5Z2Gf3eskS5tjDm6oxyljczVfQcKCQmpdTbNzhpUO2C-hGRoYCWaZXP11IlS8",
  //       q: "martial arts i'm an evil god",
  //       serpapi_link:
  //         "https://serpapi.com/search.json?device=desktop&engine=google_images&gl=us&google_domain=google.com&hl=en&q=martial+arts+i%27m+an+evil+god&uds=AOm0WdE2fekQnsyfYEw8JPYozOKzdihfXF8cYFD-5kb2K9Cev1fBp_uFHZ6ZbEKxL-QKLPdoxWWfPF-vK-DxGkIOpPPUGasBi5_SpkJa1eQeF9WNxvEDLyGId_5Z2Gf3eskS5tjDm6oxyljczVfQcKCQmpdTbNzhpUO2C-hGRoYCWaZXP11IlS8",
  //     },
  //   ],
  //   images_results: [
  //     {
  //       position: 1,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb47a37446a2440902a3113f48d0b6d458f8e877757ed54beae.jpeg",
  //       related_content_id: "ZEY1Sl9JeFozUmh0NE1cIixcIjhmU253YjJkQ3ZyZ1VN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=ZEY1Sl9JeFozUmh0NE1cIixcIjhmU253YjJkQ3ZyZ1VN",
  //       source: "Reddit",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb47a37446a2440902a30f6e939a329ef45dd99ad32a390fe87.png",
  //       title:
  //         "where can i read this with good translation? (I'm an Evil god) : r/Manhua",
  //       link: "https://www.reddit.com/r/Manhua/comments/11mrxnf/where_can_i_read_this_with_good_translation_im_an/",
  //       original:
  //         "https://preview.redd.it/where-can-i-read-this-with-good-translation-im-an-evil-god-v0-602ov0m69rma1.jpg?auto=webp&s=5ab8b9f32ed7d4160bc071a18d154c3d36a6a875",
  //       original_width: 1600,
  //       original_height: 2264,
  //       is_product: false,
  //     },
  //     {
  //       position: 2,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f70bda5a616814001f11a83bcb8de704122.jpeg",
  //       related_content_id: "aWdFd3NBRHRqSnczd01cIixcIkxVVnZFcVpJMXpReUtN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=aWdFd3NBRHRqSnczd01cIixcIkxVVnZFcVpJMXpReUtN",
  //       source: "Reddit",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f70efb664c8a36ff2712762343361748546.png",
  //       title: "I'm an Evil God] A Highly Recommended Manhua : r/manhwa",
  //       link: "https://www.reddit.com/r/manhwa/comments/17kdldb/im_an_evil_god_a_highly_recommended_manhua/",
  //       original: "https://i.redd.it/x8tbrjas1hxb1.jpg",
  //       original_width: 1200,
  //       original_height: 1944,
  //       is_product: false,
  //     },
  //     {
  //       position: 3,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bc3dc281f100ef6640f950fa563e2cf54c.jpeg",
  //       related_content_id: "YXhDbVh5cUFGVnp6a01cIixcIi1tVEtXWGlySlROc3BN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=YXhDbVh5cUFGVnp6a01cIixcIi1tVEtXWGlySlROc3BN",
  //       source: "I'm An Evil God Wiki - Fandom",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bcd21238167890286fb299a1a9fb389b9d.png",
  //       title: "Xie Yan | I'm An Evil God Wiki | Fandom",
  //       link: "https://im-an-evil-god.fandom.com/wiki/Xie_Yan",
  //       original:
  //         "https://static.wikia.nocookie.net/i27m20an20evil20god/images/e/e4/Xie_Yan.jpg/revision/latest?cb=20200518214749",
  //       original_width: 450,
  //       original_height: 456,
  //       is_product: false,
  //     },
  //     {
  //       position: 4,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f85338e26d036ee23f54b2d7faab6a01336dc58a834f04d2.jpeg",
  //       related_content_id: "QjFVT3A1YUJwZVU3bE1cIixcIi1tVEtXWGlySlROc3BN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=QjFVT3A1YUJwZVU3bE1cIixcIi1tVEtXWGlySlROc3BN",
  //       source: "I'm An Evil God Wiki - Fandom",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f85338e26d036ee2401c7f3f76865de8ec2f5ead7afe48f3.png",
  //       title: "Xie Yan | I'm An Evil God Wiki | Fandom",
  //       link: "https://im-an-evil-god.fandom.com/wiki/Xie_Yan",
  //       original:
  //         "https://static.wikia.nocookie.net/i27m20an20evil20god/images/d/d2/Xie_Yan_%28as_Princess_Xilan_Wei%29.jpg/revision/latest?cb=20230221115935",
  //       original_width: 1632,
  //       original_height: 2472,
  //       is_product: false,
  //     },
  //     {
  //       position: 5,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4764f31ee66f870bf506397e120b9bb5b586a75f2944e96be.jpeg",
  //       related_content_id: "SXNlbU1haC1wYWlJSU1cIixcImNodnN0NVdmc2ZhN3hN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=SXNlbU1haC1wYWlJSU1cIixcImNodnN0NVdmc2ZhN3hN",
  //       source: "Reddit",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4764f31ee66f870bf2e5c1eb0e5481adfb3cb9bc29cbdc5dd.png",
  //       title: "I'm An Evil God",
  //       link: "https://www.reddit.com/r/IamAnEvilGod/",
  //       original:
  //         "https://preview.redd.it/side-story-v0-zcdc87lef46f1.jpg?width=571&format=pjpg&auto=webp&s=858b683e7ee99d0d569d9a847ad362a68931e1ea",
  //       original_width: 571,
  //       original_height: 800,
  //       is_product: false,
  //     },
  //     {
  //       position: 6,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb47b96d126c46a730c1e042ca82fd426090033fa9073d92f63.jpeg",
  //       related_content_id: "dzRnYklGS1Flbl94Uk1cIixcInAzVGU4UHFxZXNuNDVN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=dzRnYklGS1Flbl94Uk1cIixcInAzVGU4UHFxZXNuNDVN",
  //       source: "I'm An Evil God Wiki - Fandom",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb47b96d126c46a730c17cee872b1e435fce404ec464c7a9e77.png",
  //       title: "Yu Hongyan | I'm An Evil God Wiki | Fandom",
  //       link: "https://im-an-evil-god.fandom.com/wiki/Yu_Hongyan",
  //       original:
  //         "https://static.wikia.nocookie.net/i27m20an20evil20god/images/c/c9/Yu_Hongyan.jpg/revision/latest?cb=20200518215726",
  //       original_width: 518,
  //       original_height: 725,
  //       is_product: false,
  //     },
  //     {
  //       position: 7,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4311335701d5627b4b2e90a9201c638d7cd99c30a8985183e.jpeg",
  //       related_content_id: "Z3h4a0hMbm9Oa0JwcU1cIixcIlFXc3JtMTlkSVpFVlBN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=Z3h4a0hMbm9Oa0JwcU1cIixcIlFXc3JtMTlkSVpFVlBN",
  //       source: "YouTube",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4311335701d5627b46f62994235d24bc4b622a6c9fcba1d9a.png",
  //       title: "I’m An Evil God Chapter 496 English",
  //       link: "https://www.youtube.com/watch?v=XInvDmuJ42s",
  //       tag: "10:49",
  //       original:
  //         "https://i.ytimg.com/vi/XInvDmuJ42s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD91QeFSQAYdzTVFCTS_rBqbvyvww",
  //       original_width: 686,
  //       original_height: 386,
  //       is_product: false,
  //     },
  //     {
  //       position: 8,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb446540820b5b2954f15c687a62922f11347901b4882ff2f0f.jpeg",
  //       related_content_id: "Um5qODctNFhMQ3g1ck1cIixcIkNKc29MNmlybnZvWDVN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=Um5qODctNFhMQ3g1ck1cIixcIkNKc29MNmlybnZvWDVN",
  //       source: "I'm An Evil God Wiki - Fandom",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb446540820b5b2954fdfe3b37a1f42ff42887505ca11bbb174.png",
  //       title: "Meng Qinglian | I'm An Evil God Wiki | Fandom",
  //       link: "https://im-an-evil-god.fandom.com/wiki/Meng_Qinglian",
  //       original:
  //         "https://static.wikia.nocookie.net/i27m20an20evil20god/images/1/13/Meng_Qinglian.jpg/revision/latest?cb=20200518151956",
  //       original_width: 606,
  //       original_height: 735,
  //       is_product: false,
  //     },
  //     {
  //       position: 9,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f6710b73399bd106d0512d71a055057cc5125a39a6b46909.jpeg",
  //       related_content_id: "ZmxQSlBnaktQOGFCWU1cIixcInFBX0RFNXQyNnRjYnZN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=ZmxQSlBnaktQOGFCWU1cIixcInFBX0RFNXQyNnRjYnZN",
  //       source: "Reddit",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f6710b73399bd1065181c3a0a8189a1e20f172814e72ec3a.png",
  //       title:
  //         "Which one is better ] I'm An Evil God or I'm fated Villain : r/manhwa",
  //       link: "https://www.reddit.com/r/manhwa/comments/1gs5sxj/which_one_is_better_im_an_evil_god_or_im_fated/",
  //       original:
  //         "https://preview.redd.it/which-one-is-better-im-an-evil-god-or-im-fated-villain-v0-hnhmjf75k41e1.jpeg?width=640&crop=smart&auto=webp&s=d490d67656a1006c6fe4a0cd51f8cc3bc446748b",
  //       original_width: 640,
  //       original_height: 625,
  //       is_product: false,
  //     },
  //     {
  //       position: 10,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4019f09feac8de6248cdf196464fa8a240b7babfc20850252.jpeg",
  //       related_content_id: "a0VvMTVBa1g1OUpLYU1cIixcIjA5UzB2UmxJQ3A5MXZN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=a0VvMTVBa1g1OUpLYU1cIixcIjA5UzB2UmxJQ3A5MXZN",
  //       source: "MangaDex",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4019f09feac8de62451883ab61f4a746bb53961fe2baf02dc.png",
  //       title: "Way to Be the Evil Emperor - MangaDex",
  //       link: "https://mangadex.org/title/bf713abe-b415-45ac-8fd1-653dba578e0f/way-to-be-the-evil-emperor",
  //       original:
  //         "https://mangadex.org/covers/bf713abe-b415-45ac-8fd1-653dba578e0f/a1a6533b-4bb2-4311-a410-2b8406b90948.jpg",
  //       original_width: 1200,
  //       original_height: 1768,
  //       is_product: false,
  //     },
  //     {
  //       position: 11,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f70bd326e350d91f8f06b0636e496b20d5e.jpeg",
  //       related_content_id: "b0R0LVVMYXl1LVhTUE1cIixcInRNaXBwYzJsSVJ2dzBN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=b0R0LVVMYXl1LVhTUE1cIixcInRNaXBwYzJsSVJ2dzBN",
  //       source: "YouTube",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f703fab88c75b9044a545138dad516fa782.png",
  //       title: "I’m An Evil God Chapter 511 English",
  //       link: "https://www.youtube.com/watch?v=2jy7P2h0rxA",
  //       tag: "10:24",
  //       original: "https://i.ytimg.com/vi/2jy7P2h0rxA/maxresdefault.jpg",
  //       original_width: 1280,
  //       original_height: 720,
  //       is_product: false,
  //     },
  //     {
  //       position: 12,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f70d4ccdd4be948fc39ad7f13213b686601.jpeg",
  //       related_content_id: "MUVxQ1RHZVZkY1JGVk1cIixcInptcENUNDFXcS1XcmxN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=MUVxQ1RHZVZkY1JGVk1cIixcInptcENUNDFXcS1XcmxN",
  //       source: "Redbubble · In stock",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f701026d544668938d2bcf5bb3bdacf75df.png",
  //       title: "I'm An Evil God Poster",
  //       link: "https://www.redbubble.com/i/poster/I-m-An-Evil-God-by-JosephOrozco/61754056.LVTDI",
  //       original:
  //         "https://ih1.redbubble.net/image.1822587380.4056/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
  //       original_width: 750,
  //       original_height: 1000,
  //       in_stock: true,
  //       is_product: true,
  //     },
  //     {
  //       position: 13,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f70b71f9858132836f7e16de893f0c63183.jpeg",
  //       related_content_id: "bHRySEUyeEFNb2tPQU1cIixcIkN1WmdGWHBuOGREZ1JN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=bHRySEUyeEFNb2tPQU1cIixcIkN1WmdGWHBuOGREZ1JN",
  //       source: "I'm An Evil God Wiki - Fandom",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f703009086df7373fe20ab792b25276b17c.png",
  //       title: "Qin Xinci | I'm An Evil God Wiki | Fandom",
  //       link: "https://im-an-evil-god.fandom.com/wiki/Qin_Xinci",
  //       original:
  //         "https://static.wikia.nocookie.net/i27m20an20evil20god/images/a/a4/Qin_Xinci.png/revision/latest?cb=20210910104410",
  //       original_width: 1780,
  //       original_height: 2880,
  //       is_product: false,
  //     },
  //     {
  //       position: 14,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f70ad0fd64cf73ef5418b42252fac535210.jpeg",
  //       related_content_id: "OWpSZ3dfVFFYaTA5Q01cIixcInRNZlh2RmFXX3BfS2NN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=OWpSZ3dfVFFYaTA5Q01cIixcInRNZlh2RmFXX3BfS2NN",
  //       source: "LitRPG Podcast",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f7066eb1f71819967a07465072cd0ca8812.png",
  //       title: "I'm an Evil God — LitRPG Podcast",
  //       link: "http://litrpgpodcast.com/litrpg-database/2020/12/4/im-an-evil-god",
  //       original:
  //         "https://images.squarespace-cdn.com/content/v1/5502195ce4b0e841cb06e681/1607131415588-I546XMSPINJAUPAQ2RLX/20-1583501702.jpg",
  //       original_width: 225,
  //       original_height: 324,
  //       is_product: false,
  //     },
  //     {
  //       position: 15,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f706a13e6569bd411ffe3d76c5930523150.jpeg",
  //       related_content_id: "ekRuUUhrVTMwSFNJWk1cIixcIkc4bG9wcTBfR3FQRjhN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=ekRuUUhrVTMwSFNJWk1cIixcIkc4bG9wcTBfR3FQRjhN",
  //       source: "YouTube",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f70ef80d0bf4bb17c6582879cfbce0f5e6f.png",
  //       title:
  //         "Never Believes Yan Ruyu }I'm Añ Evil God Chapter 378[ Eng - Sub ] | By Filmywalah - YouTube",
  //       link: "https://www.youtube.com/watch?v=Dwl24qBn1H4",
  //       original: "https://i.ytimg.com/vi/Dwl24qBn1H4/maxresdefault.jpg",
  //       original_width: 1280,
  //       original_height: 720,
  //       is_product: false,
  //     },
  //     {
  //       position: 16,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f7015fcad48c74cb8fe7716d5402a93c7b8.jpeg",
  //       related_content_id: "QUpjNDBZd3hBQ1MxVU1cIixcIi1tVEtXWGlySlROc3BN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=QUpjNDBZd3hBQ1MxVU1cIixcIi1tVEtXWGlySlROc3BN",
  //       source: "I'm An Evil God Wiki - Fandom",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f70472cb42a6b158787336708ba0f442b61.png",
  //       title: "Xie Yan | I'm An Evil God Wiki | Fandom",
  //       link: "https://im-an-evil-god.fandom.com/wiki/Xie_Yan",
  //       original:
  //         "https://static.wikia.nocookie.net/i27m20an20evil20god/images/3/3d/Xie_Yan_2.jpg/revision/latest?cb=20200924101344",
  //       original_width: 1044,
  //       original_height: 1255,
  //       is_product: false,
  //     },
  //     {
  //       position: 17,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f7074eed3376eff15f7743af1ebf605b66d.jpeg",
  //       related_content_id: "MENBUkl0QTZORDhrQk1cIixcIjV3bWZDd0tpM3pHa2tN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=MENBUkl0QTZORDhrQk1cIixcIjV3bWZDd0tpM3pHa2tN",
  //       source: "I'm An Evil God Wiki - Fandom",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f7091b5b798ff2b6d56a76538f149c0ff08.png",
  //       title: "Yu Tingxue | I'm An Evil God Wiki | Fandom",
  //       link: "https://im-an-evil-god.fandom.com/wiki/Yu_Tingxue",
  //       original:
  //         "https://static.wikia.nocookie.net/i27m20an20evil20god/images/f/f4/Yu_Tingxue.jpg/revision/latest/thumbnail/width/360/height/360?cb=20240808161707",
  //       original_width: 217,
  //       original_height: 360,
  //       is_product: false,
  //     },
  //     {
  //       position: 18,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f70af03e70c3f260464538a6debef841eb3.jpeg",
  //       related_content_id: "VTl6SFVCRWlZNnJuQk1cIixcIi1Fck1QNFZPaVdFNVdN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=VTl6SFVCRWlZNnJuQk1cIixcIi1Fck1QNFZPaVdFNVdN",
  //       source: "YouTube",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f7018f5528c462cb1005a9af0227c5b6ab5.png",
  //       title: "I’m An Evil God Chapter 474 English",
  //       link: "https://www.youtube.com/watch?v=2-Kxro282n8",
  //       tag: "13:32",
  //       original:
  //         "https://i.ytimg.com/vi/2-Kxro282n8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC8t4AMVIXtQDF2hi0KG6liRB-F1g",
  //       original_width: 686,
  //       original_height: 386,
  //       is_product: false,
  //     },
  //     {
  //       position: 19,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f704bce9710d14cd9a0930d67094366abe1.jpeg",
  //       related_content_id: "eGx2WUNGYWtjZDA0S01cIixcImFhN0tfTUlrOEhTUUFN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=eGx2WUNGYWtjZDA0S01cIixcImFhN0tfTUlrOEhTUUFN",
  //       source: "Reddit",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f70c7f0ad6065c5b294c4920b42347d2207.png",
  //       title: "Ooof, I felt that. Sauce: I'm an evil god : r/Manhua",
  //       link: "https://www.reddit.com/r/Manhua/comments/zemks4/ooof_i_felt_that_sauce_im_an_evil_god/",
  //       original: "https://i.redd.it/upitp9wdad4a1.png",
  //       original_width: 1080,
  //       original_height: 1846,
  //       is_product: false,
  //     },
  //     {
  //       position: 20,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f70834dd2270783aed9bacf71baa5a354d6.jpeg",
  //       related_content_id: "Wlk5d0xFdnIzay1CQk1cIixcIk1JbldBaGZBa0l4Z3hN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=Wlk5d0xFdnIzay1CQk1cIixcIk1JbldBaGZBa0l4Z3hN",
  //       source: "I'm An Evil God Wiki - Fandom",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4e2071f01992b0f70614363dfd4633ef52a001491dbfbd7c1.png",
  //       title: "Ji Yuntao | I'm An Evil God Wiki | Fandom",
  //       link: "https://im-an-evil-god.fandom.com/wiki/Ji_Yuntao",
  //       original:
  //         "https://static.wikia.nocookie.net/i27m20an20evil20god/images/e/e7/Ji_Yuntao.jpg/revision/latest?cb=20200811003038",
  //       original_width: 810,
  //       original_height: 1150,
  //       is_product: false,
  //     },
  //     {
  //       position: 21,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bc55d078ecfabc29b9fcbb0ccc24471862.jpeg",
  //       related_content_id: "XzRQbGlCRGJYcVJWZE1cIixcIkVtYlVNVVpucnlvdUdN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=XzRQbGlCRGJYcVJWZE1cIixcIkVtYlVNVVpucnlvdUdN",
  //       source: "Goodreads",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bc8f71b10f2d463496920dd3dc97d996bb.png",
  //       title: "I'm An Evil God Vol 5 by Shidai man wang | Goodreads",
  //       link: "https://www.goodreads.com/book/show/61069230-i-m-an-evil-god-vol-5",
  //       original:
  //         "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1652201380i/61069230.jpg",
  //       original_width: 193,
  //       original_height: 278,
  //       is_product: false,
  //     },
  //     {
  //       position: 22,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bcce039243048da02bfa090b3a3c92a569.jpeg",
  //       related_content_id: "WGR4UHBER3ZNVmNUZ01cIixcIm9kTnBGWl9tV1lJUG9N",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=WGR4UHBER3ZNVmNUZ01cIixcIm9kTnBGWl9tV1lJUG9N",
  //       source: `xie yan - I'm An Evil God" Poster by EcchiKawaii | Redbubble · In stock`,
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bc885656cf97e2d6de673a36f51688ef3e.png",
  //       title: "xie yan - I’m An Evil God Poster",
  //       link: "https://www.redbubble.com/i/poster/xie-yan-I-m-An-Evil-God-by-EcchiKawaii/165498793.LVTDI",
  //       original:
  //         "https://ih1.redbubble.net/image.5673984821.8793/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
  //       original_width: 750,
  //       original_height: 1000,
  //       in_stock: true,
  //       is_product: true,
  //     },
  //     {
  //       position: 23,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bc0b99569a4bfb7f3d2775d2c446e60f00.jpeg",
  //       related_content_id: "Z3F2SUNkNWx3eWxXN01cIixcInQ0LW9BYWw1RUJTbjRN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=Z3F2SUNkNWx3eWxXN01cIixcInQ0LW9BYWw1RUJTbjRN",
  //       source: "YouTube",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bcec6d4ed031b290e485e2dae366e56b93.png",
  //       title: "I’m An Evil God Chapter 510 English",
  //       link: "https://www.youtube.com/watch?v=qfc4ZGkDtJE",
  //       tag: "9:27",
  //       original:
  //         "https://i.ytimg.com/vi/qfc4ZGkDtJE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCiL3bUcnVGoCmRRKTrvV3nW1iFNg",
  //       original_width: 686,
  //       original_height: 386,
  //       is_product: false,
  //     },
  //     {
  //       position: 24,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bc153ebd0cc8e17872f2a3f63a5c7f0148.jpeg",
  //       related_content_id: "THhFLXdjRThUSVdkYU1cIixcImJvVlg4WFltb2lUc2RN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=THhFLXdjRThUSVdkYU1cIixcImJvVlg4WFltb2lUc2RN",
  //       source: "TikTok",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bc84debd3599c9c44261734e0fc4c88e55.png",
  //       title: "I'm an Evil God Manhua | Cultivation Spoilers",
  //       link: "https://www.tiktok.com/@zenkun_17/video/7282000664496999686",
  //       tag: "0:29",
  //       original:
  //         "https://www.tiktok.com/api/img/?itemId=7282000664496999686&location=0&aid=1988",
  //       original_width: 1080,
  //       original_height: 1920,
  //       is_product: false,
  //     },
  //     {
  //       position: 25,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bccba1b618bd40fdbf7ece8f7dea466bc6.jpeg",
  //       related_content_id: "aHA4VjNJNjBCelVid01cIixcIjhtSjhscUF2QlEwcTFN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=aHA4VjNJNjBCelVid01cIixcIjhtSjhscUF2QlEwcTFN",
  //       source: `"xie yan - I'm An Evil God" Poster by EcchiKawaii | Redbubble · In stock`,
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bcfc5750921dc2984b104ba54c3397c297.png",
  //       title: "xie yan - I’m An Evil God Poster",
  //       link: "https://www.redbubble.com/i/poster/xie-yan-I-m-An-Evil-God-by-EcchiKawaii/165681985.LVTDI",
  //       original:
  //         "https://ih1.redbubble.net/image.5679754273.1985/fposter,small,wall_texture,product,750x1000.jpg",
  //       original_width: 750,
  //       original_height: 1000,
  //       in_stock: true,
  //       is_product: true,
  //     },
  //     {
  //       position: 26,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bcec26d107cd3ab74ffd00e2d2cfa5c722.jpeg",
  //       related_content_id: "WllkRFFmdm5XM21IV01cIixcIi1BU1p6VWU0ZTVwYzZN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=WllkRFFmdm5XM21IV01cIixcIi1BU1p6VWU0ZTVwYzZN",
  //       source: "Facebook",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bcbbcabac7edce192f12820ee8ddc1741b.png",
  //       title: "I'm an evil god Chapter 10",
  //       link: "https://www.facebook.com/102535008792922/posts/im-an-evil-god-chapter-10/103398065373283/",
  //       original:
  //         "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=103397878706635",
  //       original_width: 720,
  //       original_height: 1560,
  //       is_product: false,
  //     },
  //     {
  //       position: 27,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bc7b80be81d4eae55e3b90ee762b84fda3.jpeg",
  //       related_content_id: "ZldrMnFndTg4UmF3YU1cIixcInZGbFU1ZWE2RWNvZXpN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=ZldrMnFndTg4UmF3YU1cIixcInZGbFU1ZWE2RWNvZXpN",
  //       source: "TikTok",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bce9df7271b1220932f45ee468c34ec80b.png",
  //       title: "The Devil Returns to School Days",
  //       link: "https://www.tiktok.com/discover/i-am-evil-god",
  //       tag: "0:21",
  //       original:
  //         "https://www.tiktok.com/api/img/?itemId=7485836967410814216&location=0&aid=1988",
  //       original_width: 1080,
  //       original_height: 1440,
  //       is_product: false,
  //     },
  //     {
  //       position: 28,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bc0ed075590fe056ec7cbd47acd842e124.jpeg",
  //       related_content_id: "SHBkOFA0c01JaXJLak1cIixcIk1FS2xIWVRodUZhbzZN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=SHBkOFA0c01JaXJLak1cIixcIk1FS2xIWVRodUZhbzZN",
  //       source: "Reddit",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bc91f8c1d39e52f36f11bb56d8666dc64f.png",
  //       title:
  //         "I'm an Evil God...PEAK ACTION MANHUA!!! Any recommendation of manga/manhwa/manhua like this??crazy good action scenes!! : r/Manhua",
  //       link: "https://www.reddit.com/r/Manhua/comments/1bn5jn4/im_an_evil_godpeak_action_manhua_any/",
  //       original: "https://i.redd.it/kgleciaxveqc1.png",
  //       original_width: 3580,
  //       original_height: 2604,
  //       is_product: false,
  //     },
  //     {
  //       position: 29,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bc24621dad88dcbf4b5990e53909e39153.jpeg",
  //       related_content_id: "blpCbFRSRXhrWHA1bE1cIixcImhmWEJSbzNuOHFjNjhN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=blpCbFRSRXhrWHA1bE1cIixcImhmWEJSbzNuOHFjNjhN",
  //       source: "TikTok",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bc7cb981e0b64752699e4f5337d2afd903.png",
  //       title: "I'm An Evil God - Xie Yan's Dark Adventure",
  //       link: "https://www.tiktok.com/discover/im-an-evil-god-%E0%B8%A1%E0%B8%B1%E0%B8%87%E0%B8%87%E0%B8%B0",
  //       tag: "0:20",
  //       original:
  //         "https://www.tiktok.com/api/img/?itemId=7420482675363826949&location=0&aid=1988",
  //       original_width: 720,
  //       original_height: 1280,
  //       is_product: false,
  //     },
  //     {
  //       position: 30,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bcb76fea8c103de2224ca407c1f22e8520.jpeg",
  //       related_content_id: "V0xSVnJQdHdrMmhrQU1cIixcIlY3Z1lDOHdRbGlVVWhN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=V0xSVnJQdHdrMmhrQU1cIixcIlY3Z1lDOHdRbGlVVWhN",
  //       source: "YouTube",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4711c8810f7b700bcd3aba3bc61e15dd102ea2d073289043f.png",
  //       title: "I’m An Evil God Chapter 542 English",
  //       link: "https://www.youtube.com/watch?v=5aKFHNsobV0",
  //       tag: "8:37",
  //       original:
  //         "https://i.ytimg.com/vi/5aKFHNsobV0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDELdlcj3H2WSDPd22zWGYq1qKktw",
  //       original_width: 686,
  //       original_height: 386,
  //       is_product: false,
  //     },
  //     {
  //       position: 31,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f85338e26d036ee24a1e58346410a8e871859170671ec7be.jpeg",
  //       related_content_id: "ckxFOGRtdkVRU1c3Sk1cIixcInpIcGZTRmdWRFBiRzBN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=ckxFOGRtdkVRU1c3Sk1cIixcInpIcGZTRmdWRFBiRzBN",
  //       source: "Pinterest",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f85338e26d036ee230eba48fba9a3ad07242bbb54c148097.png",
  //       title: "I'm an Evil God",
  //       link: "https://www.pinterest.com/pin/im-an-evil-god--631981760237571840/",
  //       original:
  //         "https://i.pinimg.com/474x/be/dc/ca/bedcca7a85877c94f46405d8db5ceaea.jpg",
  //       original_width: 351,
  //       original_height: 1200,
  //       is_product: false,
  //     },
  //     {
  //       position: 32,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f85338e26d036ee266594f5831fc158f11a1ad03c20d4c52.jpeg",
  //       related_content_id: "cTZZUzZia0pnc1dEZ01cIixcIkxpdTJHMnRodzlneGlN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=cTZZUzZia0pnc1dEZ01cIixcIkxpdTJHMnRodzlneGlN",
  //       source: "I'm An Evil God Wiki - Fandom",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f85338e26d036ee24231b572892ca0facbf155efca4f19d4.png",
  //       title: "Xie Ran | I'm An Evil God Wiki | Fandom",
  //       link: "https://im-an-evil-god.fandom.com/wiki/Xie_Ran",
  //       original:
  //         "https://static.wikia.nocookie.net/i27m20an20evil20god/images/9/9a/Xie_Ran.jpg/revision/latest?cb=20210722164117",
  //       original_width: 2276,
  //       original_height: 2880,
  //       is_product: false,
  //     },
  //     {
  //       position: 33,
  //       thumbnail:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f85338e26d036ee2535686acf68046419d01a35668df30c5.jpeg",
  //       related_content_id: "WFY5MGlSbEFGQmdsak1cIixcIlhXbWNNN0s3c09MQ0FN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=WFY5MGlSbEFGQmdsak1cIixcIlhXbWNNN0s3c09MQ0FN",
  //       source: "Reddit",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f85338e26d036ee28c3c2fa7b7e61ca6e78b7bec58453494.png",
  //       title:
  //         "I'm an Evil God] I'm eager to see how will Xie Yan react when he returns back from simulation world and see Qin Xinci is alive : r/Manhua",
  //       link: "https://www.reddit.com/r/Manhua/comments/xqgkfv/im_an_evil_god_im_eager_to_see_how_will_xie_yan/",
  //       original:
  //         "https://preview.redd.it/y8zx9g1hhmq91.jpg?width=640&crop=smart&auto=webp&s=c7978f4c932ab3c4972fa32446cba21bd5d22539",
  //       original_width: 640,
  //       original_height: 935,
  //       is_product: false,
  //     },
  //     {
  //       position: 34,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv-4NVodIWOh6_JwS_BJUk6djEI3OlYYqsRA&s",
  //       related_content_id: "akNMY2U0Q3g3YXc4Uk1cIixcIjVMRlNkNHBTOTZuS1BN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=akNMY2U0Q3g3YXc4Uk1cIixcIjVMRlNkNHBTOTZuS1BN",
  //       source: "YouTube",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f85338e26d036ee229a65f309573cae803b5904ecac09246.png",
  //       title:
  //         "Compatible skills, new form }I'm Añ Evil God Chapter 392[ Eng - Sub ] | By Filmywalah - YouTube",
  //       link: "https://www.youtube.com/watch?v=7ghqjBmN_JU",
  //       original: "https://i.ytimg.com/vi/7ghqjBmN_JU/maxresdefault.jpg",
  //       original_width: 1280,
  //       original_height: 720,
  //       is_product: false,
  //     },
  //     {
  //       position: 35,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6dO5N8H_AEYsWCGIanT2cR6hoXP_TRe7K4w&s",
  //       related_content_id: "T2JHUEREdEoxaDlhNk1cIixcIm1VVG9NeW1zd2JDWWFN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=T2JHUEREdEoxaDlhNk1cIixcIm1VVG9NeW1zd2JDWWFN",
  //       source: "Pinterest",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f85338e26d036ee26e6b384d08385856d8ed751922fd4c11.png",
  //       title: "Xie Yan - Chapter 512 - I'm An Evil God",
  //       link: "https://www.pinterest.com/pin/xie-yan-chapter-512-im-an-evil-god-in-2025--430516045650405652/",
  //       original:
  //         "https://i.pinimg.com/736x/5d/2e/a0/5d2ea0bb0325964b40018a8c1c3233ae.jpg",
  //       original_width: 736,
  //       original_height: 1308,
  //       is_product: false,
  //     },
  //     {
  //       position: 36,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6aofoQwR27NGpyGH8mRY27VzRTDzUcjce9A&s",
  //       related_content_id: "eUk5LVlsc0o3anNDM01cIixcIl9jM3FpSi1SOFdGNHRN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=eUk5LVlsc0o3anNDM01cIixcIl9jM3FpSi1SOFdGNHRN",
  //       source: "TikTok",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f85338e26d036ee2d6124ba70ede836e63da66dfc37c8d27.png",
  //       title: "I'm An Evil God: A Must-Read Webtoon for Cultivation Fans",
  //       link: "https://www.tiktok.com/discover/manhwa-cultivation-recommendation-like-im-an-evil-god",
  //       tag: "0:30",
  //       original:
  //         "https://www.tiktok.com/api/img/?itemId=7487500372953779502&location=0&aid=1988",
  //       original_width: 1080,
  //       original_height: 1578,
  //       is_product: false,
  //     },
  //     {
  //       position: 37,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeBjjuDW-pj8gXcaYJ2xMKx_-mjQfHAKLRvA&s",
  //       related_content_id: "bUwxMzV1dk9aRzVoLU1cIixcIlhfVlA4T3g1ZUdHRkhN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=bUwxMzV1dk9aRzVoLU1cIixcIlhfVlA4T3g1ZUdHRkhN",
  //       source: "I'm An Evil God Wiki - Fandom",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f85338e26d036ee2f71d8ab0376ab1fe71136d6858f811e3.png",
  //       title: "Ge Yi | I'm An Evil God Wiki | Fandom",
  //       link: "https://im-an-evil-god.fandom.com/wiki/Ge_Yi",
  //       original:
  //         "https://static.wikia.nocookie.net/i27m20an20evil20god/images/a/a3/Ge_Yi.png/revision/latest?cb=20210725042710",
  //       original_width: 1996,
  //       original_height: 2661,
  //       is_product: false,
  //     },
  //     {
  //       position: 38,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyCI9p-yHhVUp6lyJvITw3jr4A2f4Fk01nMA&s",
  //       related_content_id: "Q0pic0NBX1RxTVJDaU1cIixcIlkxbnNlc1BXUjV3S2FN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=Q0pic0NBX1RxTVJDaU1cIixcIlkxbnNlc1BXUjV3S2FN",
  //       source: "Pinterest",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f85338e26d036ee28c0dbc91b984f5c68685b1591aaf0c12.png",
  //       title: "Xie Yan - Chapter 262 - I'm An Evil God",
  //       link: "https://mx.pinterest.com/pin/art-tutorials-drawing--728386939771532240/",
  //       original:
  //         "https://i.pinimg.com/736x/dc/80/0d/dc800d51debe863199657900971751f1.jpg",
  //       original_width: 736,
  //       original_height: 1308,
  //       is_product: false,
  //     },
  //     {
  //       position: 39,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNaCv5M8tXDbDraNvDOeH8JavtMPduII86hA&s",
  //       related_content_id: "RXdUWmE5SE5JbnM0Mk1cIixcIkFPVjJOM3V4TzlJM3NN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=RXdUWmE5SE5JbnM0Mk1cIixcIkFPVjJOM3V4TzlJM3NN",
  //       source: "manhuaus.com",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f85338e26d036ee286c31713e84def91dd20ba939b0c1be3.png",
  //       title: "I'm An Evil God – Manhuaus - Chapter 308 - MANHUAUS.COM",
  //       link: "https://manhuaus.com/manga/im-an-evil-god-1/chapter-308/",
  //       original:
  //         "https://img.manhuaus.com/im-an-evil-god-1/chapter-308/001.webp",
  //       original_width: 1100,
  //       original_height: 7202,
  //       is_product: false,
  //     },
  //     {
  //       position: 40,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPrCS5d948j4yE37geyTRWags-LMQi6moLw&s",
  //       related_content_id: "Y1JLaVJ2WThDVVl0TE1cIixcIjlpUjE2cGVkVGNaWWxN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=Y1JLaVJ2WThDVVl0TE1cIixcIjlpUjE2cGVkVGNaWWxN",
  //       source: "TikTok",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f85338e26d036ee2aa34e202e13614ec16ed49f404051186.png",
  //       title: "I Am An Evil God Manhwa Top 10 Strongest Character | TikTok",
  //       link: "https://www.tiktok.com/discover/i-am-an-evil-god-manhwa-top-10-strongest-character",
  //       original:
  //         "https://www.tiktok.com/api/img/?itemId=7035926702119193861&location=0&aid=1988",
  //       original_width: 720,
  //       original_height: 1280,
  //       is_product: false,
  //     },
  //     {
  //       position: 41,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRySuCGVQeLyE6Mcm_orkUFMUTWbcjgn3ZfAg&s",
  //       related_content_id: "WF9IVW1rcG5xcDFxa01cIixcIm9CTWVwQVlDQnltLW5N",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=WF9IVW1rcG5xcDFxa01cIixcIm9CTWVwQVlDQnltLW5N",
  //       source: "YouTube",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4764f31ee66f870bf8893f102fb6b52ae3b1bf70e7df87797.png",
  //       title: "I’m An Evil God Chapter 473 English",
  //       link: "https://www.youtube.com/watch?v=nYX83e7cR5Y",
  //       tag: "12:49",
  //       original:
  //         "https://i.ytimg.com/vi/nYX83e7cR5Y/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCDq7AkHRiWJjK-0vSBTMLuc7GBng",
  //       original_width: 686,
  //       original_height: 386,
  //       is_product: false,
  //     },
  //     {
  //       position: 42,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBIWiQ-R-Mybt9aOrCdoySpYMylCqYC1ixxg&s",
  //       related_content_id: "VnRRaDBUUHh6U21JM01cIixcIjI0Q2dBNGV2WXoyZUVN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=VnRRaDBUUHh6U21JM01cIixcIjI0Q2dBNGV2WXoyZUVN",
  //       source: "Manhuaplus",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4764f31ee66f870bfe063ffd101d1fa57c4224e2627802383.png",
  //       title:
  //         "Read I'm an Evil God Chapter 260 [Read new chapter at ManhuaPlus]",
  //       link: "https://manhuaplus.org/manga/i-m-an-evil-god/chapter-260",
  //       original:
  //         "https://cdn.manhuaplus.org/2024/06/10/10-18-50-8424395593608307.webp",
  //       original_width: 1600,
  //       original_height: 1978,
  //       is_product: false,
  //     },
  //     {
  //       position: 43,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkArqXPYg-5c61idieax2LppNrMOHjfZWTWw&s",
  //       related_content_id: "cU5obVo2X3RzN19UN01cIixcIl9nNk5vR0pwNHpqel9N",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=cU5obVo2X3RzN19UN01cIixcIl9nNk5vR0pwNHpqel9N",
  //       source: "ManhwaZ",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4764f31ee66f870bfc739cb87913153b80a3ce505674e62cd.png",
  //       title: "I'm An Evil God - ManhwaZ",
  //       link: "https://www.manhwaz.com/public/webtoon/im-an-evil-god",
  //       original:
  //         "https://www.manhwaz.com/public/storage/images/cover/67f789e7503b9m-an-evil-god.jpg",
  //       original_width: 900,
  //       original_height: 1266,
  //       is_product: false,
  //     },
  //     {
  //       position: 44,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ05UXJmq9-qf7N68oRdgBbL9C2rDwPzi8w2A&s",
  //       related_content_id: "TmJLcDVGMUhPUEg0NE1cIixcIlhEYkpad3huOGpWcUFN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=TmJLcDVGMUhPUEg0NE1cIixcIlhEYkpad3huOGpWcUFN",
  //       source: "I'm An Evil God Wiki - Fandom",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4764f31ee66f870bfd24a9563cb0ee819a8228afc04e0f9d8.png",
  //       title: "Ge Hong | I'm An Evil God Wiki | Fandom",
  //       link: "https://im-an-evil-god.fandom.com/wiki/Ge_Hong",
  //       original:
  //         "https://static.wikia.nocookie.net/i27m20an20evil20god/images/c/c7/Ge_Hong.jpg/revision/latest?cb=20210723072431",
  //       original_width: 1359,
  //       original_height: 2475,
  //       is_product: false,
  //     },
  //     {
  //       position: 45,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9CQ9V1gJ_FZHL_YO1sRxkBBfTQlgvE_NqpA&s",
  //       related_content_id: "N09LZEV4dzBoT0hvSk1cIixcIjVaMUFaOG1BVFQwZ1JN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=N09LZEV4dzBoT0hvSk1cIixcIjVaMUFaOG1BVFQwZ1JN",
  //       source: "Reddit",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4764f31ee66f870bfc96b33920bc5e89a6da4f95bc700145a.png",
  //       title: `If you aren't reading "I'm an Evil God", what are you doing with your life? : r/Manhua`,
  //       link: "https://www.reddit.com/r/Manhua/comments/174x8xd/if_you_arent_reading_im_an_evil_god_what_are_you/",
  //       original:
  //         "https://preview.redd.it/if-you-arent-reading-im-an-evil-god-what-are-you-doing-with-v0-tgiirh4y4gtb1.jpg?width=640&crop=smart&auto=webp&s=41bd5b164eab99a875d4f1221adabe5bfb585aeb",
  //       original_width: 640,
  //       original_height: 2163,
  //       is_product: false,
  //     },
  //     {
  //       position: 46,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj5Ct-f-ar2_FOjqzSVa2PB0OT8t2FgMgwzA&s",
  //       related_content_id: "RWxHYU4wblFWUXlWdU1cIixcIjhtSjhscUF2QlEwcTFN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=RWxHYU4wblFWUXlWdU1cIixcIjhtSjhscUF2QlEwcTFN",
  //       source: `"xie yan - I'm An Evil God" Poster by EcchiKawaii | Redbubble · In stock`,
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4764f31ee66f870bf794a533f456412ba6a7e1acabb09c3ea.png",
  //       title: "xie yan - I’m An Evil God Poster",
  //       link: "https://www.redbubble.com/i/poster/xie-yan-I-m-An-Evil-God-by-EcchiKawaii/165681985.LVTDI",
  //       original:
  //         "https://ih1.redbubble.net/image.5679754273.1985/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
  //       original_width: 750,
  //       original_height: 1000,
  //       in_stock: true,
  //       is_product: true,
  //     },
  //     {
  //       position: 47,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgFqNaBh2XrRCn5roa0Q_rFUqz9-IY14mzJQ&s",
  //       related_content_id: "SXpGbVVFaXFkejk3OU1cIixcIjA5UzB2UmxJQ3A5MXZN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=SXpGbVVFaXFkejk3OU1cIixcIjA5UzB2UmxJQ3A5MXZN",
  //       source: "MangaDex",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4764f31ee66f870bfbb68f4d2d9f1a61c4c8d7aea87c7bc2d.png",
  //       title: "Way to Be the Evil Emperor - MangaDex",
  //       link: "https://mangadex.org/title/bf713abe-b415-45ac-8fd1-653dba578e0f/way-to-be-the-evil-emperor",
  //       original:
  //         "https://og.mangadex.org/og-image/manga/bf713abe-b415-45ac-8fd1-653dba578e0f",
  //       original_width: 1200,
  //       original_height: 630,
  //       is_product: false,
  //     },
  //     {
  //       position: 48,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBUCK-O9qzP-E2KL5wPldoWXaLEazjq-N5tA&s",
  //       related_content_id: "YldGSmZvZ3VOT1NaMU1cIixcIndjZU03WWNPNjVBZ3RN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=YldGSmZvZ3VOT1NaMU1cIixcIndjZU03WWNPNjVBZ3RN",
  //       source: "YouTube",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4764f31ee66f870bf2cbceb762dc10676893d70590c6185fc.png",
  //       title: "I’m An Evil God Chapter 449 English",
  //       link: "https://www.youtube.com/watch?v=VQSnRtGANVY",
  //       tag: "8:21",
  //       original:
  //         "https://i.ytimg.com/vi/VQSnRtGANVY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDEMUJfWgdCQBXDxvhUjRA1_TxpXg",
  //       original_width: 686,
  //       original_height: 386,
  //       is_product: false,
  //     },
  //     {
  //       position: 49,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbBiRDMwRRqn-SBNKOp11QXx_3-MGOibIdGg&s",
  //       related_content_id: "NTJtX2V1MVRFbUttSU1cIixcImNpUWFXenFlcnZuOUdN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=NTJtX2V1MVRFbUttSU1cIixcImNpUWFXenFlcnZuOUdN",
  //       source: "I'm An Evil God Wiki - Fandom",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4764f31ee66f870bf10850a809dd45a5d856f4b3be4b7aaa2.png",
  //       title: "Gongsun Pianxian | I'm An Evil God Wiki | Fandom",
  //       link: "https://im-an-evil-god.fandom.com/wiki/Gongsun_Pianxian",
  //       original:
  //         "https://static.wikia.nocookie.net/i27m20an20evil20god/images/2/22/Gongsun_Pianxian.jpg/revision/latest?cb=20231228181206",
  //       original_width: 2796,
  //       original_height: 3388,
  //       is_product: false,
  //     },
  //     {
  //       position: 50,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ_XXzJWsK-nzQNHL3iFXaU0y1y1zjI6sOXw&s",
  //       related_content_id: "bGt1RzQ1UzhvTXNsM01cIixcInNVZm9nN0lJV3lLeDdN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=bGt1RzQ1UzhvTXNsM01cIixcInNVZm9nN0lJV3lLeDdN",
  //       source: "Scribble Hub",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4764f31ee66f870bf5695de0e232d3e4ba5aeda4274b6a356.png",
  //       title: "I'm the Evil God's Pawn | Scribble Hub",
  //       link: "https://www.scribblehub.com/series/368338/im-the-evil-gods-pawn/",
  //       original:
  //         "https://cdn.scribblehub.com/images/18/Im-the-Evil-Gods-Pawn_368338_1633865350.jpg",
  //       original_width: 250,
  //       original_height: 370,
  //       is_product: false,
  //     },
  //     {
  //       position: 51,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPZx8xR-DH1p0q-XmQVROuMEDAHHl17uI52A&s",
  //       related_content_id: "Vm5BVE9vU0tYWlNkVk1cIixcIlplWUdjZmFNVk9MQS1N",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=Vm5BVE9vU0tYWlNkVk1cIixcIlplWUdjZmFNVk9MQS1N",
  //       source: "manhuaus.com",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb47b96d126c46a730c5589307cd46fbda2f00ce3c6d5dec05b.png",
  //       title: "I'm An Evil God – Manhuaus - chapter 0 - MANHUAUS.COM",
  //       link: "https://manhuaus.com/manga/im-an-evil-god-1/chapter-0/",
  //       original: "https://img.manhuaus.com/im-an-evil-god-1/chapter-0/003.jpg",
  //       original_width: 800,
  //       original_height: 473,
  //       is_product: false,
  //     },
  //     {
  //       position: 52,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvms0XIMbw0PsOKoUmEY2y1bPsN8rOSZn2sQ&s",
  //       related_content_id: "V0dPY0ZHZExxMDhKY01cIixcIkR4elVuSHo3OTd0UndN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=V0dPY0ZHZExxMDhKY01cIixcIkR4elVuSHo3OTd0UndN",
  //       source: "I'm An Evil God Wiki - Fandom",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb47b96d126c46a730cd46be8be5d9e79de2d456426c26fd698.png",
  //       title: "Yuan Sheng | I'm An Evil God Wiki | Fandom",
  //       link: "https://im-an-evil-god.fandom.com/wiki/Yuan_Sheng",
  //       original:
  //         "https://static.wikia.nocookie.net/i27m20an20evil20god/images/2/2b/Yuan_Sheng.jpg/revision/latest?cb=20221212183934",
  //       original_width: 2416,
  //       original_height: 2880,
  //       is_product: false,
  //     },
  //     {
  //       position: 53,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQci9D6nE0zFELEocoubM_lPVhCpVlbOjcuLA&s",
  //       related_content_id: "RENiTlZ6RlFrTjVoX01cIixcIm9kTnBGWl9tV1lJUG9N",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=RENiTlZ6RlFrTjVoX01cIixcIm9kTnBGWl9tV1lJUG9N",
  //       source: `"xie yan - I'm An Evil God" Poster by EcchiKawaii | Redbubble · In stock`,
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb47b96d126c46a730c8383cec814a9dd3a07eeed68e5d88f99.png",
  //       title: "xie yan - I’m An Evil God Poster",
  //       link: "https://www.redbubble.com/i/poster/xie-yan-I-m-An-Evil-God-by-EcchiKawaii/165498793.LVTDI",
  //       original:
  //         "https://ih1.redbubble.net/image.5673984821.8793/fposter,small,wall_texture,product,750x1000.jpg",
  //       original_width: 750,
  //       original_height: 1000,
  //       in_stock: true,
  //       is_product: true,
  //     },
  //     {
  //       position: 54,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWAIUBgs2yDsTQpl0b15SqPbxr4vVKZX0yRA&s",
  //       related_content_id: "U3Z1bUVoRVVNWXpOY01cIixcIkdHX2ZNLXUyN3pQQzJN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=U3Z1bUVoRVVNWXpOY01cIixcIkdHX2ZNLXUyN3pQQzJN",
  //       source: "YouTube",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb47b96d126c46a730c390ffd022071d560414164ab4b3e2b58.png",
  //       title:
  //         "Unexpected Enemy, Unexpected Help }I'm Añ Evil God Chapter 388[ Eng - Sub ] | By Filmywalah - YouTube",
  //       link: "https://www.youtube.com/watch?v=6WaKAMFDZU0",
  //       original: "https://i.ytimg.com/vi/6WaKAMFDZU0/maxresdefault.jpg",
  //       original_width: 1280,
  //       original_height: 720,
  //       is_product: false,
  //     },
  //     {
  //       position: 55,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_8TfJvU3AlWiCf-VcTFIqw-fLqta1md0YUA&s",
  //       related_content_id: "VVJLbmNZMlZHdlpnQU1cIixcInRyVkJsUk56Rmh2elNN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=VVJLbmNZMlZHdlpnQU1cIixcInRyVkJsUk56Rmh2elNN",
  //       source: "TikTok",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb47b96d126c46a730c5ccba352a7b9ef01c143e5c3395e12a7.png",
  //       title: "The God of Evil: Lian Qiluo Story | TikTok",
  //       link: "https://www.tiktok.com/@roseferendancot/video/7339466003207752965",
  //       original:
  //         "https://www.tiktok.com/api/img/?itemId=7339466003207752965&location=0&aid=1988",
  //       original_width: 720,
  //       original_height: 1280,
  //       is_product: false,
  //     },
  //     {
  //       position: 56,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiA0f0pjRKfX4YEp2sOyHqbLh18-PQblF5oA&s",
  //       related_content_id: "aXBHa1BDaGQtel84ek1cIixcIlMyMzB6STE4SFhBdXJN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=aXBHa1BDaGQtel84ek1cIixcIlMyMzB6STE4SFhBdXJN",
  //       source: "I'm An Evil God Wiki - Fandom",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb47b96d126c46a730c56b9b098a3d38136fe9247f41e8e6908.png",
  //       title: "Bai Suyuan | I'm An Evil God Wiki | Fandom",
  //       link: "https://im-an-evil-god.fandom.com/wiki/Bai_Suyuan",
  //       original:
  //         "https://static.wikia.nocookie.net/i27m20an20evil20god/images/1/18/Bai_Suyuan.jpg/revision/latest?cb=20200518223012",
  //       original_width: 500,
  //       original_height: 740,
  //       is_product: false,
  //     },
  //     {
  //       position: 57,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9L6Z0art_4_F5VQRhaPZlKQ0M-EpZVMqHfQ&s",
  //       related_content_id: "N3owaWpFLXFhc0xwMk1cIixcIk9Xc3I4bjJHTmhCWURN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=N3owaWpFLXFhc0xwMk1cIixcIk9Xc3I4bjJHTmhCWURN",
  //       source: "manhuaus.com",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb47b96d126c46a730cecc439f45bc7a163c31e911567d997a7.png",
  //       title: "I'm An Evil God – Manhuaus - Chapter 283 - MANHUAUS.COM",
  //       link: "https://manhuaus.com/manga/im-an-evil-god-1/chapter-283/",
  //       original:
  //         "https://img.manhuaus.com/im-an-evil-god-1/chapter-283/001.webp",
  //       original_width: 1100,
  //       original_height: 9909,
  //       is_product: false,
  //     },
  //     {
  //       position: 58,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBJvcpfEqVLf9w3jTCPyLsARCdNMrURrmAQ&s",
  //       related_content_id: "NHZZTzlYQTdudzRDTk1cIixcIlpjLW5qUXFTeWRvQUNN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=NHZZTzlYQTdudzRDTk1cIixcIlpjLW5qUXFTeWRvQUNN",
  //       source: "YouTube",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb47b96d126c46a730c7243a288bd277b03c0b1f86e46fea40e.png",
  //       title: "I’m An Evil God Chapter 502 English",
  //       link: "https://www.youtube.com/watch?v=9mZ_af6k6nU",
  //       tag: "9:06",
  //       original:
  //         "https://i.ytimg.com/vi/9mZ_af6k6nU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAz6TFZfMsKNCHdQdAPWo__wFn2AA",
  //       original_width: 686,
  //       original_height: 386,
  //       is_product: false,
  //     },
  //     {
  //       position: 59,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp9elIFQ2pzmKW4k-rInKNLpymJ_WK1PvrnA&s",
  //       related_content_id: "TFd1NnNNZjFLLUY2ek1cIixcIjdLTGs4TXI4Qm5URjJN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=TFd1NnNNZjFLLUY2ek1cIixcIjdLTGs4TXI4Qm5URjJN",
  //       source: "Novelmic.com",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb47b96d126c46a730cdbaa3e46fe1360634a91ee3f857963f3.png",
  //       title:
  //         "Way To Be The Evil Emperor( I'm An Evil God) - Chapter 397 - Novelmic.com",
  //       link: "https://novelmic.com/comic/way-to-be-the-evil-emperor-im-an-evil-godway-to-be-the-evil-emperor-comics/chapter-397/",
  //       original:
  //         "https://novelmic.com/wp-content/uploads/WP-manga/data/manga_602e8ee86baac/1ab893697970d4e57b2e093ba1f83ed4/0001.jpg",
  //       original_width: 800,
  //       original_height: 1067,
  //       is_product: false,
  //     },
  //     {
  //       position: 60,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0qHjr3ESyyKi7NpT55K71oFonYqvFagTzAw&s",
  //       related_content_id: "dzhpd0E0OHppbnAzZ01cIixcIk1GcGxkQTdVTXJ0b1FN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=dzhpd0E0OHppbnAzZ01cIixcIk1GcGxkQTdVTXJ0b1FN",
  //       source: "TikTok",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb47b96d126c46a730cfc150ddfb607b319bbcd69c2597a7efd.png",
  //       title:
  //         "Evil God EVA(Shangguan Yao & Shangguan Yan) VS Heavenly Demon Chen Changan Sauce: I'm an evil god Invincible at the start #imanevilgod #invincibleatthestart #xieyan #chenchangan",
  //       link: "https://www.tiktok.com/@ice_god25/video/7267598521493359878",
  //       tag: "0:28",
  //       original:
  //         "https://www.tiktok.com/api/img/?itemId=7267598521493359878&location=0&aid=1988",
  //       original_width: 720,
  //       original_height: 1280,
  //       is_product: false,
  //     },
  //     {
  //       position: 61,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqkjQ3by5YSC_UIUZhDUE7E1lgkOkKI6HzGQ&s",
  //       related_content_id: "TDNyM2Z5Q21DR0R4d01cIixcIjBGNnY4X0xYTmhpNllN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=TDNyM2Z5Q21DR0R4d01cIixcIjBGNnY4X0xYTmhpNllN",
  //       source: `"xie yan - I'm An Evil God" Poster by EcchiKawaii | Redbubble · In stock`,
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4311335701d5627b45feb3a5e18fa529f671a6baab8295f21.png",
  //       title: "xie yan - I’m An Evil God Poster",
  //       link: "https://www.redbubble.com/i/poster/xie-yan-I-m-An-Evil-God-by-EcchiKawaii/165501396.LVTDI",
  //       original:
  //         "https://ih1.redbubble.net/image.5674065762.1396/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
  //       original_width: 750,
  //       original_height: 1000,
  //       in_stock: true,
  //       is_product: true,
  //     },
  //     {
  //       position: 62,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgISqOxfsKbWzTaTko5bXdq-L5DThztju2WQ&s",
  //       related_content_id: "UFZwSzdvZFRPeFhLOE1cIixcImtvRk1RY1pyaUpDUk9N",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=UFZwSzdvZFRPeFhLOE1cIixcImtvRk1RY1pyaUpDUk9N",
  //       source: "Reddit",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4311335701d5627b42a00e803034d88b67a66e60d46d27d89.png",
  //       title: "I'm an Evil God : r/Manhua",
  //       link: "https://www.reddit.com/r/Manhua/comments/1bytfor/im_an_evil_god/",
  //       original:
  //         "https://preview.redd.it/im-an-evil-god-v0-pzjx40kq38tc1.png?width=1080&crop=smart&auto=webp&s=ab66f2dd8d81362b2583b4c3326ad028895e483b",
  //       original_width: 1080,
  //       original_height: 2280,
  //       is_product: false,
  //     },
  //     {
  //       position: 63,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5MsT2Zg4iheEY3d4NEXf-ewlLRFuPA22fOQ&s",
  //       related_content_id: "c2ZxbURYWlZ0ZDdWZk1cIixcIkJVcThrYmpzOG9YeXNN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=c2ZxbURYWlZ0ZDdWZk1cIixcIkJVcThrYmpzOG9YeXNN",
  //       source: "YouTube",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4311335701d5627b4dbabce8c0962b327435b9a0648c55306.png",
  //       title: "I’m An Evil God Chapter 504 English",
  //       link: "https://www.youtube.com/watch?v=e-g0e-qT-3g",
  //       tag: "8:51",
  //       original:
  //         "https://i.ytimg.com/vi/e-g0e-qT-3g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAi0yEsUt-pxiJAT-SKXpowJsTCQQ",
  //       original_width: 686,
  //       original_height: 386,
  //       is_product: false,
  //     },
  //     {
  //       position: 64,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZakcuvuqeaqeGCDY7xa6zJ0Qh7sLD_YLiJg&s",
  //       related_content_id: "NG84b09vSTVhNEVpRE1cIixcIlNnN2NYYWJaeEpEMUdN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=NG84b09vSTVhNEVpRE1cIixcIlNnN2NYYWJaeEpEMUdN",
  //       source: "Kenmei",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4311335701d5627b4f748b1ba547acec3f3c1417b15f33d40.png",
  //       title: "I'm an Evil God | Kenmei",
  //       link: "https://www.kenmei.co/series/i-m-an-evil-god",
  //       original:
  //         "https://kenmei.b-cdn.net/covers/manga_series/21552/cover/jpeg-thumbnail-large-9545706f76f3dd200871f56f929176e6.jpeg",
  //       original_width: 565,
  //       original_height: 800,
  //       is_product: false,
  //     },
  //     {
  //       position: 65,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDa1pL8XiKanYRnswwjrUr4o8I4FmbFogtZA&s",
  //       related_content_id: "SVNPVjZsZ18yUDAxQ01cIixcInJUeHJocy11ZWFOeHRN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=SVNPVjZsZ18yUDAxQ01cIixcInJUeHJocy11ZWFOeHRN",
  //       source: "Novelmic.com",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4311335701d5627b477b23a5c3ce23b0797f367d64938e160.png",
  //       title:
  //         "Way To Be The Evil Emperor( I'm An Evil God) - Chapter 449 - Novelmic.com",
  //       link: "https://novelmic.com/comic/way-to-be-the-evil-emperor-im-an-evil-godway-to-be-the-evil-emperor-comics/chapter-449/",
  //       original:
  //         "https://novelmic.com/wp-content/uploads/WP-manga/data/manga_602e8ee86baac/4d34c87a3080420f7088a80f52cdbf51/0002.jpg",
  //       original_width: 800,
  //       original_height: 1067,
  //       is_product: false,
  //     },
  //     {
  //       position: 66,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3J5hiZA9eXgIMgBjfMwn-0pK0yuDdam_AYA&s",
  //       related_content_id: "ZWRBa2l0enE1a3htX01cIixcImFXa2x2c21XTWItMV9N",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=ZWRBa2l0enE1a3htX01cIixcImFXa2x2c21XTWItMV9N",
  //       source: "YouTube",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4311335701d5627b46d4051092892211484c9fe9b3ba680b4.png",
  //       title: "I’m An Evil God Chapter 554 English",
  //       link: "https://www.youtube.com/watch?v=OGcj5T0SJ0Y",
  //       tag: "8:03",
  //       original:
  //         "https://i.ytimg.com/vi/OGcj5T0SJ0Y/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDawWyE-tcDqoofVobCMfM-p_0ZPg",
  //       original_width: 686,
  //       original_height: 386,
  //       is_product: false,
  //     },
  //     {
  //       position: 67,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqJD2Wa7MugdEDWVyNMcuFE5ECqh3l5J9jKg&s",
  //       related_content_id: "TWFvQWFvRFREMUNfUU1cIixcIjk4dFJDd3ZrenlaakFN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=TWFvQWFvRFREMUNfUU1cIixcIjk4dFJDd3ZrenlaakFN",
  //       source: "Redbubble · In stock",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4311335701d5627b4cc8b059d27619e02caaf6c09674118de.png",
  //       title: "Yan Ruyu - I'm an evil god Poster",
  //       link: "https://www.redbubble.com/i/poster/Yan-Ruyu-I-m-an-evil-god-by-EcchiKawaii/166344303.LVTDI",
  //       original:
  //         "https://ih1.redbubble.net/image.5700113179.4303/fposter,small,wall_texture,product,750x1000.jpg",
  //       original_width: 750,
  //       original_height: 1000,
  //       in_stock: true,
  //       is_product: true,
  //     },
  //     {
  //       position: 68,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW2ZREGql4eqfmDz5LNwCnPm-iWYk4GrOILQ&s",
  //       related_content_id: "WEZwM2dQclVGSlBFbk1cIixcIkxVVnZFcVpJMXpReUtN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=WEZwM2dQclVGSlBFbk1cIixcIkxVVnZFcVpJMXpReUtN",
  //       source: "Reddit",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4311335701d5627b4033af5ce92ad9eba30d671d4cc9d3001.png",
  //       title: "I'm an Evil God] A Highly Recommended Manhua : r/manhwa",
  //       link: "https://www.reddit.com/r/manhwa/comments/17kdldb/im_an_evil_god_a_highly_recommended_manhua/",
  //       original: "https://i.redd.it/kbwv2b5aykxb1.jpeg",
  //       original_width: 800,
  //       original_height: 1558,
  //       is_product: false,
  //     },
  //     {
  //       position: 69,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW-E64axG1fcH8yzSz5s8Axku0jbFNcLeaJQ&s",
  //       related_content_id: "czRLRmR6S245WWJ3MU1cIixcIktXeklacV8td19hTUFN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=czRLRmR6S245WWJ3MU1cIixcIktXeklacV8td19hTUFN",
  //       source: "Amazon.com",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4311335701d5627b4590f58c79725352728ad36af87e0945f.png",
  //       title: `"Amazon.com: The Dirty Way to Destroy the Goddess's Heroes, Vol. 3 (light novel): I'm Not a Bad "Evil God," You Know. (Volume 3) (The Dirty Way to Destroy the Goddess's Heroes (light"`,
  //       link: "https://www.amazon.com/Dirty-Destroy-Goddesss-Heroes-light/dp/1975357159",
  //       original:
  //         "https://m.media-amazon.com/images/I/91ZjBnMiJOL._UF1000,1000_QL80_.jpg",
  //       original_width: 666,
  //       original_height: 1000,
  //       is_product: false,
  //     },
  //     {
  //       position: 70,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-EpMRwddh2auvQzsiA11H9AEF_2Nviz16gg&s",
  //       related_content_id: "WFdGelNKczlsRDBnS01cIixcIjFzME5aYmxCNlFHSzZN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=WFdGelNKczlsRDBnS01cIixcIjFzME5aYmxCNlFHSzZN",
  //       source: "manhuaus.com",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4311335701d5627b421c1891f83f304015105023dd57379dd.png",
  //       title: "I'm An Evil God – Manhuaus - Chapter 362 - MANHUAUS.COM",
  //       link: "https://manhuaus.com/manga/im-an-evil-god-1/chapter-362/",
  //       original:
  //         "https://img.manhuaus.com/image/manga_5f541cdcd646f/bb3a7465a16ebdf77c43f2a592d49464/01.webp",
  //       original_width: 700,
  //       original_height: 2167,
  //       is_product: false,
  //     },
  //     {
  //       position: 71,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfUcxQRmBRiuUk3Jh85zHz1UqkKQBYcTw-Jw&s",
  //       related_content_id: "RnZCWVpvRU1WNi1aTk1cIixcIk8ybGswSEpDdmx5U3BN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=RnZCWVpvRU1WNi1aTk1cIixcIk8ybGswSEpDdmx5U3BN",
  //       source: "YouTube",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb446540820b5b2954f93cc724d8aa62ff12cb6bb3599b2cc20.png",
  //       title: "I’m An Evil God Chapter 499 English",
  //       link: "https://www.youtube.com/watch?v=wH_9ZqSNtdo",
  //       tag: "9:25",
  //       original:
  //         "https://i.ytimg.com/vi/wH_9ZqSNtdo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCMm0AHQFZDCr5YZawlMrq6XpxGVg",
  //       original_width: 686,
  //       original_height: 386,
  //       is_product: false,
  //     },
  //     {
  //       position: 72,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTow3i1lBS6k5_8s_yiTFanLSQ8WER8NcTEAg&s",
  //       related_content_id: "LWIzZTJ3QVdOTUlTc01cIixcIjBGNnY4X0xYTmhpNllN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=LWIzZTJ3QVdOTUlTc01cIixcIjBGNnY4X0xYTmhpNllN",
  //       source: `"xie yan - I'm An Evil God" Poster by EcchiKawaii | Redbubble · In stock`,
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb446540820b5b2954f9b1b5c4f1cd7cf75aaa3a465d84622ad.png",
  //       title: "xie yan - I’m An Evil God Poster",
  //       link: "https://www.redbubble.com/i/poster/xie-yan-I-m-An-Evil-God-by-EcchiKawaii/165501396.LVTDI",
  //       original:
  //         "https://ih1.redbubble.net/image.5674065762.1396/fposter,small,wall_texture,product,750x1000.jpg",
  //       original_width: 750,
  //       original_height: 1000,
  //       in_stock: true,
  //       is_product: true,
  //     },
  //     {
  //       position: 73,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRDmTKgqwIsd6HZCZ8rp9A0NrfNa7cxYhG2g&s",
  //       related_content_id: "eW1lLVpvMkdnWUI1Qk1cIixcIkJ1X0dHVmhiUVlMWUxN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=eW1lLVpvMkdnWUI1Qk1cIixcIkJ1X0dHVmhiUVlMWUxN",
  //       source: "YouTube",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb446540820b5b2954f0b4d2eae6cd29094285f6a54eaa309fe.png",
  //       title: "I’m An Evil God Chapter 508 English",
  //       link: "https://www.youtube.com/watch?v=qAWslUTBEJA",
  //       tag: "10:14",
  //       original:
  //         "https://i.ytimg.com/vi/qAWslUTBEJA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC2RSc-SzJeTPOubGyFFLuMZICxuQ",
  //       original_width: 686,
  //       original_height: 386,
  //       is_product: false,
  //     },
  //     {
  //       position: 74,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNwjIjy66O_2n3_gCULbhlmVOWhmjH_sE6Xg&s",
  //       related_content_id: "ZWVzNVhUX0pUOGt4dE1cIixcIlFUVVpXQTZJNktDX1JN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=ZWVzNVhUX0pUOGt4dE1cIixcIlFUVVpXQTZJNktDX1JN",
  //       source: "Snow Machine Translations",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb446540820b5b2954f1b38923a1d3f7fff2786db39364f3d65.png",
  //       title: "I'm an Evil God - Chapter 534 | snowmtl",
  //       link: "https://www.snowmtl.ru/reader/i-m-an-evil-god/534",
  //       original: "https://snowmtl.ru/latest/i-m-an-evil-god/534/0.webp",
  //       original_width: 800,
  //       original_height: 2175,
  //       is_product: false,
  //     },
  //     {
  //       position: 75,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKlFHa72Dcj8MXuoVin1p5N9dM_tUj-iwMQ&s",
  //       related_content_id: "VjBVSTItTS1MWnVRT01cIixcIkxVVnZFcVpJMXpReUtN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=VjBVSTItTS1MWnVRT01cIixcIkxVVnZFcVpJMXpReUtN",
  //       source: "Reddit",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb446540820b5b2954f80790605d936149965a5bde56c0d309b.png",
  //       title: "I'm an Evil God] A Highly Recommended Manhua : r/manhwa",
  //       link: "https://www.reddit.com/r/manhwa/comments/17kdldb/im_an_evil_god_a_highly_recommended_manhua/",
  //       original: "https://i.redd.it/9ah2ockfnhxb1.jpeg",
  //       original_width: 720,
  //       original_height: 1368,
  //       is_product: false,
  //     },
  //     {
  //       position: 76,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCAeLRYSWv2F8nKHZQRAizw-sRqA2y9bgKig&s",
  //       related_content_id: "aHZRdDBhMkNmdHQ1Zk1cIixcIm1hbDl3bFZVWFRqdEJN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=aHZRdDBhMkNmdHQ1Zk1cIixcIm1hbDl3bFZVWFRqdEJN",
  //       source: "TikTok",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb446540820b5b2954f503e695a8d5afb53305e68e0593af06e.png",
  //       title: "Exploring the World of 'I'm an Evil God' Manhua",
  //       link: "https://www.tiktok.com/@nari_mylove/video/7333433306509364487",
  //       tag: "0:21",
  //       original:
  //         "https://www.tiktok.com/api/img/?itemId=7333433306509364487&location=0&aid=1988",
  //       original_width: 810,
  //       original_height: 1440,
  //       is_product: false,
  //     },
  //     {
  //       position: 77,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlPBWHcIVUwEpCpopx1C09IhOb3Azd9FG6cQ&s",
  //       related_content_id: "bXdNcmdVcHVnNE40Yk1cIixcIl81RlItNmpwOUJUemxN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=bXdNcmdVcHVnNE40Yk1cIixcIl81RlItNmpwOUJUemxN",
  //       source: "Novelmic.com",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb446540820b5b2954fd852bb80606fbe368888122c58c5e668.png",
  //       title:
  //         "Way To Be The Evil Emperor( I'm An Evil God) - Chapter 479 - Novelmic.com",
  //       link: "https://novelmic.com/comic/way-to-be-the-evil-emperor-im-an-evil-godway-to-be-the-evil-emperor-comics/chapter-479/",
  //       original:
  //         "https://novelmic.com/wp-content/uploads/WP-manga/data/manga_602e8ee86baac/a58af3a121f0e82ea37ea13e6690a32a/0001.jpg",
  //       original_width: 800,
  //       original_height: 1067,
  //       is_product: false,
  //     },
  //     {
  //       position: 78,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSih9mw1ZFiKAbKx5dEyfyUFPq6Qn4X4Zv_nQ&s",
  //       related_content_id: "RjZRSjlqY09hWnRCeE1cIixcImxPY3RzSFp3LUJZMk1N",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=RjZRSjlqY09hWnRCeE1cIixcImxPY3RzSFp3LUJZMk1N",
  //       source: "YouTube",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb446540820b5b2954f224609fd73217cb556ed4c971d69422a.png",
  //       title:
  //         "FULL 66H | I’m An Evil God | Chapter 1-514 | Review Manhua | Manhwa Recap | Best Manhwa | Manhwa Hot",
  //       link: "https://www.youtube.com/watch?v=lLUKp8fSzz8",
  //       tag: "65:40:11",
  //       original:
  //         "https://i.ytimg.com/vi/lLUKp8fSzz8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDt_rWm9CN6JYvEyioBkUq4yqzt2g",
  //       original_width: 686,
  //       original_height: 386,
  //       is_product: false,
  //     },
  //     {
  //       position: 79,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmQCXOmSXVfZAMc1lvUhWgJbqqB5ruE19NLg&s",
  //       related_content_id: "S1I0X3FjWE1IRVBPT01cIixcIjNHcjJwSHYxaDFMWGFN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=S1I0X3FjWE1IRVBPT01cIixcIjNHcjJwSHYxaDFMWGFN",
  //       source: "Snow Machine Translations",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb446540820b5b2954f0d1ebfd8156713c8e197a3bf5df4e9fe.png",
  //       title: "I'm an Evil God - Chapter 489 | snowmtl",
  //       link: "https://snowmtl.ru/reader/i-m-an-evil-god/489",
  //       original: "https://snowmtl.ru/latest/i-m-an-evil-god/489/0.webp",
  //       original_width: 800,
  //       original_height: 1275,
  //       is_product: false,
  //     },
  //     {
  //       position: 80,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr77U2O4-DzxiTXV7nKjhpopBEXyZ5KDdZmg&s",
  //       related_content_id: "Q0NybFlKSHNTTlUxY01cIixcImhra1hmWDl5MktRMzRN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=Q0NybFlKSHNTTlUxY01cIixcImhra1hmWDl5MktRMzRN",
  //       source: "Novelmic.com",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb446540820b5b2954fc231255d4229f66d4cfc8d3c5a2cd60d.png",
  //       title:
  //         "Way To Be The Evil Emperor( I'm An Evil God) - Chapter 510 - Novelmic.com",
  //       link: "https://novelmic.com/comic/way-to-be-the-evil-emperor-im-an-evil-godway-to-be-the-evil-emperor-comics/chapter-510/",
  //       original:
  //         "https://novelmic.com/wp-content/uploads/WP-manga/data/manga_602e8ee86baac/f9dece28e3753f2152c408d3c193c71a/0001.jpg",
  //       original_width: 801,
  //       original_height: 1358,
  //       is_product: false,
  //     },
  //     {
  //       position: 81,
  //       thumbnail:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWmBIyagZhj9D_ZWWnJh7uudhJhjpiW-z31w&s",
  //       related_content_id: "NHFfM3RpWFRXZlpvUE1cIixcIkFiZWdsZmIzSVBOMkpN",
  //       serpapi_related_content_link:
  //         "https://serpapi.com/search.json?engine=google_images_related_content&gl=us&hl=en&q=i%27m+an+evil+god&related_content_id=NHFfM3RpWFRXZlpvUE1cIixcIkFiZWdsZmIzSVBOMkpN",
  //       source: "I'm An Evil God Wiki - Fandom",
  //       source_logo:
  //         "https://serpapi.com/searches/6852b693eb2bd118e048e8bd/images/dbf83f4a9f3efeb4f6710b73399bd106ce6d986e9fdc7bdd3fab9e4299c384c2.png",
  //       title: "Cyany | I'm An Evil God Wiki | Fandom",
  //       link: "https://im-an-evil-god.fandom.com/wiki/Cyany",
  //       original:
  //         "https://static.wikia.nocookie.net/i27m20an20evil20god/images/7/79/Qing%27er.jpg/revision/latest?cb=20200824214524",
  //       original_width: 1096,
  //       original_height: 1404,
  //       is_product: false,
  //     },
  //   ],
  // };

  // const imagesBase64Array = await imagesUrlToBase64(
  //   dummyData["images_results"]
  // );

  // return imagesBase64Array.filter((image) => image !== null);
};
