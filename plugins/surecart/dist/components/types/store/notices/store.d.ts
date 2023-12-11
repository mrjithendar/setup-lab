export type NoticeType = 'default' | 'info' | 'success' | 'warning' | 'error';
interface AdditionalError {
  code: string;
  message: string;
  data: {
    attribute: string;
    type: string;
    options: {
      if: string[];
      value: string;
    };
  };
}
export interface ScNoticeStore {
  type: NoticeType;
  code: string;
  message: string;
  data?: {
    status: number;
    type: string;
    http_status: string;
  };
  additional_errors?: AdditionalError[] | null;
  dismissible?: boolean;
}
declare const state: ScNoticeStore, onChange: import("@stencil/store/dist/types").OnChangeHandler<ScNoticeStore>, on: import("@stencil/store/dist/types").OnHandler<ScNoticeStore>, dispose: () => void, forceUpdate: (key: keyof ScNoticeStore) => any;
export default state;
export { state, onChange, on, dispose, forceUpdate };
