export default function EventTutorialPage() {
  const codeExample = `// Different types of event handling in React
function Button() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Button clicked!');
  };

  const handleHover = () => {
    console.log('Mouse hover!');
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleHover}
      onContextMenu={(e) => {
        e.preventDefault();
        console.log('Right click!');
      }}
    >
      Interactive Button
    </button>
  );
}`;

  return (
    <div
      className="mx-auto p-6 bg-gray-800 rounded-lg shadow-md text-gray-100"
      style={{ paddingBottom: "80px" }}
    >
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Event Handling</h2>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-200 mb-2">What?</h3>
        <p className="text-gray-300 mb-4">
          Event handling in React lets you{" "}
          <span className="font-semibold text-green-400">
            respond to user interactions
          </span>{" "}
          like clicks, hovers, and keyboard input. It's how you make your
          components interactive and responsive to user actions.
        </p>

        <h3 className="text-lg font-bold text-gray-200 mb-2">Why?</h3>
        <ul className="list-disc pl-5 text-gray-300 mb-4">
          <li className="mb-1">Create interactive user interfaces</li>
          <li className="mb-1">Handle user input and actions</li>
          <li>Control component behavior based on events</li>
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
          Play Event Whack-a-Mole to practice different types of event handling!
        </p>
        <div className="bg-gray-700 p-4 rounded-md">
          <ul className="list-disc pl-5 text-gray-300">
            <li className="mb-1">
              Different colored moles require different types of interactions
            </li>
            <li className="mb-1">
              Blue moles need a{" "}
              <span className="text-blue-300">single click</span>
            </li>
            <li className="mb-1">
              Green moles require a{" "}
              <span className="text-green-300">double click</span>
            </li>
            <li className="mb-1">
              Purple moles want a{" "}
              <span className="text-purple-300">right click</span>
            </li>
            <li className="mb-1">
              Yellow moles respond to{" "}
              <span className="text-yellow-300">hover</span>
            </li>
            <li>
              Red moles must be <span className="text-red-300">dragged</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
