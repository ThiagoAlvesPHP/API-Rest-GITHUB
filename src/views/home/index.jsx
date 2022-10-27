// LIBs
import React, { useEffect, useState, useRef } from 'react';
import { Octokit } from "octokit";
import { format } from 'date-fns';

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

  async function auth(search = '', order = false) {
    const octokit = await new Octokit({
      auth: TOKEN
    });
    const { data: { login, id, name }, } = await octokit.rest.users.getAuthenticated();

    let repos = await octokit.request(`GET https://api.github.com/users/${login}/repos`);

    if (search.length > 0) {
      let arr = [];
      repos.data.map((el) => {
        let result = el.full_name.toLowerCase().indexOf(search.toLowerCase());
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

    if (order) {
      let arr = [...repos.data];
      arr.sort((a, b) => (a.updated_at < b.updated_at)?1:(b.updated_at < a.updated_at)?-1:0);
      setList(arr);
    }

    setLogin(login);
  }

  /**
   * order alfabebica
   */
  function orderAlfa() {
    auth();
    setSearch('');
  }

  /**
   * order data update
   */
  function orderData() {
    auth("", true);
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
      Usuário: <span className='name'>{login ? login : 'Não Logado'}</span>
      <hr />

      <div className="actions">
        <Button title="Ordem Alfabética" onOrder={orderAlfa} />
        <Button title="Ordenar por data de atualização" onOrder={orderData} />
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
              created_at={format(new Date(el.created_at), 'dd/MM/yyyy H:i:s')} 
              updated_at={format(new Date(el.updated_at), 'dd/MM/yyyy H:i:s')}
            />
          )}
        </section>
      }
    </div>
  )
}