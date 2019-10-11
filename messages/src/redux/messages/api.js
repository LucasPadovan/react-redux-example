import {formatUrl} from 'url-lib';

export const getUserMessages = () => {
    const url = formatUrl(
        '/api/v3/user/messages/',
        {
            'page_size': 20,
        }
    );

    return url;
};
