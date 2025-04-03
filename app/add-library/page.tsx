import LibraryDetailsPage from '@/components/library/LibraryDetailsPage'
import ProtectedRoute from '@/context/ProtectedRouteContext'
import React from 'react'

function AddLibrary() {
  return (
    <ProtectedRoute requiredRole="librarian">
    <div className='container mx-auto px-4 mt-24'>
      <div className='container mx-auto max-w-4xl mt-10 text-center'>
      <h1 className='text-3xl font-bold mb-4'>Add Library</h1>
      </div>
      
        <LibraryDetailsPage />
    </div>
    </ProtectedRoute>
  )
}

export default AddLibrary