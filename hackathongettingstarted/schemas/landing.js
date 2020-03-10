export default {
  name: "landing",
  title: "Landing page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "teaser",
      title: "Teaser",
      type: "teaser"
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "teaser" }]
        }
      ]
    }
  ]
};
