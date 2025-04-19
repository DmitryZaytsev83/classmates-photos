const AppNavigation = () => {
    const root = '/';

    return {
        main: () => `${root}`,
        photo: () => `${root}photo`,
        info: () => `${root}info`,
    };
};

const getRoutes = () => {
    return {
        appNavigation: AppNavigation(),
    };
};

export default getRoutes;
