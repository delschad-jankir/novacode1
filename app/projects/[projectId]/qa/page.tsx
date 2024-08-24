// app/projects/[projectId]/general/page.tsx
import React from 'react';
import PageContainer from '@/components/layout/page-container';
import InputBar from '@/components/InputBar'; // Import the InputBar component

const GeneralInformationPage = () => {
  return (
    <PageContainer>
      <h1>General Information</h1>
      <InputBar /> {/* Include the InputBar component */}
    </PageContainer>
  );
};

export default GeneralInformationPage;
