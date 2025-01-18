import React, { useRef } from 'react';
import { useMountEffect } from 'primereact/hooks';
import { Messages as PrimeMessage } from 'primereact/messages';
import { MessagesProps } from './index.model';

const Messages = ({
  sticky,
  severity,
  summary,
  detail,
  content,
}: MessagesProps) => {
  const msgs = useRef<PrimeMessage>(null);

  useMountEffect(() => {
    msgs.current?.show({
      sticky: sticky,
      severity: severity,
      summary: summary,
      detail: detail,
      closable: false,
      content: content,
    });
  });

  return <PrimeMessage ref={msgs} style={{ width: '100%' }} />;
};
export default Messages;
