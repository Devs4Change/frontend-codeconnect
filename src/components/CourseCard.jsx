import React from "react";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  const getCourseType = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("html")) return "html";
    if (lowerTitle.includes("css")) return "css";
    if (lowerTitle.includes("javascript")) return "javascript";
    return null;
  };

  const courseType = getCourseType(course.title);

  const videoUrl =
    course.content &&
    course.content.match(
      /https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^/]+\/\S+|(?:v|e(?:mbed)?)\/|(?:v|e(?:mbed)?)\?v=)([a-zA-Z0-9_-]{11}))/
    )
      ? course.content.match(
          /https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^/]+\/\S+|(?:v|e(?:mbed)?)\/|(?:v|e(?:mbed)?)\?v=)([a-zA-Z0-9_-]{11}))/
        )[0]
      : null;

  const contentText = course.content.replace(/secure\/uploads\/\S+/g, '');

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition duration-200 w-full h-auto">
      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {course.description}
      </p>
      <p className="text-gray-500 dark:text-gray-400 mb-4">{contentText.substring(0, 100)}...</p>

      {videoUrl && (
        <div
          className="relative w-full"
          style={{ paddingBottom: "56.25%", position: "relative" }}
        >
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

      <div className="flex gap-3 mt-4">
        {courseType && (
          <Link
            to={`/modules/${courseType}`}
            className="inline-block px-6 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
          >
            View {courseType.toUpperCase()} Modules
          </Link>
        )}

        <Link
          to={`/courses/${course._id}`}
          className="inline-block px-6 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
        >
          View Course
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
