import { Link } from "react-router-dom";

export const Charecter = ({
    name,
    url,
}) => {
    const id = url.split('/').filter(x => x).pop();
    return (
        <div>
            <Link to={`/charecters/${id}`}>{name}</Link>
        </div>
    )
}