import Head from 'next/head'
import Layout from './../../components/layout/Layout';
import styles from './Country.module.css'


export const getStaticPaths = async () => {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const countries = await res.json();

    const paths = countries.map((country) => ({
        params: { id: country.alpha3Code },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context) => {
    const id = context.params.id
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
    const country = await res.json()

    return {
        props: { country }
    }
}


function Country({ country }) {

    return (
        <>
            <Layout>
                
                <Head>
                    <title>{country.name}</title>
                    <link rel="icon" href={country.flag} />
                </Head>

                <div className={styles.detail_container}>

                    <div className={styles.detail_flag}>
                        <div className={styles.detail_flag_img}>
                            <img src={country.flag} alt={country.name} />
                        </div>
                        <div className={styles.detail_flag_title}>
                            <h1>{country.name}</h1>
                            <p>{country.region}</p>
                        </div>
                    </div>

                    <div className={styles.detail_detail}>
                        <div className={styles.detail_capital}>
                            <h4 className={styles.detail_label}>Capital</h4>
                            <h4>{country.capital}</h4>
                        </div>
                        <div className={styles.detail_language}>
                            <h4 className={styles.detail_label}>Language</h4>
                            <h4>{country.languages.map(({ name }) => name).join(", ")}</h4>
                        </div>
                        <div className={styles.detail_population}>
                            <h4 className={styles.detail_label}>Population</h4>
                            <h4>{country.population}</h4>
                        </div>
                        <div className={styles.detail_area}>
                            <h4 className={styles.detail_label}>Area (km<sup style={{ fontSize: '.5rem' }}>2</sup>)</h4>
                            <h4>{country.area}</h4>
                        </div>
                        <div className={styles.detail_native_name}>
                            <h4 className={styles.detail_label}>NativeName</h4>
                            <h4>{country.nativeName}</h4>
                        </div>
                        <div className={styles.detail_currency}>
                            <h4 className={styles.detail_label}>Currency</h4>
                            <h4>{country.currencies.map(cur => cur.code)}</h4>
                        </div>
                    </div>

                </div>
            </Layout>
        </>
    )
}

export default Country
