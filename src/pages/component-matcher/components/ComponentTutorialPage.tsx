export default function ComponentTutorialPage() {
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
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Components</h2>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-200 mb-2">What?</h3>
        <p className="text-gray-300 mb-4">
          Components are the{" "}
          <span className="font-semibold text-green-400">building blocks</span>{" "}
          of any React application. They let you split the UI into independent,
          reusable pieces, and think about each piece in isolation.
        </p>

        <h3 className="text-lg font-bold text-gray-200 mb-2">Why?</h3>
        <ul className="list-disc pl-5 text-gray-300 mb-4">
          <li className="mb-1">Encapsulate logic and UI for reusability</li>
          <li className="mb-1">Make complex UIs easier to manage and scale</li>
          <li>Enable code reuse and separation of concerns</li>
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
          Play the memory game to reinforce your understanding of React
          components as reusable building blocks!
        </p>
        <div className="bg-gray-700 p-4 rounded-md">
          <ul className="list-disc pl-5 text-gray-300">
            <li className="mb-1">
              Flip two cards at a time. Each card shows either a visual
              representation or a code snippet of a React component.
            </li>
            <li className="mb-1">
              Your goal is to find matching pairs that represent the{" "}
              <span className="text-green-300 font-mono">same component</span>{" "}
              (for example, a Button's code and its UI).
            </li>
            <li className="mb-1">
              If the two cards match, they'll highlight with a green border
              pulse to show reusability!
            </li>
            <li className="mb-1">
              If they do not match, both cards will shake and then flip back.
            </li>
            <li>
              Try to match all component pairs in as few moves as possible.
              Notice how components can look different but be the same building
              block!
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
