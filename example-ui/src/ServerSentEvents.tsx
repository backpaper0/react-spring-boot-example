import { FormEventHandler, useState } from 'react';

import { EventStreamContentType, fetchEventSource } from '@microsoft/fetch-event-source';
import { useCsrfToken } from "./WithCsrfToken";

function ServerSentEvents() {
  const [csrfToken] = useCsrfToken();
  const [delay, setDelay] = useState("10");
  const [text, setText] = useState("");
  const handleForm: FormEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("delay", delay);

    fetchEventSource("/api/sse", {
      headers: {
        [csrfToken.headerName]: csrfToken.token,
        "Accept": "text/event-stream",
      },
      method: "POST",
      body: formData,
      async onopen(resp) {
        if (resp.ok && resp.headers.get("content-type") == EventStreamContentType) {
          setText("");
          return;
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
        setText(text => `${text}${delta.text}`);
      },
    });
  };
  return (
    <div className="container">
      <div className='row'>
        <div className='col'>Server-Sent Events example</div>
      </div>
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
  text: string;
}