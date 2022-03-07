import {useNavigate} from 'react-router-dom'

import styles from './NewProject.module.css'

import ProjectForm from '../project/ProjectForm'

function NewProject() {

    const navigate = useNavigate()

    function createPost(project) {
        //initialize cost and services
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            //redirect
            navigate('/projects', {message: "Project created successfully"})
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={ styles.newProjectContainer }>
            <h1>Create project</h1>
            <p>Create your project and then add your services</p>
            <ProjectForm handleSubmit = {createPost} btnText = "Create project"/>
        </div>
    )
}

export default NewProject