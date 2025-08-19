import React from "react";

function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          React UI Assignment
        </h1>

        <p className="text-center text-gray-600 mb-4">
          This is where we will build and showcase the components for your
          assignment.
        </p>

        {/* Example placeholder for InputField */}
        <div className="mt-6">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            This is a helper text example.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
