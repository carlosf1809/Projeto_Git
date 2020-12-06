import React, {useState } from 'react';
import { FiChevronRight } from 'react-icons/fi'

import api from '../../services/api'
import logo_img from "../../assets/Logo.svg"
import Repository from '../Repository';

import {Title, Form, Repositories} from './styles'
import { strict } from 'assert';

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState([]);

    function handleAddRepository() {
        //adiçao api github
        //Consumir api github
        //salvar novo respository
    }
 
    return (
        <>
            <img src={logo_img} alt="git hub"/>
            <Title>
                Explore repositório no github
            </Title>

            <Form action="">
                <input value={newRepo} onChange={(e)=> setNewRepo(e.target.value)} placeholder="Digite o nome do repositorio"/>
                <button type="submit"> Pesquisar </button>
            </Form>

            <Repositories>
                <a href="#">
                    <img 
                    src="https://avatars0.githubusercontent.com/u/55306148?s=460&u=3ab72f350c5182e18c3e0a87167d479186d539e4&v=4" 
                    alt="Carlos Fabiano"/>

                    <div>
                        <strong>project_git</strong>
                        <p>teste teste</p>
                    </div>

                    <FiChevronRight size={20}/>
                </a>

                
            </Repositories>
        </>
    )
};

export default Dashboard;