import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Projects.module.css";

import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState('')

  useEffect(() => {
    setTimeout(() => {
      fetch("https://project-costs-server.herokuapp.com/projects", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setProjects(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 250);
  }, []);

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  function removeProject(id) {
    fetch(`https://project-costs-server.herokuapp.com/projects/${id}`, {
      method: "DELETE",
      headers: {
        'Content-type': "application.json"
      }
    }).then(resp => resp.json())
    .then(() => {
      setProjects(projects.filter((project) => project.id !== id))
      setProjectMessage('Project removed successfully!')
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className={styles.projectContainer}>
      <div className={styles.titleContainer}>
        <h1>My projects</h1>
        <LinkButton to="/newProject" text="Create project" />
      </div>
      {message && <Message msg={message} type="success" />}
      {projectMessage && <Message msg={projectMessage} type="removed" />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              name={project.name}
              id={project.id}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && <p>There is no project</p>}
      </Container>
    </div>
  );
}

export default Projects;
