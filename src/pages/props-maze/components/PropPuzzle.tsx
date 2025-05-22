import { useState } from "react";
import { motion } from "framer-motion";
import type { PropPuzzleProps } from "../types";

export type ComponentType = "Button" | "Card" | "Input" | "Alert" | "Badge";

export type PreviewComponentProps = {
  Button: { variant?: string; disabled?: boolean };
  Card: { elevation?: number; rounded?: boolean };
  Input: { type?: string; required?: boolean; autoFocus?: boolean };
  Alert: { type?: string; dismissible?: boolean };
  Badge: { color?: string; size?: string; pill?: boolean };
};

const PreviewComponents: {
  [K in ComponentType]: React.FC<
    PreviewComponentProps[K] & { [key: string]: any }
  >;
} = {
  Button: ({ variant = "default", disabled = false, ...props }) => (
    <button
      className={`px-4 py-2 rounded ${
        variant === "primary"
          ? "bg-blue-500 text-white"
          : variant === "secondary"
          ? "bg-gray-500 text-white"
          : "bg-gray-200 text-gray-700"
      }`}
      disabled={disabled}
      {...props}
    >
      Preview Button
    </button>
  ),
  Card: ({ elevation = 0, rounded = false, ...props }) => (
    <div
      className={`p-4 bg-white ${rounded ? "rounded-lg" : ""}`}
      style={{
        boxShadow: `0 ${elevation * 2}px ${elevation * 4}px rgba(0,0,0,0.1)`,
      }}
      {...props}
    >
      Preview Card Content
    </div>
  ),
  Input: ({ type = "text", required = false, autoFocus = false, ...props }) => (
    <input
      type={type}
      required={required}
      autoFocus={autoFocus}
      className="px-3 py-2 border rounded"
      placeholder="Preview Input"
      {...props}
    />
  ),
  Alert: ({ type = "info", dismissible = false, ...props }) => (
    <div
      className={`p-4 rounded ${
        type === "warning"
          ? "bg-yellow-100 text-yellow-800"
          : type === "error"
          ? "bg-red-100 text-red-800"
          : type === "success"
          ? "bg-green-100 text-green-800"
          : "bg-blue-100 text-blue-800"
      }`}
      {...props}
    >
      {dismissible && <button className="float-right">&times;</button>}
      Preview Alert
    </div>
  ),
  Badge: ({ color = "blue", size = "medium", pill = false, ...props }) => (
    <span
      className={`inline-block ${
        color === "blue"
          ? "bg-blue-500"
          : color === "red"
          ? "bg-red-500"
          : color === "purple"
          ? "bg-purple-500"
          : "bg-green-500"
      } text-white ${
        size === "small"
          ? "px-2 py-0.5 text-xs"
          : size === "large"
          ? "px-4 py-2 text-base"
          : "px-3 py-1 text-sm"
      } ${pill ? "rounded-full" : "rounded"}`}
      {...props}
    >
      Preview Badge
    </span>
  ),
};

const PropPuzzle: React.FC<PropPuzzleProps> = ({ gate, onSolve, onClose }) => {
  const [selectedProps, setSelectedProps] = useState<Record<string, any>>({});
  const PreviewComponent =
    PreviewComponents[gate.puzzle.component as ComponentType];
  const [showAlert, setShowAlert] = useState(false);

  const checkSolution = () => {
    const isCorrect = Object.entries(gate.puzzle.correctProps).every(
      ([key, value]) => selectedProps[key] === value
    );
    if (isCorrect) {
      onSolve(gate.id);
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000); // Hide after 2 seconds
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50"
    >
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          role="alert"
        >
          <span className="font-medium">Try again!</span>
          <span className="block sm:inline"> The props are not correct.</span>
        </motion.div>
      )}
      <div className="bg-gray-700 p-6 rounded-lg shadow-xl w-[500px]">
        <h2 className="text-2xl font-bold mb-4">Solve the Props Puzzle</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Your Component */}
          <div className="p-4 bg-white rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Your Component:
            </h3>
            <div className="flex justify-center items-center min-h-[100px] border-2 border-dashed border-gray-200 rounded">
              <PreviewComponent {...selectedProps} />
            </div>
            <div className="mt-2">
              <code className="block text-black text-xs bg-gray-100 p-2 rounded">
                {`<${gate.puzzle.component}`}
                {Object.entries(selectedProps).map(([key, value]) => (
                  <span key={key} className="block ml-4">
                    {key}={JSON.stringify(value)}
                  </span>
                ))}
                {`/>`}
              </code>
            </div>
          </div>

          {/* Target Component */}
          <div className="p-4 bg-white rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Target Output:
            </h3>
            <div className="flex justify-center items-center min-h-[100px] border-2 border-dashed border-gray-200 rounded">
              <PreviewComponent {...gate.puzzle.correctProps} />
            </div>
            <div className="mt-2">
              <code className="block text-black text-xs bg-gray-100 p-2 rounded">
                {`<${gate.puzzle.component}`}
                {Object.entries(gate.puzzle.correctProps).map(
                  ([key, value]) => (
                    <span key={key} className="block ml-4">
                      {key}={"*".repeat(String(value).length)}
                    </span>
                  )
                )}
                {`/>`}
              </code>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {gate.puzzle.options.map((option) => (
            <div key={option.property} className="flex flex-col">
              <label className="font-medium mb-2">{option.property}:</label>
              <div className="flex gap-2 text-black">
                {option.values.map((value) => (
                  <button
                    key={String(value)}
                    onClick={() =>
                      setSelectedProps((prev) => ({
                        ...prev,
                        [option.property]: value,
                      }))
                    }
                    className={`px-3 py-2 rounded ${
                      selectedProps[option.property] === value
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {String(value)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={checkSolution}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Check Solution
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropPuzzle;
