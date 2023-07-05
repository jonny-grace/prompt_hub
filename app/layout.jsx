import NavBar from "@components/NavBar";
import "@styles/globals.css";

const RootLayout = ({ children }) => {
  const metadata = {
    title: "promptHub",
    descrption: "promptHub AI commands for every one",
  };

  return (
    <html>
      <body>
        <div>
          <div className="gradient"></div>
        </div>

        <main className="app">
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
