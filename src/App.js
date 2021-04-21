import React, { useEffect, useState } from 'react';

import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export default function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState('stop');
  const [lastClicked, setLastClicked] = useState(0);

  useEffect(() => {
    const unsubscribe = new Subject();

    interval(1000)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (status === 'run') {
          setSec(val => val + 1000);
        }
      });

    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [status]);

  const start = () => {
    setStatus('run');
  };

  const stop = () => {
    setStatus('stop');
    setSec(0);
  };

  const reset = () => {
    setSec(0);
  };

  const wait = () => {
    const timeNow = new Date().getTime();

    if ((timeNow - lastClicked) < 300) {
      setStatus('wait');
    }

    setLastClicked(timeNow);
  };

  return (
    <div className="card">
      <span className="card-header-title is-centered">
        {new Date(sec).toISOString().slice(11, 19)}
      </span>
      <div className="card-footer">
        <button
          type="button"
          className="button card-footer-item"
          onClick={start}
        >
          Start
        </button>
        <button
          type="button"
          className="button card-footer-item"
          onClick={stop}
        >
          Stop
        </button>
        <button
          type="button"
          className="button card-footer-item"
          onClick={reset}
        >
          Reset
        </button>
        <button
          type="button"
          className="button card-footer-item"
          onClick={wait}
        >
          Wait
        </button>
      </div>
    </div>
  );
}
