import Link from 'next/link'
import {withRouter} from "next/router";
export default withRouter(( {router: {query: { name } }} ) => (
    <p>About { name }</p>
));
