import githubIcon from '../assets/social-media-icons/github.png';
import linkedinIcon from '../assets/social-media-icons/linkedin.png';
import stackoverflowIcon from '../assets/social-media-icons/stackoverflow.png';
import behanceIcon from '../assets/social-media-icons/behance.png';
import wwwIcon from '../assets/social-media-icons/www.png';

export interface SocialLinkConfig {
    name: string;
    image: string;
    placeholder: string;
}

export const socialLinksConfig: SocialLinkConfig[] = [
    {
        name: 'Github',
        image: githubIcon,
        placeholder: 'https://github.com/yourusername'
    },
    {
        name: 'Linkedin',
        image: linkedinIcon,
        placeholder: 'https://linkedin.com/in/yourusername'
    },
    {
        name: 'Stackoverflow',
        image: stackoverflowIcon,
        placeholder: 'https://stackoverflow.com/users/yourid'
    },
    {
        name: 'Behance',
        image: behanceIcon,
        placeholder: 'https://behance.net/yourusername'
    },
    {
        name: 'WWW',
        image: wwwIcon,
        placeholder: 'https://yourportfolio.com'
    }
];

