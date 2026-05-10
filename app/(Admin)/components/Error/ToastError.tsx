type ToastProps = {
  message: string | null;
};

export const ToastError = ({ message }: ToastProps) => {
  if (!message) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-zinc-900 border border-zinc-700 px-5 py-3 rounded-xl flex items-center gap-3 shadow-lg animate-fade-in">

        <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" />

        <p className="text-sm font-medium text-gray-200">
          {message}
        </p>

      </div>
    </div>
  );
};
export default ToastError;