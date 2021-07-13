import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout/Layout';
import SearchBar from './../components/searchBar/SearchBar';
import Countries from './../components/countries/Countries';


export default function Home({data}) {
  const [search, setSearch] = useState('')

  const HandleChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value.toLowerCase())
  }

  const filtereddata = data.filter(country => (
    country.name.toLowerCase().includes(search) ||
    country.region.toLowerCase().includes(search)
  ))

  return (
    <Layout>
      <Head>
        <title>World Ranks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar placeholder='Search By Name, Region' onChange={HandleChange} />
      <Countries data={filtereddata} />
    </Layout>
  )
}


export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all')
  const data = await res.json()

  return {
    props: { data }
  }
}