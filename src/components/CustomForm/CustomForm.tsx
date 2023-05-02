import React, {
  ChangeEvent, FormEvent, KeyboardEvent, FC,
} from 'react';

interface CustomFormProps {
  onSubmit: (event: FormEvent) => void;
  className: string;
  type: string;
  placeholder: string;
  value: string;
  onBlur: (event: FormEvent) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => void;
  ref: React.RefObject<HTMLInputElement>
}

export const CustomForm: FC<CustomFormProps> = ({
  onSubmit,
  className,
  type,
  ref,
  onChange,
  value,
  onKeyUp,
  onBlur,
  placeholder,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        className={className}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onKeyUp={onKeyUp}
        ref={ref}
        placeholder={placeholder}
        type={type}
      />
    </form>
  );
};
