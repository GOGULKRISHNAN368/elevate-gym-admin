import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import MembersPage from "./pages/MembersPage";
import PlansPage from "./pages/PlansPage";
import EnquiriesPage from "./pages/EnquiriesPage";
import ExpensesPage from "./pages/ExpensesPage";
import OutletsPage from "./pages/OutletsPage";
import StaffsPage from "./pages/StaffsPage";
import FinancePage from "./pages/FinancePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/"          element={<DashboardPage />} />
            <Route path="/members"   element={<MembersPage />} />
            <Route path="/plans"     element={<PlansPage />} />
            <Route path="/expenses"  element={<ExpensesPage />} />
            <Route path="/outlets"   element={<OutletsPage />} />
            <Route path="/enquiries" element={<EnquiriesPage />} />
            <Route path="/staffs"    element={<StaffsPage />} />
            <Route path="/finance"   element={<FinancePage />} />
            <Route path="/settings"  element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
