import React from 'react';

import { Box, Link } from '@material-ui/core';

export default function Home({ plants }) {
  return (
    <>
      <Box>
        {plants.map((plant) => (
          <Link href={process.env.NEXT_PUBLIC_STRAPI_URL + plant.id}>
            {plant.Name}
          </Link>
        ))}
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/plants`);
  const plants = await res.json();

  return { props: { plants } };
}
