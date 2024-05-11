import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import NavBar from './components/NavBar';
import { Grid, GridItem } from '@chakra-ui/react'

function App() {
  return (
    <Grid
    templateAreas={`"header header"
                    "nav main"
                    "nav footer"`}
    gridTemplateRows={'50px 1fr 30px'}
    gridTemplateColumns={'150px 1fr'}
    h='200px'
    gap='1'
    color='blackAlpha.700'
    fontWeight='bold'
  >
    <GridItem pl='2' bg='orange.300' area={'header'}>
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>

        
      </div>
    </Router>
    </GridItem>
    <GridItem pl='2' bg='pink.300' area={'nav'}>
      Nav
    </GridItem>
    <GridItem pl='2' bg='green.300' area={'main'}>
      Main
    </GridItem>
    <GridItem pl='2' bg='blue.300' area={'footer'}>
      Footer
    </GridItem>
  </Grid>
  );
}

export default App;
