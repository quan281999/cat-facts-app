/* eslint-disable @typescript-eslint/no-floating-promises */
import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";

const Home: NextPage = () => {
  const { data: randomCatFact, refetch, isFetching } = api.catFacts.getRandomCatFact.useQuery(
    undefined, 
    { refetchOnWindowFocus: false }
  );
  const { mutate: likeCatFact } = api.catFacts.likeCatFact.useMutation()
  const { mutate: dislikeCatFact } = api.catFacts.dislikeCatFact.useMutation()

  const onLikeClick = () => {
    if (randomCatFact) {
      likeCatFact({ id: randomCatFact.id, text: randomCatFact.text});
    }
    refetch();
  };

  const onDislikeClick = () => {
    if (randomCatFact) {
      dislikeCatFact({ id: randomCatFact.id, text: randomCatFact.text});
    }
    refetch();
  };

  return (
    <>
      <Head>
        <title>Cat Facts App</title>
        <link rel="icon" href="/cat.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-5xl font-bold text-white sm:text-[5rem] mb-14">
            Cat Facts &#128571;
          </h1>
          <div className="overflow-y-auto max-h-96 max-w-4xl flex flex-col bg-white/10 p-6 text-white text-2xl mb-14 mx-6">
            {isFetching ? <Spinner/> : randomCatFact?.text}
          </div>
          <div className="flex gap-6 flex-row">
            <button onClick={onDislikeClick} disabled={isFetching} className="p-2 rounded-full bg-white/20 hover:bg-red-400/60 active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button onClick={onLikeClick} disabled={isFetching} className="p-2 rounded-full  bg-white/20 hover:bg-green-400/60 active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
