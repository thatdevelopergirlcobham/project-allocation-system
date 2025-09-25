export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">TailwindCSS Test</h1>

        {/* Test TailwindCSS classes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-primary-500 text-white p-6 rounded-xl shadow-soft animate-fade-in">
            <h2 className="text-xl font-semibold mb-3">Primary Colors</h2>
            <p className="text-primary-100 mb-4">This should be primary blue background with white text</p>
            <button className="btn btn-primary btn-sm">Primary Button</button>
          </div>

          <div className="bg-secondary-500 text-white p-6 rounded-xl shadow-soft animate-slide-in">
            <h2 className="text-xl font-semibold mb-3">Secondary Colors</h2>
            <p className="text-secondary-100 mb-4">Secondary gray background</p>
            <button className="btn btn-secondary btn-sm">Secondary Button</button>
          </div>

          <div className="bg-success-500 text-white p-6 rounded-xl shadow-soft animate-bounce-slow">
            <h2 className="text-xl font-semibold mb-3">Success Colors</h2>
            <p className="text-success-100 mb-4">Success green background</p>
            <button className="btn btn-ghost btn-sm text-white hover:bg-success-400">Success Button</button>
          </div>
        </div>

        {/* Test Form Elements */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Form Elements Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Input field with Tailwind styling"
                className="input"
              />
              <textarea
                placeholder="Textarea with Tailwind styling"
                className="textarea"
                rows={3}
              />
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-default">Default Badge</span>
                <span className="badge badge-secondary">Secondary</span>
                <span className="badge badge-destructive">Error</span>
                <span className="badge badge-outline">Outline</span>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-primary btn-sm">Small</button>
                <button className="btn btn-secondary btn-md">Medium</button>
                <button className="btn btn-ghost btn-lg">Large</button>
              </div>
            </div>
          </div>
        </div>

        {/* Test Animations */}
        <div className="card p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Animation Test</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="animate-fade-in p-4 bg-primary-100 rounded-lg">
              <p className="font-medium">Fade In</p>
            </div>
            <div className="animate-slide-in p-4 bg-secondary-100 rounded-lg">
              <p className="font-medium">Slide In</p>
            </div>
            <div className="animate-bounce-slow p-4 bg-success-100 rounded-lg">
              <p className="font-medium">Bounce</p>
            </div>
            <div className="animate-pulse-slow p-4 bg-warning-100 rounded-lg">
              <p className="font-medium">Pulse</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
