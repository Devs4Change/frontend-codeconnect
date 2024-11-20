import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard({ course }) {
  const videoUrl = course.content && course.content.match(/https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^/]+\/\S+|(?:v|e(?:mbed)?)\/|(?:v|e(?:mbed)?)\?v=)([a-zA-Z0-9_-]{11}))/)
    ? course.content.match(/https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^/]+\/\S+|(?:v|e(?:mbed)?)\/|(?:v|e(?:mbed)?)\?v=)([a-zA-Z0-9_-]{11}))/)[0]
    : null;

  const contentText = course.content
    ? course.content.replace(videoUrl, '').substring(0, 100)
    : 'No content available';

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition duration-200 w-full h-auto">
      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
      <p className="text-gray-500 dark:text-gray-400 mb-4">{contentText}...</p>

      {videoUrl && (
        <div className="relative w-full" style={{ paddingBottom: '56.25%', position: 'relative' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={videoUrl}
            title="Course Video"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <Link
        to={`/courses/${course._id}`}
        className="inline-block px-6 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
      >
        View Course
      </Link>
    </div>
  );
}

export default CourseCard;
