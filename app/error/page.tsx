export default function ErrorPage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600">Authentication Failed</h1>
        <p className="mt-2 text-gray-700">
          Something went wrong during authentication. Please try again.
        </p>
        <a href="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
          Go Back Home
        </a>
      </div>
    );
  }
  