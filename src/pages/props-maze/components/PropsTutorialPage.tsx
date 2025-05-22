export default function PropsTutorialPage() {
  const codeExample = `function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Bhanu" />
      <Welcome name="React Learner" />
    </div>
  );
}`;

  return (
    <div
      className="mx-auto p-6 bg-gray-800 rounded-lg shadow-md text-gray-100"
      style={{ paddingBottom: "80px" }}
    >
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Props</h2>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-200 mb-2">What?</h3>
        <p className="text-gray-300 mb-4">
          Props (short for properties) are{" "}
          <span className="font-semibold text-green-400">special inputs</span>{" "}
          that React components use to customize their behavior and appearance.
          Think of them as configuration options that make components flexible
          and reusable.
        </p>

        <h3 className="text-lg font-bold text-gray-200 mb-2">Why?</h3>
        <ul className="list-disc pl-5 text-gray-300 mb-4">
          <li className="mb-1">Pass data from parent to child components</li>
          <li className="mb-1">Make components dynamic and reusable</li>
          <li>Control component behavior and appearance</li>
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
          Navigate through the Prop Maze to master your understanding of React
          props!
        </p>
        <div className="bg-gray-700 p-4 rounded-md">
          <ul className="list-disc pl-5 text-gray-300">
            <li className="mb-1">
              Move through the maze using arrow keys (↑, ↓, ←, →).
            </li>
            <li className="mb-1">
              When you reach a{" "}
              <span className="text-red-300 font-mono">red gate</span>, you'll
              need to solve a props puzzle to proceed.
            </li>
            <li className="mb-1">
              Each gate presents a component that needs the{" "}
              <span className="text-green-300 font-mono">correct props</span> to
              be configured.
            </li>
            <li className="mb-1">
              Select the right prop values to make the component work and unlock
              the gate.
            </li>
            <li>
              Successfully solved gates turn{" "}
              <span className="text-green-300 font-mono">green</span>, showing
              your progress through the maze!
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
