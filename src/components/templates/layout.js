import styled from 'styled-components';

import Nav from '@/components/organisms/nav';
import { media } from '@/styles/media';

// global container for all app
const Container = styled.div`
    padding: var(--basic-spacing);
    margin: 0 auto;
    width: 100%;
`;

const StyledMain = styled.div`
    margin-top: 64px; // get rid header on mobile

    @media ${media.md} {
        margin: 0;
    }
`;

export default function Layout({ children }) {
    return (
        <Container>
            <Nav />
            {/* each page/component inside <main> has own container with flex */}
            <StyledMain>{children}</StyledMain>
        </Container>
    );
}
