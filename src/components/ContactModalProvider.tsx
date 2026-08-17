import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { CONTACT_MAILTO, CONTACT_TELEGRAM_URL } from '../content/contacts';
import { contactButtonClassName, contactButtonStyle } from './contactButtonStyles';

type ContactModalContextValue = {
  openContactModal: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error('useContactModal must be used within ContactModalProvider');
  }
  return context;
}

type ContactModalProviderProps = {
  children: ReactNode;
};

export default function ContactModalProvider({ children }: ContactModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openContactModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeContactModal();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeContactModal]);

  const contextValue = useMemo(
    () => ({
      openContactModal,
    }),
    [openContactModal],
  );

  return (
    <ContactModalContext.Provider value={contextValue}>
      {children}
      {typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  role="presentation"
                >
                  <motion.button
                    type="button"
                    aria-label="Закрыть окно контактов"
                    className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeContactModal}
                  />

                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="contact-modal-title"
                    className="relative z-10 w-full max-w-[min(92vw,420px)] rounded-[28px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:rounded-[32px] sm:p-8"
                    initial={{ opacity: 0, scale: 0.94, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 8 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      type="button"
                      aria-label="Закрыть"
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#D7E2EA]/30 bg-[#0C0C0C]/90 text-[#D7E2EA] transition-opacity hover:opacity-70 sm:right-5 sm:top-5"
                      onClick={closeContactModal}
                    >
                      <X className="h-4 w-4" strokeWidth={1.75} />
                    </button>

                    <div className="flex flex-col items-center gap-6 pt-2 sm:gap-7">
                      <h2
                        id="contact-modal-title"
                        className="hero-heading text-center text-2xl font-black uppercase tracking-tight sm:text-3xl"
                      >
                        Связаться
                      </h2>

                      <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                        <a
                          href={CONTACT_MAILTO}
                          className={`${contactButtonClassName} w-full sm:w-auto`}
                          style={contactButtonStyle}
                          onClick={closeContactModal}
                        >
                          Mail
                        </a>
                        <a
                          href={CONTACT_TELEGRAM_URL}
                          target="_blank"
                          rel="noreferrer"
                          className={`${contactButtonClassName} w-full sm:w-auto`}
                          style={contactButtonStyle}
                          onClick={closeContactModal}
                        >
                          Telegram
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </ContactModalContext.Provider>
  );
}
