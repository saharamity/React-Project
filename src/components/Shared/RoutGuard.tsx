import { Navigate } from "react-router-dom";
import { TUser } from "../../Types/TUser";

type TRoutGuardProps = {
    children: React.ReactNode;
    user: TUser;
}
const RoutGuard = (props: TRoutGuardProps) => {
    return props.user ? <>{props.children}</> : <Navigate to={"/"} />
};
export default RoutGuard;