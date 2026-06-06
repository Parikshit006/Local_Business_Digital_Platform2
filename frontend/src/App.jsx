import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AssistantProvider } from "./components/assistant/AssistantProvider";
import UnnatiWidget from "./components/assistant/UnnatiWidget";

import VerifyEmail from "./pages/VerifyEmail";
import AdminDashboard from "./pages/AdminDashboard";
import BusinessSetupForm from "./pages/BusinessSetupForm";
import BusinessStatusPending from "./pages/BusinessStatusPending";
import LocalBoostHomepage from "./pages/LocalBoostHomepage";
import ServiceDetail from "./pages/ServiceDetail";
import SignInSignUp from "./pages/SignInSignUp";
import UserDashboard from "./pages/UserDashboard";
import ServiceForm from "./pages/ServiceForm";
import Services from "./pages/Services";
import SuccessStories from "./pages/SuccessStories";
import SuccessStoryDetail from "./pages/SuccessStoryDetail";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";

// Command Centre
import CommandCentreLayout from "./components/layout/CommandCentreLayout";
import Businesses from "./pages/commandcentre/Businesses";
import Testimonials from "./pages/commandcentre/Testimonials";
import TestimonialForm from "./pages/commandcentre/TestimonialForm";
import Settings from "./pages/commandcentre/Settings";
import Emailing from "./pages/commandcentre/Emailing";
import CreateTemplate from "./pages/commandcentre/CreateTemplate";

function App() {
  return (
    <BrowserRouter>
      <AssistantProvider>
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<LocalBoostHomepage />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/sign-in" element={<SignInSignUp />} />

          {/* BUSINESS */}
          <Route path="/business-setup" element={<BusinessSetupForm />} />
          <Route path="/business-status" element={<BusinessStatusPending />} />

          {/* USER */}
          <Route path="/user-dashboard" element={<UserDashboard />} />

          {/* SERVICE */}
          <Route path="/services" element={<Services />} />
          <Route path="/service/:id" element={<ServiceDetail />} />

          {/* SUCCESS STORIES */}
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/success-stories/:id" element={<SuccessStoryDetail />} />

          {/* MARKETING PAGES */}
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />

          {/* ADMIN */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/:tab" element={<AdminDashboard />} />
          <Route path="/admin/service/new" element={<ServiceForm />} />
          <Route path="/admin/service/edit/:id" element={<ServiceForm />} />

          {/* COMMAND CENTRE */}
          <Route path="/admin/commandcentre" element={<CommandCentreLayout />}>
            <Route index element={<Businesses />} />
            <Route path="businesses" element={<Businesses />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="testimonials/create" element={<TestimonialForm />} />
            <Route path="testimonials/edit/:id" element={<TestimonialForm />} />
            <Route path="emailing" element={<Emailing />} />
            <Route path="emailing/create-template" element={<CreateTemplate />} />
            <Route path="settings" element={<Settings />} />
          </Route>

        </Routes>
        <UnnatiWidget />
      </AssistantProvider>
    </BrowserRouter>
  );
}

export default App;