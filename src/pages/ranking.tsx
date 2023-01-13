import React from 'react';
import { type NextPage } from "next";

import { api } from "../utils/api";
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';

const Ranking: NextPage = () => {
  const { data: catFacts, isFetching } = api.catFacts.getAllCatFacts.useQuery(
    undefined, 
    { refetchOnWindowFocus: false }
  );

  return (
    <Layout>
      {isFetching
        ? (
          <div className='flex items-center justify-center mt-8'>
            <Spinner />
          </div>          
        )
        : (
          <div className="overflow-x-auto px-8 mt-8">
            <table className="w-full text-left">
              <thead className="bg-white/10 text-white text-xl">
                  <tr>
                      <th className="px-6 py-3">
                          Rank
                      </th>
                      <th className="px-6 py-3">
                          Fact
                      </th>
                      <th className="px-6 py-3">
                          Likes
                      </th>
                      <th className="px-6 py-3">
                          Dislikes
                      </th>
                  </tr>
              </thead>
              <tbody className="bg-transparent text-white text-md">
                {catFacts?.data.map((fact, index) => (
                  <tr key={fact.id}>
                    <td className="px-6 py-4">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      {fact.text}
                    </td>
                    <td className="px-6 py-4">
                      {fact.likes}
                    </td>
                    <td className="px-6 py-4">
                      {fact.dislikes}
                    </td>
                  </tr>
                ))}
              </tbody>          
            </table>
          </div>
        )
      }
    </Layout>
  )
}

export default Ranking