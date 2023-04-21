import Domain from "@/pages/api/domain";

export const AuthEndpoint = {
    login: {
        url: `${Domain}/login`,
        method: 'POST'
    },
    register: {
        url: `${Domain}/signup`,
        method: 'POST'
    },
    logout: {
        url: `${Domain}/logout`,
        method: 'POST'
    }
}