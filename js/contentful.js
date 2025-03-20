import * as contentful from "contentful";

const client = contentful.createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  environment: "master",
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export function contentFulCMS() {
  client
    .getEntries({ content_type: "images", include: 2 })
    .then((response) => {
      getGalleryImagesURL(response);
    })
    .catch(console.error);
}

function getGalleryImagesURL(data) {
  data.includes.Asset.map((asset) =>
    console.log(`https:${asset.fields.file.url}`)
  );
}
