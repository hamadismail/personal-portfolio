'use client';

import React from 'react';
import withAuth from '@/components/auth/withAuth';

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg">Welcome to your dashboard!</p>
    </div>
  );
};

export default withAuth(DashboardPage);
