import React from 'react';

import { Box } from '@material-ui/core';

export default function Home({ plants }) {
  return (
    <>
      <Box
        height='100vh'
        width='100vw'
        display='flex'
        justifyItems='center'
        alignItems='center'
        bgcolor='fafafa'
      >
        <Box height='70vh' width='60vw' bgcolor='#fff'></Box>
      </Box>
      <Box>
        {plants.map((plant) => (
          <></>
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
