import clsx from "clsx";

import Button from "../atoms/Button";

type Props = {
  open?: boolean;
  error?: boolean;
  onClose: () => void;
};

function PurchaseResultModal({ open = false, error, onClose }: Props) {
  return (
    <div
      className={clsx(
        "modal modal-bottom sm:modal-middle",
        open && "modal-open"
      )}
    >
      <div className={clsx("modal-box")}>
        <div>
          <h1 className="text-2xl">
            {error
              ? "There was an error processing your payment"
              : "Payment successful"}
          </h1>
        </div>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default PurchaseResultModal;
