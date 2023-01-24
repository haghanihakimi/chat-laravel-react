import { Head, Link } from '@inertiajs/react';
import Layout from '../Layouts/General'
import route from 'ziggy-js';
import { useSelector } from 'react-redux';

export default function({message}) {
  const auth = useSelector((state) => state.auth.loggedIn)

  return (
    <Layout body={
      <h1>{auth}</h1>
    }/>
  );
} 

