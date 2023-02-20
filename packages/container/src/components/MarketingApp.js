import { mount } from 'marketing/MarketingApp';
import React, { useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";


export default () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        console.log('history.location.pathname', history, history.location.pathname)
       const { onNavigateParent } = mount(ref.current, {
           initialPath: history.location.pathname,
            onNavigate: ({ pathname: nextPathname }) => {
                if (history.location.pathname !== nextPathname) {
                    history.push(nextPathname);
                }
            }
        });

        history.listen(onNavigateParent);

    }, [])

    return <div ref={ref} />
}
