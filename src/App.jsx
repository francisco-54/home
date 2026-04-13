import ExternalDeps  from "./components/shared/ExternalDeps.jsx";
import GlobalStyles  from "./components/shared/GlobalStyles.jsx";
import Navbar        from "./components/Navbar.jsx";
import Hero          from "./components/Hero.jsx";
import Stats         from "./components/Stats.jsx";
import WhyGCAB       from "./components/WhyGCAB.jsx";
import Insumos       from "./components/Insumos.jsx";
import Soluciones    from "./components/Soluciones.jsx";
import VideoShowreel from "./components/VideoShowreel.jsx";
import Proceso       from "./components/Proceso.jsx";
import Certificaciones from "./components/Certificaciones.jsx";
import Marcas        from "./components/Marcas.jsx";
import Contacto      from "./components/Contacto.jsx";
import Blog          from "./components/Blog.jsx";
import Footer        from "./components/Footer.jsx";
import Chat          from "./components/Chat.jsx";

export default function App() {
  return (
    <>
      <ExternalDeps />
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <WhyGCAB />
        <Insumos />
        <Soluciones />
        <VideoShowreel />
        <Proceso />
        <Certificaciones />
        <Marcas />
        <Contacto />
        <Blog />
      </main>
      <Footer />
      <Chat />
    </>
  );
}
