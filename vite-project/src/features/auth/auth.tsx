import { useCurrentQuery } from "../../services/authApi"




//для loadingпри подгрузке данных
const Auth = ({children}: {children: JSX.Element}) => {
    const {isLoading} = useCurrentQuery();

    if(isLoading){
        return <h1>Please wait</h1>
    }

    return children

}

export default Auth
