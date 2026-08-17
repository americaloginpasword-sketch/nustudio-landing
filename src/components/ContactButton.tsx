import { useContactModal } from './ContactModalProvider';
import { contactButtonClassName, contactButtonStyle } from './contactButtonStyles';

export default function ContactButton() {
  const { openContactModal } = useContactModal();

  return (
    <button
      type="button"
      className={contactButtonClassName}
      style={contactButtonStyle}
      onClick={openContactModal}
    >
      Связаться
    </button>
  );
}
