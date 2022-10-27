// LIBs
import React, { useEffect, useState } from 'react';
import { Octokit } from "octokit"

// STYLE
import './style.scss';

export function HomeView() {
  const TOKEN = "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";

  const [login, setLogin] = useState();
  const [list, setList] = useState();

  useEffect(() => {
    auth();
  }, []);

  async function auth() {
    const octokit = await new Octokit({
      auth: TOKEN
    });

    const {
      data: { login, id, name },
    } = await octokit.rest.users.getAuthenticated();


    setLogin(login);

    let repos = await octokit.request(`GET https://api.github.com/users/${login}/repos`);

    setList(repos.data);

    // console.log(octokit.rest.repos);
    // console.log(octokit.request.endpoint);
    // console.log(octokit.rest.repos.listPublic());
  }

  return (
    <div className={`home`}>
      Usuario: {login ? login : 'Não Logado'}
      <hr />
      
      <ul className='list'>
        {list.map((el) =>
          <li key={el.id}>{el.url}</li>
        )}
      </ul>
    </div>
  )
}