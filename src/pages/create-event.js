import React from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"

import Navbar from "../components/Navbar"

const CreateEvent = () => {
    return (
        <Layout>
            <Seo title="CreateEvent" />
            <Navbar />
            <main>
                <h1> Create Event </h1>
            </main>
        </Layout>
    )
}

export default CreateEvent
