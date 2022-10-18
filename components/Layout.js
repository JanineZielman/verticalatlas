import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({
  navigation,
  settings,
  children,
}) => {
  return (
    <div className="text-slate-700">
      <Header
        navigation={navigation}
        settings={settings}
      />
      <main id="top">{children}</main>
      <a href="#top" className="arrow-top"></a>
      <Footer settings={settings} />
    </div>
  );
};
