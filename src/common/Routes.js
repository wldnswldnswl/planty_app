import {
    Switch,
    Route,
    Link
} from "react-router-dom";

export function Routes() {

    return(
        <Switch>
            <Route path="/login" component = {Login} />
            <Route path="/logout" component = {Logout} />
        </Switch>
    )
}