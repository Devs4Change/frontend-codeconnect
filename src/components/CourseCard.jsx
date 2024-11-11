import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard({ course }) {
  // Extract the video URL if it exists in the content (you may need to parse the content depending on its format)
  const videoUrl = course.content && course.content.match(/https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^/]+\/\S+|(?:v|e(?:mbed)?)\/|(?:v|e(?:mbed)?)\?v=)([a-zA-Z0-9_-]{11}))/)
    ? course.content.match(/https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^/]+\/\S+|(?:v|e(?:mbed)?)\/|(?:v|e(?:mbed)?)\?v=)([a-zA-Z0-9_-]{11}))/)[0] // Capture the YouTube video URL
    : null;

  // Extract a snippet from the course content, excluding the video
  const contentText = course.content ? course.content.replace(videoUrl, '').substring(0, 100) : 'No content available';

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition duration-200">
      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>

      {/* Display a snippet of the course content excluding the video */}
      <p className="text-gray-500 dark:text-gray-400 mb-4">{contentText}...</p>

      {/* Display the YouTube video preview if a video URL is found */}
      {videoUrl && (
        <div className="mb-4">
          <iframe
            width="100%"
            height="200"
            src={videoUrl}
            title="Course Video"
            style={{ border: 'none' }}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <Link
        to={`/courses/${course._id}`} // Link to the course details page
        className="inline-block px-6 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
      >
        View Course
      </Link>
    </div>
  );
}

export default CourseCard;
