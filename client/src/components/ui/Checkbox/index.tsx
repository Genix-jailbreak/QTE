interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="flex items-center space-x-2">
      <input type="checkbox" {...props} className="rounded border-gray-300" />
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}