/***************************************************************
 * Video Component
 * - Define a functional component named Video
 * - Utilizes styled-components for styling
 * - Renders a responsive video container with an embedded YouTube video
 * - Includes a Title component for displaying the title "Informational Video"
 * - Embeds a YouTube video using an iframe with appropriate attributes
 ***************************************************************/
import React from 'react';
import styled from 'styled-components';
import Title from '../Title';

const VideoContainer = styled.div`
    width: 75%;
    height: 0;
    padding-bottom: 45%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    border: 35px solid #f1f1f1;
    border-radius: 15px;
`;

const ResponsiveIframe = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const Video = () => {
    return (
        <div>
            <Title text="Informational Video"/>
            <VideoContainer data-testid={'video'}>
                <ResponsiveIframe
                    src="https://www.youtube.com/embed/JqFqUCWsmLY?si=NejhOhEoYEvxcUEV"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            </VideoContainer>
        </div>
    );
};

export default Video;
