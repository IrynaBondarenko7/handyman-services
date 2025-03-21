import * as contentful from "contentful";

export const client = contentful.createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  environment: "master",
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});
