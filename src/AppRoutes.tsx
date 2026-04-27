import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './LandingPage'
import DocsApp from './DocsApp'
import PreviewApp from './PreviewApp'
import CreateMoleculeDocs from './components/docs/CreateMolecule.docs'
import PrototypeFlow from './components/docs/PrototypeFlow.docs'

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/docs/*" element={<DocsApp />} />
      <Route path="/preview/*" element={<PreviewApp />} />
      <Route path="/docs/create/molecule" element={<CreateMoleculeDocs />} />
      <Route path="/docs/create/prototype" element={<PrototypeFlow />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)

export default AppRoutes
