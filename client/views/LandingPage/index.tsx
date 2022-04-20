import { MaxWidthContainer } from '../../components'
import { Login } from '../../features'
import { Container } from './landingpage.styled'

export default function LandingPage() {
  return (
    <Container>
      <MaxWidthContainer>
        <Login />
      </MaxWidthContainer>
    </Container>
  )
}
