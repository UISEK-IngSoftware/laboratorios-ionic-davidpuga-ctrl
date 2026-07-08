import axios from 'axios';
import { Repository } from '../interfaces/Repository';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { GithubUser } from '../interfaces/GithubUser';
import AuthService from './AuthService';

const GITHUB_API_BASE_URL = import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com';

const githubApiClient = axios.create({
    baseURL: GITHUB_API_BASE_URL
})

githubApiClient.interceptors.request.use(
    (config) => {
        const AuthHeader = AuthService.getAuthHeader();
        config.headers.Authorization = AuthHeader;
        return config; 
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const fetchRepositories = async (): Promise<Repository[]> => {
    try {
        const response = await githubApiClient.get(`/user/repos`, {
            params: {
                per_page: 100,
                sort: 'created',
                direction: 'desc',
                affiliation: 'owner',
                t: Date.now() 
            },
        });
        return response.data;
    } catch (error) {
        throw new Error((error as Error).message); 
    }
};

export const createRepository = async (repository: RepositoryPayload): Promise<Repository | null> => {
    try {
        const response = await githubApiClient.post(`/user/repos`, repository); 
        return response.data as Repository;
    } catch (error) {
        throw new Error((error as Error).message); 
    }
};

export const getUserInfo = async (): Promise<GithubUser | null> => {
    try {
        const response = await githubApiClient.get(`/user`); 
        return response.data as GithubUser;
    } catch (error) {
        throw new Error((error as Error).message); 
    }
};

export const updateRepository = async (owner: string, repoName: string, data: RepositoryPayload): Promise<Repository> => {
    try {
        // Usamos PATCH porque la documentación oficial de GitHub lo requiere así para actualizar repositorios.
        const response = await githubApiClient.patch(`/repos/${owner}/${repoName}`, data); 
        return response.data as Repository;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const deleteRepository = async (owner: string, repoName: string): Promise<void> => {
    try {
        // Usamos DELETE apuntando a la ruta específica del repositorio
        await githubApiClient.delete(`/repos/${owner}/${repoName}`);
    } catch (error) {
        throw new Error((error as Error).message);
    }
};