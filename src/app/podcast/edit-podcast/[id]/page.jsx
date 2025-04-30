"use client";

import React from 'react';

import EditPodcast from '@/components/AddPodcast/editPodcast/EditPodcast';


const page = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <EditPodcast id={id} />
    </div>
  );
};

export default page;