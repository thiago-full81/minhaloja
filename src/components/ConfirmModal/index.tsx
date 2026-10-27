import "./styles.css";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirming: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  title,
  message,
  confirming,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onCancel}>
      <section
        aria-labelledby="confirm-modal-title"
        aria-modal="true"
        className="confirm-modal"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-modal-title">{title}</h2>
        <p>{message}</p>
        <div className="confirm-modal__actions">
          <button
            className="button button--secondary"
            disabled={confirming}
            onClick={onCancel}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="button button--danger"
            disabled={confirming}
            onClick={onConfirm}
            type="button"
          >
            {confirming ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </section>
    </div>
  );
}
