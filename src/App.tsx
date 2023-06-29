import { useEffect, useState } from 'react';
import './App.css';

const max = 491;

function App() {
    const [norm, setNorm] = useState(false);
    const [datesCnt, setDatesCnt] = useState(0);
    const Spans = Array.from(Array(datesCnt).keys());

    const text = 'Не норм; ';

    useEffect(() => {
        const intervalTime =
            datesCnt < 4
                ? 1000
                : datesCnt < 10
                ? 600
                : datesCnt < 50
                ? 200
                : datesCnt < 80
                ? 100
                : datesCnt < 150
                ? 50
                : datesCnt < 250
                ? 10
                : 1;
        if (!norm) return;

        const interval = setInterval(() => {
            if (datesCnt < max) {
                setDatesCnt(datesCnt + 1);
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, [norm, datesCnt]);

    return (
        <>
            <div className="container">
                <button
                    className="button"
                    onClick={() => {
                        setNorm(true);
                        setDatesCnt(0);
                    }}
                >
                    Уже норм?
                </button>
                {Spans.map((s, i) => (
                    <span key={s} className="text">
                        День {max - i}: {text}
                    </span>
                ))}
                <span
                    style={{ opacity: `${Spans.length === max ? 1 : 0}` }}
                    className="text"
                >
                    День 0: Началась война
                </span>
            </div>
        </>
    );
}

export default App;
