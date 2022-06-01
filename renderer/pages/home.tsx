import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <div className='grid grid-col-1 text-2xl w-full text-center'>
      <div className='grid grid-col-1 text-2xl w-full text-center'>
        <img className='ml-auto mr-auto p-16' src='https://www.neuralx.com.br/images/logo2.png' />
      </div>
        <span>⚡ Invoice Generator ⚡</span>
      </div>
      <div className='mt-8 w-full flex-wrap flex justify-center'>
        <Link href='/form'>
          <a className='btn-blue'>Go to next page</a>
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Home;
