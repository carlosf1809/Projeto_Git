import React, {FormEvent, useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi'
import {Link} from 'react-router-dom';

import api from '../../services/api'
import logo_img from "../../assets/Logo.svg"
import Repository from '../Repository';

import {Title, Form, Repositories, Error} from './styles'
import { strict } from 'assert';

interface Respository{
    full_name: string;
    description:string;
    owner:{
        login:string;
        avatar_url:string;
    };

}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState<Respository[]>(() => {
        const storage = localStorage.getItem( '@Projeto_Git:repositories', );

        if(storage){
            return JSON.parse(storage);
        }else{
            return [];
        }
    });
    const [inputError, setinputError] = useState('');

    async function handleAddRepository(event: FormEvent<HTMLFormElement>,):Promise <void> {event.preventDefault();
        //input vazio =>
        if(!newRepo){
            setinputError('Digite o autor/nome do repositório');   
            return;
        }

        try{
            const response = await api.get<Respository>(`/repos/${newRepo}`);
        
        console.log(response.data);

        const repository = response.data;

        setRepositories([...repositories, repository])
        setNewRepo('');
        setinputError('');  
        }catch (err) {
            setinputError('Erro na busca do repositório ');   
        }
        
    }

    useEffect (() => {
        localStorage.setItem('@Projeto_Git:repositories',JSON.stringify(repositories))
    }, [repositories])
 
    return (
        <>
            <img src={logo_img} alt="git hub"/>
            <Title>
                Explore repositório no github
            </Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input value={newRepo} 
                onChange={(e)=> setNewRepo(e.target.value)} 
                placeholder="Digite o nome do repositorio"/>

                <button type="submit"> Pesquisar </button>
            </Form>

            { inputError && <Error>{inputError}</Error> }

            <Repositories>
            {repositories.map(Repository => (
                
                <Link key={Repository.full_name} to={`Repository/${Repository.full_name}`}>
                    <img 
                    src= {Repository.owner.avatar_url}
                    alt={Repository.owner.login}/>

                    <div>
                        <strong>{Repository.full_name}</strong>
                        <p>{Repository.description}</p>
                    </div>

                    <FiChevronRight size={20}/>
                </Link>

                
            ))}
            </Repositories>
        </>
    )
};

export default Dashboard;