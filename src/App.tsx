import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Fahrschule from './pages/Fahrschule'
import KursTemplate from './pages/KursTemplate'
import FahrstundenBuchen from './pages/FahrstundenBuchen'
import MietTemplate from './pages/MietTemplate'
import ShopTemplate from './pages/ShopTemplate'
import KontaktTemplate from './pages/KontaktTemplate'
import UeberUns from './pages/UeberUns'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Warenkorb from './pages/Warenkorb'
import Checkout from './pages/Checkout'
import DankeBuchung from './pages/DankeBuchung'
import DankeKontakt from './pages/DankeKontakt'
import Konto from './pages/Konto'
import Login from './pages/Login'
import CategoryStub from './pages/CategoryStub'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/fahrschule" element={<Fahrschule />} />
          <Route path="/fahrschule/motorrad" element={<KursTemplate />} />
          <Route path="/fahrschule/nothilfe" element={<KursTemplate />} />
          <Route path="/fahrschule/*" element={<KursTemplate />} />
          <Route path="/chauffeur" element={<CategoryStub title="Chauffeur" icon="🚛" color="#1a2a4a" />} />
          <Route path="/chauffeur/*" element={<KursTemplate />} />
          <Route path="/fahrlehrer" element={<CategoryStub title="Fahrlehrer" icon="👨‍🏫" color="#2a3a2a" />} />
          <Route path="/fahrlehrer/*" element={<KursTemplate />} />
          <Route path="/mieten" element={<CategoryStub title="Mieten / Reisen" icon="🏍️" color="#1a3a3a" />} />
          <Route path="/mieten/*" element={<MietTemplate />} />
          <Route path="/fahrstunden-buchen" element={<FahrstundenBuchen />} />
          <Route path="/shop" element={<ShopTemplate />} />
          <Route path="/kontakt" element={<KontaktTemplate />} />
          <Route path="/ueber-uns" element={<UeberUns />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/warenkorb" element={<Warenkorb />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/danke/buchung" element={<DankeBuchung />} />
          <Route path="/danke/kontakt" element={<DankeKontakt />} />
          <Route path="/konto" element={<Konto />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
