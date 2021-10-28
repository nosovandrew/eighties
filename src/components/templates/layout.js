import styled from 'styled-components';

import Nav from '@/components/organisms/nav';

// global container for all app
const Container = styled.div`
    padding: var(--basic-spacing);
    margin: 0 auto;
    width: 100%;
`;

export default function Layout({ children }) {
    return (
        <Container>
            <Nav />
            {/* each page/component inside <main> has own container with flex */}
            <main>{children}</main>
        </Container>
    );
}
