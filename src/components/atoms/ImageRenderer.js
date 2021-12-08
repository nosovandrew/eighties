import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

// loading component (skeleton)
const Placeholder = styled.div`
    position: absolute; // place below image (get rid content jumping)
    width: inherit; // from parent ImageContainer
    height: inherit; // from parent ImageContainer
    background-color: #f1f1f1;
    border-radius: var(--basic-spacing);
`;

const ImageRenderer = ({ src, alt, ...props }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false); // loading state

    return (
        <>
            {!isImageLoaded && <Placeholder />}
            <Image
                className='main-image'
                onLoadingComplete={() => setIsImageLoaded(true)} // runs when next/image is loaded
                src={src}
                alt={alt}
                {...props} // next/image layout props
            />
        </>
    );
};

export default ImageRenderer;
