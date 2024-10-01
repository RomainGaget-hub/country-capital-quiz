// https://restcountries.com/v3.1/all

export interface ICountry {
    name: string,
    capital: string,
    flag: string,
    population: number,
    area: number,
    region: string,
}



export const getCountries = async (): Promise<ICountry[]> => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        console.log('data', data);
        return data.filter((country: any) => {
            return country.capital && country.capital.length > 0;
        }).map((country: any) => {
            return {
                name: country.name.common,
                capital: country.capital[0],
                flag: country.flags.png,
                population: country.population,
                area: country.area,
                region: country.region,
            };
        });
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
};
