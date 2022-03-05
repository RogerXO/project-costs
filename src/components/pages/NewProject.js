import styles from './NewProject.module.css'

import ProjectForm from '../project/ProjectForm'

function NewProject() {
    return (
        <div className={ styles.newProjectContainer }>
            <h1>Create project</h1>
            <p>Create your project and then add your services</p>
            <ProjectForm/>
        </div>
    )
}

export default NewProject