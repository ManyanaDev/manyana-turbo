import { auth } from "../../auth";

export default async function Page(): Promise<JSX.Element> {
  const data = await auth();
  console.log("data :>> ", data);
  return (
    <main className="text-white max-w-7xl mx-auto">
      <div>
        <a
          href="http://localhost:3001"
          className="text-blue-500 hover:text-blue-700"
        >
          See docs
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
