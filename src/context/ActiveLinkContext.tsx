import { createContext, useState } from 'react';
import { ActiveLink } from '../types/ActiveLink';

type ActiveLinkContextValue = {
  activeLink: ActiveLink;
  setActiveLink: (link: ActiveLink) => void;
};

export const ActiveLinkContext = createContext<ActiveLinkContextValue>({
  activeLink: ActiveLink.All,
  setActiveLink: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ActiveLinkProvider = ({ children }: Props) => {
  const [activeLink, setActiveLink] = useState<ActiveLink>(ActiveLink.All);

  return (
    <ActiveLinkContext.Provider value={{ activeLink, setActiveLink }}>
      {children}
    </ActiveLinkContext.Provider>
  );
};
