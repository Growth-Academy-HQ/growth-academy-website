// src/pages/CaseStudy.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import CaseStudyTemplate from '../components/case-studies/CaseStudyTemplate';
import { dropboxCaseStudy, airbnbCaseStudy, linkedinCaseStudy } from '../data/case-studies';

const CaseStudy = () => {
  const { id } = useParams();

  const caseStudies = {
    dropbox: dropboxCaseStudy,
    airbnb: airbnbCaseStudy,
    linkedin: linkedinCaseStudy,
  };

  const caseStudy = caseStudies[id];

  if (!caseStudy) {
    return <div>Case study not found</div>;
  }

  return <CaseStudyTemplate caseStudy={caseStudy} />;
};

export default CaseStudy;