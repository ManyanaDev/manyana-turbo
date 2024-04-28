export default function Page(): JSX.Element {
  return (
    <main className="text-white">
      <h1 className=" text-4xl">Docs</h1>
      <div>
        <a
          href="http://localhost:3000"
          className="text-blue-500 hover:text-blue-700"
        >
          See web
        </a>
      </div>
      <div>
        <a
          href="http://localhost:3002"
          className="text-blue-500 hover:text-blue-700"
        >
          Admin
        </a>
      </div>
    </main>
  );
}
