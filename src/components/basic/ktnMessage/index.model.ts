export interface MessagesProps {
  sticky: boolean;
  severity: "success" | "info" | "warn" | "error" | undefined;
  summary: string;
  detail: string | any;
  content:any
}
