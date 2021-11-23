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
                <form action="/action_page.php">
                    <label for="eventTitle">Title:</label>
                    <input type="text" id="eventTitle" name="eventTitle"></input><br></br>
                    <label for="eventDate">Date:</label>
                    <input type="date" id="eventDate" name="eventDate"></input><br></br>
                    <label for="eventTime">Time:</label>
                    <input type="time" id="eventTime" name="eventTime"></input><br></br>
                    <input type="submit"></input>
                </form>
            </main>
        </Layout>
    )
}

export default CreateEvent
