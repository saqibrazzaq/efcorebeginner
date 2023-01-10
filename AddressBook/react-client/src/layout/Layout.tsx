import { Box, ChakraProvider, Grid, theme, VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const Layout = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Grid p={3}>
          <VStack spacing={1}>
            <Header />
            <Box minH={"80vh"}>
              <Outlet />
            </Box>
            <Footer />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}

export default Layout