import { useContext, useMemo } from "react";

import WithCsrfToken, { CsrfTokenContext, CsrfToken } from "./WithCsrfToken";

export function useHttp() {
  const [csrfToken, refreshCsrfToken] = useContext(CsrfTokenContext);
  const http = useMemo(() => new HttpClient(csrfToken), [csrfToken]);
  return http;
}

class HttpClient {

  private csrfToken: CsrfToken;
  private handleResponse: (resp: any) => Promise<any> = resp => {
    if (resp.ok) {
      if (resp.status === 204) {
        return;
      }
      //const contentType = resp.headers.get("Content-Type");
      //if (contentType === "application/json") {
      //  return resp.json();
      //}
      return resp.json();
    }
    return Promise.reject(resp);
  };

  constructor(csrfToken: CsrfToken) {
    this.csrfToken = csrfToken;
  }

  get(url: string): Promise<any> {
    return fetch(url).then(this.handleResponse);
  }

  private postInternal(url: string, body: any, contentType: string): Promise<any> {
    return fetch(url, {
      method: "POST",
      headers: {
        [this.csrfToken.headerName]: this.csrfToken.token,
        "Content-Type": contentType
      },
      body
    }).then(this.handleResponse);
  }

  post(url: string, json: any): Promise<any> {
    return this.postInternal(url, JSON.stringify(json), "application/json");
  }

  postForm(url: string, form: any): Promise<any> {
    return this.postInternal(url, new URLSearchParams(form), "application/x-www-form-urlencoded");
  }
}
