import NavBar from "@components/NavBar";
import Provider from "@components/Provider";
import "@styles/globals.css";

const RootLayout = ({ children }) => {
  const metadata = {
    title: "promptHub",
    descrption: "promptHub AI commands for every one",
  };

  return (
    <html>
      <body>
        <Provider>
          <div>
            <div className="gradient"></div>
          </div>

          <main className="app">
            <NavBar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
