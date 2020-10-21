import Head from 'next/head'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Home() {
  return (
      <Container maxWidth="sm">
        <Head>
          <title>JSON Similarity Score</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            JSON Similarity Score
          </Typography>
        </Box>
      </Container>

  )
}
