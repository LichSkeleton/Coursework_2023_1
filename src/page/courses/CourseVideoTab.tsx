import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';

interface CourseVideo {
  id: number;
  name: string;
  resource_video_url: string;
}

interface CourseSingleProps {
  courseVideos: CourseVideo[];
}

const CourseVideoTab: React.FC<CourseSingleProps> = ({ courseVideos }) => {
  const [selectedVideo, setSelectedVideo] = useState<CourseVideo | null>(null);

  const openVideo = (video: CourseVideo) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const getVideoIdFromUrl = (url: string) => {
    // Extract the VIDEO_ID from the YouTube URL
    const match = /(?:\?v=|&v=|youtu\.be\/|\/embed\/)([^?&/]+)/.exec(url);
    return match && match[1];
  };

  return (
    <div>
      <Tab.Container id="video-tabs">
        <Nav variant="tabs">
          {courseVideos.map((courseVideo, index) => (
            <Nav.Item key={courseVideo.id}>
              <Nav.Link eventKey={index} onSelect={() => openVideo(courseVideo)}>
                {courseVideo.name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content>
          {courseVideos.map((courseVideo, index) => (
            <Tab.Pane key={courseVideo.id} eventKey={index}>
              <h3>{courseVideo.name}</h3>
              <div className="video-player">
                <iframe
                  width="100%"
                  height="600px"
                  src={`https://www.youtube.com/embed/${getVideoIdFromUrl(courseVideo.resource_video_url)}`}
                  title={courseVideo.name}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};
export default CourseVideoTab;
