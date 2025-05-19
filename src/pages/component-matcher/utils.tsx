export const componentPairs = [
  {
    name: "Button",
    visual: (
      <button className="p-2 text-sm bg-blue-600 text-white rounded shadow font-bold">
        Primary Button
      </button>
    ),
    code: `<Button variant="secondary">Click</Button>`,
  },
  {
    name: "Avatar",
    visual: (
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Avatar"
        className="w-12 h-12 rounded-full border-2 border-gray-300"
      />
    ),
    code: `<Avatar src="user.png" alt="Profile" />`,
  },
  {
    name: "Card",
    visual: (
      <div className="p-3 bg-white rounded-xl shadow border text-gray-800 w-24 h-16 flex flex-col justify-center items-center">
        <span className="font-semibold text-sm">Card Title</span>
        <span className="text-xs text-gray-400">Card content</span>
      </div>
    ),
    code: `<Card title="..." content="..." />`,
  },
  {
    name: "Input",
    visual: (
      <input
        className="border px-2 py-1 rounded w-24 text-sm"
        placeholder="Type here"
        readOnly
      />
    ),
    code: `<Input placeholder="Type here" />`,
  },
];

export const shakeVariants = {
  shake: {
    x: [0, -10, 10, -10, 10, -10, 10, 0],
    transition: { duration: 0.6 },
  },
  still: { x: 0 },
};

export const pulseVariants = {
  pulse: {
    boxShadow: [
      "0 0 0 0 rgba(34,197,94, 0.7)",
      "0 0 0 4px rgba(34,197,94, 0.3)",
      "0 0 0 8px rgba(34,197,94, 0.15)",
      "0 0 0 12px rgba(34,197,94, 0)",
    ],
    transition: {
      duration: 0.8,
      repeat: 1,
    },
  },
  none: {
    boxShadow: "0 0 0 0 rgba(34,197,94,0)",
  },
};
