export default function TestPage() {
  return (
    <div className="min-h-screen bg-red-500 p-10">
      <h1 className="text-6xl font-bold text-white mb-4">
        If this is RED with big white text, Tailwind works!
      </h1>
      <div className="bg-blue-500 text-white p-6 rounded-xl shadow-2xl text-2xl">
        Blue rounded box with shadow
      </div>
    </div>
  );
}
