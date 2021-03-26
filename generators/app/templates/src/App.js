import React from 'react'
import Routes from './routes'
import { renderRoutes } from "react-router-config";
import { UserState } from './store'
import { useRecoilState } from 'recoil'

function App() {

    const [ userState, setUserState ] = useRecoilState(UserState)

    React.useEffect(() => {
        setUserState({
            name: 'taotaotao',
            isLogin: false
        })
    }, [ setUserState ])

    return (
        <div className="App">
            {
                renderRoutes(Routes)
            }
        </div>
    );
}

export default App;