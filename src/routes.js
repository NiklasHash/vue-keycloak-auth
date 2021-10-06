import Home from "./components/Home"
import Admin from "./components/Admin"
import Forbidden from "./components/Forbidden"

const auth = true;

export const routes = [
    {path: "", component: Home},
    {path: "/admin", component: Admin,
    beforeEnter(to, from, next) {
        if(auth){
            next()
        } else {
            next("/forbidden")
        }
    }},
    {path: "/forbidden", component: Forbidden}
]