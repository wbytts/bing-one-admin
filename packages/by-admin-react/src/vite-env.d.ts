/// <reference types="vite/client" />
import axios from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    showLoading?: boolean;
    showError?: boolean;
  }
}

declare namespace JSX {
}
