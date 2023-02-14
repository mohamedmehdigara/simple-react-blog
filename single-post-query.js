const gql_query = `{
    objects(bucket_slug: "${config.bucket.slug}") {
      type_slug
      slug
      title
      content
      metadata
      created_at
    }
  }`
  return await axios.post(`https://graphql.cosmicjs.com/v1`, { query: gql_query })
  .then(function (response) {
    return {
      cosmic: {
        posts: _.filter(response.data.data.objects, { type_slug: 'posts' }),
        global: _.keyBy(_.filter(response.data.data.objects, { type_slug: 'globals' }), 'slug'),
        post: _.find(response.data.data.objects, { slug: query.slug }),
      }
    }
  })
  .catch(function (error) {
    console.log(error)
  })
  