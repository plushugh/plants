async function fetchApi(query, variables = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()

  return json;
}

async function getPlant(id: number) {
  const plant = await fetchApi(`
  query {
    plant(id:${id}) {
      id
      LatinName
      Name
      MainImage {
        url
      }
    }
  }
  `)
  return plant
}

export { getPlant };