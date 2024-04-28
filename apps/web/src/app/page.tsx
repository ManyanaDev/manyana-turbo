import { testPkg } from "@repo/test-pkg";

export default async function Page(): Promise<JSX.Element> {
  const t = await testPkg("Jack");
  console.log(t);
  return (
    <main className="text-white">
      <h1 className=" text-4xl">Web</h1>
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
