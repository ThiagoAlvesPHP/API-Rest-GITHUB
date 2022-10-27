// LIBs
import React, { useEffect, useState, useRef } from 'react';
import { Octokit } from "octokit";

// COMPONENTs
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { List } from "../../components/List";

// STYLE
import './style.scss';

export function HomeView() {
  const TOKEN = "SEU_TOKEN";

  const [login, setLogin] = useState();
  const [list, setList] = useState();
  const [search, setSearch] = useState('');

  useEffect(() => {
    auth();
  }, []);

  async function auth(search = '') {
    const octokit = await new Octokit({
      auth: TOKEN
    });
    const {
      data: { login, id, name },
    } = await octokit.rest.users.getAuthenticated();
    setLogin(login);
    let repos = await octokit.request(`GET https://api.github.com/users/${login}/repos`);

    if (search.length > 0) {
      let arr = [];
      repos.data.map((el) => {
        let result = el.full_name.indexOf(search);
        if (result > -1) {
          arr.push({
            id:el.id,
            html_url:el.html_url, 
            full_name:el.full_name, 
            language:el.language,
            created_at:el.created_at,
            updated_at:el.updated_at
          });
        }
      });

      setList(arr);
    } else {
      setList(repos.data);
    }

    // console.log(repos.data);
  }

  /**
   * order alfabebica
   */
  function order() {
    auth();
    setSearch('');
  }

  useEffect(()=> {
    if (search.length > 0) {
      auth(search);
    } else {
      auth();
    }
  }, [search]);

  return (
    <div className={`home`}>
      Usuario: {login ? login : 'Não Logado'}
      <hr />

      <div className="actions">
        <Button title="Ordem Alfabética" onOrder={order} />
        <Button title="Ordenar por data de atualização" onOrder={order} />
        <Input search={search} setSearch={setSearch} />
      </div>
      
      {list &&
        <section className='list'>
          <div className="titles">
            <span className='title'>Repositório</span>
            <span className='title'>Línguagem</span>
            <span className='title'>Criado em:</span>
            <span className='title'>Atualizado em:</span>
          </div>
          {list.map((el) =>
            <List 
              key={el.id}
              id={el.id} 
              html_url={el.html_url} 
              full_name={el.full_name}
              language={el.language} 
              created_at={el.created_at} 
              updated_at={el.updated_at}
            />
          )}
        </section>
      }
    </div>
  )
}