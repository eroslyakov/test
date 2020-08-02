import React, { useState, useEffect } from 'react';

import './App.scss';

const URL = 'http://stapi.co/api/v1/rest/character/search';

const App = () => {
    const [info, setInfo] = useState();
    useEffect(() => {
        (async function () {
            const result = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `title=${encodeURI('James T. Kirk')}&name=${encodeURI('James T. Kirk')}`,
            }).then((res) => res.json());
            const character = result.characters[0];
            setInfo(character);
        })();
    }, []);

    return (
        <div className="app">
            <img alt="header" src="images/header.jpg" className="app-header" />
            <p>
                <i>
                    You know the greatest danger facing us is ourselves, and irrational fear of the unknown. There is no
                    such thing as the unknown. Only things temporarily hidden, temporarily not understood.
                </i>
            </p>
            <p>- Captain Kirk</p>
            <section>
                {!info ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {Object.entries(info)
                            .filter(([k, value]) => value && k !== 'uid')
                            .map(([fieldKey, fieldValue], idx) => (
                                <li key={idx}>{`${fieldKey}: ${fieldValue}`}</li>
                            ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default App;
