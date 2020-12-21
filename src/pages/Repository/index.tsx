import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { FiChevronLeft,FiChevronRight } from 'react-icons/fi'
import {Link} from 'react-router-dom';
import api from '../../services/api'

import logo_img from "../../assets/Logo.svg"

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams{
    repository: string;
}

interface Respository{
    full_name: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count:number;
    description:string;
    owner:{
        login:string;
        avatar_url:string;
    };

}

interface issue {
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string;
    }
}


const Repository: React.FC = () => {
    const [repository, setRepository] = useState<Respository | null>(null); 
    const [ issues, setIssues ] = useState<issue[]>([]);

    const {params} = useRouteMatch<RepositoryParams>();

    useEffect(() => {
        api.get(`/repos/${params.repository}`).then(response => {
            setRepository(response.data)
        });

        api.get(`/repos/${params.repository}/issues`).then(response => {
            setIssues(response.data)
        })
    }, [params.repository])
    return (
    <>
        <Header>
            <img src={logo_img} alt="git hub"/>

            <Link to="/">
                <FiChevronLeft size={16}/>
                voltar         
            </Link>
        </Header>  

        {repository ? (
            <RepositoryInfo>
            <header>
                <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                <div>
                    <strong>{repository.full_name}</strong>
                    <p>{repository.description}</p>
                </div>
            </header>
            <ul>
                <li>
                    <strong>{repository.stargazers_count}</strong>
                    <span>Stars</span>
                </li>
                <li>
                    <strong>{repository.forks_count}</strong>
                    <span>Forks</span>
                </li>
                <li>
                    <strong>{repository.open_issues_count}</strong>
                    <span>Issues abertas</span>
                </li>
            </ul>
        </RepositoryInfo>
        ) : (
            <p> carregando... </p>
        )}
        
        <Issues>
            {issues.map(issue => issue ? (
                <a target="blanck" key={issue.id} href={issue.html_url}>
                <div>
                    <strong>{issue.title}</strong>
                    <p>{issue.user.login}</p>
                </div>

                <FiChevronRight size={20}/>
            </a>
            ): (
                <p>carregando...</p>
            ))}
        </Issues>
    </>
    );
};

export default Repository;  
