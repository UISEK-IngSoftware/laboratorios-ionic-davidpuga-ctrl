import axios from 'axios';
import { Repository } from '../interfaces/Repository';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';

const GITHUB_API_BASE_URL = import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com';
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;

export const fetchRepositories = async (): Promise<Repository[]> => {
    try {
        const response = await axios.get(`${GITHUB_API_BASE_URL}/user/repos`, {
            headers: {
                Authorization: `token ${GITHUB_API_TOKEN}`,
            },
            params: {
                per_page: 100,
                sort: 'created',
                direction: 'desc',
                affiliation: 'owner',
                t: Date.now
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        return [];
    }
};

export const createRepository = async (repository: RepositoryPayload): Promise<Repository | null> => {
    try {
        const response = await axios.post(`${GITHUB_API_BASE_URL}/user/repos`, repository, {
            headers: {
                Authorization: `token ${GITHUB_API_TOKEN}`,
            },
        });
        console.log('Repository created successfully:', response.data);
        return response.data as Repository;
    } catch (error) {
        console.error('Error al crear repositorio:', error);
        return null;
    }
};