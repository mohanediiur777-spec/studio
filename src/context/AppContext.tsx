import { createContext, useState, useEffect, useCallback } from 'react';

// Define types for the state
type User = {
  name: string;
  role: 'sales_rep' | 'manager';
};

type CompanyInfo = {
  salesRepName: string;
  companyName: string;
  companyWebsite: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
};

type IndustryInfo = {
  industry: string;
  generalChallenges: string[];
  specificChallenges: string;
};

type PricingInfo = {
    services: string[];
    totalCost: number;
    useZohoOne: boolean;
    savings: number;
}

type AppState = {
  isInitialized: boolean;
  user: User | null;
  companyInfo: CompanyInfo | null;
  industryInfo: IndustryInfo | null;
  selectedServices: string[] | null;
  pricing: PricingInfo | null;
};

// Define context type
type AppContextType = AppState & {
  setUser: (user: User | null) => void;
  setCompanyInfo: (info: CompanyInfo) => void;
  setIndustryInfo: (info: IndustryInfo) => void;
  setSelectedServices: (services: string[]) => void;
  setPricing: (pricing: PricingInfo) => void;
  resetApp: () => void;
};

const initialState: AppState = {
  isInitialized: false,
  user: null,
  companyInfo: null,
  industryInfo: null,
  selectedServices: null,
  pricing: null,
};

export const AppContext = createContext<AppContextType>({
  ...initialState,
  setUser: () => {},
  setCompanyInfo: () => {},
  setIndustryInfo: () => {},
  setSelectedServices: () => {},
  setPricing: () => {},
  resetApp: () => {},
});

const LOCAL_STORAGE_KEY = 'zohoSalesToolState';

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AppState>(initialState);

  useEffect(() => {
    try {
      const storedState = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedState) {
        setState({ ...JSON.parse(storedState), isInitialized: true });
      } else {
        setState(s => ({ ...s, isInitialized: true }));
      }
    } catch (error) {
      console.error('Failed to read from localStorage', error);
      setState(s => ({ ...s, isInitialized: true }));
    }
  }, []);

  useEffect(() => {
    if (state.isInitialized) {
        try {
            const stateToStore = { ...state, isInitialized: false };
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToStore));
        } catch (error) {
            console.error('Failed to write to localStorage', error);
        }
    }
  }, [state]);

  const setUser = (user: User | null) => setState(prev => ({ ...prev, user }));
  const setCompanyInfo = (info: CompanyInfo) => setState(prev => ({ ...prev, companyInfo: info, industryInfo: null, selectedServices: null, pricing: null }));
  const setIndustryInfo = (info: IndustryInfo) => setState(prev => ({ ...prev, industryInfo: info, selectedServices: null, pricing: null }));
  const setSelectedServices = (services: string[]) => setState(prev => ({ ...prev, selectedServices: services, pricing: null }));
  const setPricing = (pricing: PricingInfo) => setState(prev => ({ ...prev, pricing }));

  const resetApp = useCallback(() => {
    const user = state.user;
    const salesRepName = state.companyInfo?.salesRepName || user?.name || '';
    const resetState = { 
        ...initialState, 
        isInitialized: true,
        user,
        companyInfo: {
            salesRepName,
            companyName: '',
            companyWebsite: '',
            facebook: '',
            linkedin: '',
            twitter: '',
        }
    };
    setState(resetState);
    try {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({...resetState, isInitialized: false}));
    } catch (error) {
        console.error('Failed to reset localStorage', error);
    }
  }, [state.user, state.companyInfo]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setUser,
        setCompanyInfo,
        setIndustryInfo,
        setSelectedServices,
        setPricing,
        resetApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
