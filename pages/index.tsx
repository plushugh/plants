import React from 'react';

import Link from "next/link"

import { Button, Paper } from '@material-ui/core';

export default function Home({ plants }) {
  return (
    <>
      <Paper style={{margin:"64px auto", maxWidth: 720,width: "100%"}}>
        {plants.map((plant) => (
          <>
            <Link href={process.env.NEXT_PUBLIC_SITE_URL + "/plant/" + plant.id} key={plant.id}>
              <Button fullWidth variant="text" color="primary">{plant.Name}</Button>
            </Link>
            <br />
          </>
        ))}
      </Paper>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/plants`);
  const plants = await res.json();

  return { props: { plants } };
}
