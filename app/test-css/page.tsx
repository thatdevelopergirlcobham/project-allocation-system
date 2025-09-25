import '../basic-test.css';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">CSS Test</h1>

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-indigo-600 mb-2">Testing Basic CSS:</h2>
            <div className="test-css mb-2">
              This should have red background (basic CSS)
            </div>
            <button className="test-button mb-4">
              Basic CSS Button
            </button>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-green-600 mb-2">Testing TailwindCSS:</h2>
            <div className="bg-blue-500 text-white p-4 rounded-lg mb-2">
              This should have blue background (TailwindCSS)
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              TailwindCSS Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
