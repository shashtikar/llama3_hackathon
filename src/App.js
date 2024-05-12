import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import NavBar from './components/NavBar';
import { Grid, GridItem, Heading } from '@chakra-ui/react'
import Tips from './pages/Tips';
import Resources from './pages/Resources';

function App() {
  return (
    <Grid
    templateAreas={`"header"
                    "main"
                    "footer"`}
    gridTemplateRows={'50px 1fr 30px'}
    gridTemplateColumns={'1fr'}
    h='200px'
    gap='1'
    color='blackAlpha.700'
    fontWeight='bold'
  >
    <GridItem pl='2' bg='orange.300' area={'header'} textAlign={'center'}>
    <Heading as='h2' size='3xl' noOfLines={1}>Hound</Heading>
    </GridItem>
    <GridItem pl='2' bg={'green.300'} area={'main'}>
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
    </Router>
    <div style={{ height: 300 }}>
    </div>
    </GridItem>
    <GridItem pl='2' bg='blue.300' area={'footer'}>
      Hound 2024
    </GridItem>
  </Grid>
  );
}

export default App;
