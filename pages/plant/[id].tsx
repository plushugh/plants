import {
  Box,
  Link,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core';
import React from 'react';

import ReactMarkdown from 'react-markdown';

const renderer = {
  text: (p) => <div style={{ display: 'inline' }} {...p} />,
  paragraph: (p) => <Typography component='p' variant='body1' {...p} />,
  h1: (p) => <Typography component='h1' variant='h1' {...p} />,
  h2: (p) => <Typography component='h2' variant='h2' {...p} />,
  h3: (p) => <Typography component='h3' variant='h3' {...p} />,
  h4: (p) => <Typography component='h4' variant='h4' {...p} />,
  h5: (p) => <Typography component='h5' variant='h5' {...p} />,
  h6: (p) => <Typography component='h6' variant='h6' {...p} />,
  a: (p) => <Link {...p} target='_blank' rel='noopener noreferrer'></Link>,
};

const Plant = ({ plant }) => {
  return (
    <>
      <div
        style={{
          height: '100vh',
          width: '100vw',
        }}
      >
        <Paper
          style={{
            maxWidth: 820,
            margin: '10vh auto',
            padding: '12px 24px',
          }}
        >
          <Box display='flex' width='100%'>
            <Box flexGrow={1}>
              <Typography variant='h2'>{plant.Name}</Typography>
              <code style={{ fontStyle: 'italic' }}>拉丁文名字: {plant.LatinName}</code>
              <TableContainer style={{padding: "0 32px 0 0px"}}>
                <Table>
                  <TableRow>
                    <TableCell>门</TableCell>
                    <TableCell>{plant.Phylum}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>纲</TableCell>
                    <TableCell>{plant.Class}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>目</TableCell>
                    <TableCell>{plant.Order}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>科</TableCell>
                    <TableCell>{plant.Family}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>属</TableCell>
                    <TableCell>{plant.Genus}</TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </Box>
             <img
              height='320px'
              src={
                plant.MainImage[0].formats.large ? plant.MainImage[0].formats.large.url : plant.MainImage[0].formats.medium ? plant.MainImage[0].formats.medium.url : plant.MainImage[0].formats.small ? plant.MainImage[0].formats.small.url : plant.MainImage[0].formats.thumbnail.url
              }
            ></img> 
          </Box>
          <Box padding='32px 8px 8px 8px'>
            <ReactMarkdown
              renderers={renderer}
              allowDangerousHtml
              children={plant.Body}
            />
          </Box>
        </Paper>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  // Fetch all the plants
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/plants`);
  const plants = await res.json();

  // Get the paths we want to pre-render based on plants
  const paths = plants.map((plant) => `/plant/${plant.id}`);

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // params contains the plants `id`.
  // If the route is like /plants/1, then params.id is 1
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/plants/${params.id}`
  );
  const plant = await res.json();
  // Pass plants data to the page via props

  return { props: { plant } };
}

export default Plant;
