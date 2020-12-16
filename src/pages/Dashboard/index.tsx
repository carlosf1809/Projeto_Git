import React, {FormEvent, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi'

import api from '../../services/api'
import logo_img from "../../assets/Logo.svg"
import Repository from '../Repository';

import {Title, Form, Repositories} from './styles'
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
    const [repositories, setRepositories] = useState<Respository[]>([]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>,):Promise <void> {
        event.preventDefault();

        const response = await api.get<Respository>(`/repos/${newRepo}`);
        
        console.log(response.data);

        const repository = response.data;

        setRepositories([...repositories, repository])
        setNewRepo('');
        
    }
 
    return (
        <>
            <img src={logo_img} alt="git hub"/>
            <Title>
                Explore repositório no github
            </Title>

            <Form onSubmit={handleAddRepository}>
                <input value={newRepo} 
                onChange={(e)=> setNewRepo(e.target.value)} 
                placeholder="Digite o nome do repositorio"/>

                <button type="submit"> Pesquisar </button>
            </Form>

            <Repositories>
            {repositories.map(Repository => (
                
                    <a key={Repository.full_name} href="#">
                    <img 
                    src= {Repository.owner.avatar_url}
                    alt={Repository.owner.login}/>

                    <div>
                        <strong>{Repository.full_name}</strong>
                        <p>{Repository.description}</p>
                    </div>

                    <FiChevronRight size={20}/>
                </a>

                
            ))}
            </Repositories>
        </>
    )
};

export default Dashboard;