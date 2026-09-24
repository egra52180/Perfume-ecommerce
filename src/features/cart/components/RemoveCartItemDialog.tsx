import type { CartLine } from "@/features/cart/types/cart.types";
import { formatCartAmount } from "@/features/cart/utils/cart.utils";

type RemoveCartItemDialogProps = {
  line: CartLine;
  onConfirm: () => void;
  onCancel: () => void;
};

export function RemoveCartItemDialog({
  line,
  onConfirm,
  onCancel,
}: RemoveCartItemDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h3 className="font-[family-name:var(--font-instrument-serif)] text-[30px] leading-[normal] text-[#1a1a1a]">
          Remove item?
        </h3>
        <p className="mt-3 text-[14px] leading-[1.5] text-[#605a54]">
          Are you sure you want to remove {line.name} from your cart?
        </p>
        <div className="mt-5 flex items-center justify-between rounded bg-[#f4f0eb] px-3 py-2 text-[13px] text-[#1a1a1a]">
          <span>Item total</span>
          <strong>{formatCartAmount(line.price * line.quantity)}</strong>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-[#ebe6de] px-4 py-2 text-[12px] font-semibold uppercase text-[#1a1a1a]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded bg-[#1a1a1a] px-4 py-2 text-[12px] font-semibold uppercase text-white"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
