export default function TutorialPage() {
  const codeExample = `const element = (
  <div>
    <h1>Hello</h1>
    <p>Welcome to React</p>
  </div>
);`;

  return (
    <div className="mx-auto p-6 bg-gray-800 rounded-lg shadow-md text-gray-100 overflow-scroll">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">JSX & Rendering</h2>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-200 mb-2">What?</h3>
        <p className="text-gray-300 mb-4">
          JSX stands for JavaScript XML. It's a syntax extension for JavaScript
          used in React to describe UI structures. Instead of writing
          React.createElement(), we write HTML-like code directly in JavaScript.
        </p>

        <h3 className="text-lg font-bold text-gray-200 mb-2">Why?</h3>
        <ul className="list-disc pl-5 text-gray-300 mb-4">
          <li className="mb-1">Cleaner, readable syntax</li>
          <li className="mb-1">Looks like HTML, but compiles to JavaScript</li>
          <li>Allows embedding expressions ({"{}"}) for dynamic rendering</li>
        </ul>

        <div className="bg-gray-700 p-4 rounded-md border border-gray-600 mb-6">
          <pre className="text-sm text-gray-200 font-mono overflow-x-auto">
            {codeExample}
          </pre>
        </div>
      </div>

      <div className="border-t border-gray-600 pt-4">
        <h3 className="text-lg font-bold text-gray-200 mb-2">
          What you have to do
        </h3>
        <p className="text-gray-300 mb-3">
          Rebuild the exact DOM tree using draggable JSX blocks
        </p>
        <div className="bg-gray-700 p-4 rounded-md">
          <ul className="list-disc pl-5 text-gray-300">
            <li className="mb-1">Drag blocks like h1, p, div etc</li>
            <li>
              Drop them inside each other to build the same nesting structure as
              the target
            </li>
            <li>
                Select the tag to act as parent, then drop the tag inside the parent
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
