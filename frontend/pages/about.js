import Link from 'next/link'
export default ({ url: { query: { name } } }) => (
    <p>About { name }</p>
);
