import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faFileUpload, faFileDownload, faHistory, faLock, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const Features = () => {
  // Array of Font Awesome icon names corresponding to each feature
  const iconArray = [faUserShield, faFileUpload, faFileDownload, faHistory, faLock, faShieldAlt];

  // Array of feature titles
  const featureTitles = [
    "User Authentication",
    "Document Upload",
    "Document Retrieval",
    "Version Tracking",
    "Access Permissions Management",
    "Security Measures"
  ];

  // Array of feature descriptions
  const featureDescriptions = [
    "Intuitive design with easy navigation to facilitate seamless interaction for users.",
    "Simple and secure process for uploading documents.",
    "Efficient search and retrieval functionality to quickly access specific documents.",
    "Automatic versioning and tracking of document changes.",
    "Granular control over access permissions for documents.",
    "Implementation of robust security protocols to protect documents."
  ];

  // State to track rotation for each div
  const [rotations, setRotations] = useState(Array(iconArray.length).fill(0));

  // Function to handle click event and update rotation for the clicked div
  const handleRotate = (idx) => {
    const newRotations = [...rotations];
    newRotations[idx] += 360;
    setRotations(newRotations);
  };

  return (
    <section className="py-14 bg-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-xl space-y-3">
          <p className="text-[#792938] text-3xl font-bold sm:text-4xl"> Features of our Solution </p>
          <p className='text-xl '> Our Solution have the following features some of them are listed here </p>
        </div>
        <div className="mt-12 p-3 rounded border-3-black">
          <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {iconArray.map((icon, idx) => (
              <li key={idx} className="space-y-3">
                <div className="w-16 h-16 border text-[#792938] rounded-lg flex items-center justify-center bg-gray-300 transition duration-300 ease-in-out   transform hover:scale-105" style={{ transform: rotate(${rotations[idx]}deg) }} onClick={() => handleRotate(idx)}>
                  <FontAwesomeIcon icon={icon} className="text-[#792938]" size="100px" />
                </div>
                <h1 className='font-bold text-2xl text-gray-800'> {featureTitles[idx]} </h1>
                <p className='text-xl text-gray-800'> {featureDescriptions[idx]} </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Features;
