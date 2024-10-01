import { Button, Form } from "antd";

type Props = {
  children: React.ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  type?: "link" | "text" | "default" | "primary" | "dashed" | undefined;
  danger?: boolean;
  loading?: boolean;
  shape?: "default" | "circle" | "round" | undefined;
  icon?: React.ReactNode;
  className?: string; // Add className as a prop
};

export const CustomButton = ({
  children,
  htmlType = "button",
  type,
  danger,
  loading,
  onClick,
  shape,
  icon,
  className, // Add className here
}: Props) => {
  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
        className={className} // Pass className to the Button component
      >
        {children}
      </Button>
    </Form.Item>
  );
};