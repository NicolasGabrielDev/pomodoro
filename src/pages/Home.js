import { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const TIME_CONSTRAINT = 60 * 1000;

const BUTTONS_LABELS = [
    { label: 'Pomodoro', value: '1', initial: 25 },
    { label: 'Short Break', value: '2', initial: 5 },
    { label: 'Long Break', value: '3', initial: 10 }
];

export default function Home() {
    const [timeOnInit, setTimeOnInit] = useState(new Date());
    const [type, setType] = useState(BUTTONS_LABELS[0]);
    const [seconds, setSeconds] = useState(TIME_CONSTRAINT * 25);

    const getTime = _ => {
        return String(Math.floor(seconds / TIME_CONSTRAINT)).padStart(2, '0') + ':' + String(Math.floor(seconds % TIME_CONSTRAINT / 1000)).padStart(2, '0')
    }

    useEffect(() => {
        let interval = setInterval(() => {
            let diff = (new Date().getTime() - timeOnInit.getTime());
            setSeconds(type.initial * TIME_CONSTRAINT - diff);
        }, [1000]);

        return () => {
            clearInterval(interval);
        }
    }, [seconds, type]);

    const title = getTime();

    document.title = title;

    return ( 
        <div style={{ height: "100vh" }}>
            <div className="card flex justify-content-center align-items-center flex-column h-full">
                <div className="flex flex-row">
                    {BUTTONS_LABELS.map((item, index) => (
                        <Button 
                            className="m-1"
                            key={`button${index}`}
                            label={item.label}
                            onClick={() => {
                                setType(item);
                                setTimeOnInit(new Date());
                                setSeconds(item.initial * TIME_CONSTRAINT);
                            }}
                        />
                    ))}
                </div>
                <h1 className="text-8xl">{title}</h1>
            </div>
        </div>
    )
}