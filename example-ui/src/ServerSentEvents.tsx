import { FormEventHandler, useState } from 'react';

import { EventStreamContentType, fetchEventSource } from '@microsoft/fetch-event-source';
import { useCsrfToken } from "./WithCsrfToken";

function ServerSentEvents() {
  const [csrfToken] = useCsrfToken();
  const [delay, setDelay] = useState("10");
  const [text, setText] = useState("");
  const [error, setError] = useState("none");
  const [errorMessage, setErrorMessage] = useState("");
  const handleForm: FormEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();
    setErrorMessage("");
    const formData = new FormData();
    formData.append("delay", delay);
    formData.append("error", error);

    (async () => {
      try {
        await fetchEventSource("/api/sse", {
          headers: {
            [csrfToken.headerName]: csrfToken.token,
            "Accept": "text/event-stream, application/json",
          },
          method: "POST",
          body: formData,
          async onopen(resp) {
            const contentType = resp.headers.get("content-type");
            if (resp.ok && contentType === EventStreamContentType) {
              setText("");
              return;
            } else if (contentType === "application/json") {
              const json = await resp.json();
              throw new Error(json.message);
            }
            throw new Error();
          },
          onerror(err) {
            // instanceofでエラーの種類を見てリトライ要否を決める。
            // スローするとリトライされない。
            // とりあえず何が起きてもリトライしないようにしておく。
            throw err;
          },
          onmessage(ev) {
            const delta: Delta = JSON.parse(ev.data);
            if (delta.text) {
              setText(text => `${text}${delta.text}`);
            } else if (delta.error) {
              setErrorMessage(delta.error);
            }
          },
        });
      } catch (err: any) {
        setErrorMessage(err.message || "エラー");
      }
    })();
  };
  return (
    <div className="container">
      <div className='row'>
        <div className='col'>Server-Sent Events example</div>
      </div>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className='row'>
        <div className='col py-3'>
          <form method="POST" onSubmit={handleForm}>
            <fieldset>
              <div className='container'>
                <div className='row'>
                  <div className='col'>
                    <div className='mb-3'>
                      <label htmlFor="delay" className="form-label">表示の遅延(ミリ秒)</label>
                      <input value={delay} onChange={ev => setDelay(ev.target.value)} type="number" className="form-control" id="delay" />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" value="none" id="error1" checked={error === "none"} onChange={ev => setError(ev.target.value)} />
                      <label className="form-check-label" htmlFor="error1">
                        エラーなし
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" value="controller" id="error2" checked={error === "controller"} onChange={ev => setError(ev.target.value)} />
                      <label className="form-check-label" htmlFor="error2">
                        コントローラーでエラー
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" value="async" id="error3" checked={error === "async"} onChange={ev => setError(ev.target.value)} />
                      <label className="form-check-label" htmlFor="error3">
                        非同期処理でエラー
                      </label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <button className='btn btn-primary'>Submit</button>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div className='row'>
          <div className='col'>
            <span>{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServerSentEvents;

interface Delta {
  text: string | null;
  error: string | null;
}