import NavBar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 flex">
      <NavBar />
      <div className="flex-1 flex flex-col" style={{ marginLeft: "4rem" }}>
        <header
          className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-gray-900 shadow z-40 flex items-center px-6 border-b border-blue-100 dark:border-gray-700"
          style={{ marginLeft: "4rem" }}
        >
          <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-200">
            My CRM Header
          </h1>
        </header>
        <main className="pt-20 px-8">{children}</main>
      </div>
    </div>
  );
}
