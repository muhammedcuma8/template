import React, { ReactNode } from 'react';
import { Dialog } from 'primereact/dialog';

interface KTNDialogProps {
  visible: boolean;
  style?: React.CSSProperties;
  header?: React.ReactNode;
  modal?: boolean;
  className?: string;
  footer?: React.ReactNode;
  onHide: () => void;
  children: ReactNode;
}

const KTNDialog: React.FC<KTNDialogProps> = ({
  visible,
  style,
  header,
  modal,
  className,
  footer,
  onHide,
  children,
}) => {
  return (
    <Dialog
      visible={visible}
      style={style}
      header={header}
      modal={modal}
      className={className}
      footer={footer}
      onHide={onHide}
    >
      {children}
    </Dialog>
  );
};

export default KTNDialog;
