import React from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"

import Navbar from "../components/Navbar"

const CreatePoll = () => {
    return (
        <Layout>
            <Navbar />
            <Seo title="CreatePoll" />
            <h1>Create Poll</h1>
        </Layout>
    )
}

export default CreatePoll
