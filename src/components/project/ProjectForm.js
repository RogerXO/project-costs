function ProjectForm () {
    return (
        <form>
            <div><input type="text" placeholder="Project name"/></div>
            <div><input type="number" placeholder="Project total budget"/></div>
            <div>
                <select name="categoryId">
                    <option disabled selected> Select the category </option>
                </select>
            </div>
            <div>
                <input type="submit" value="Create project"/>
            </div>
        </form>
    )
}

export default ProjectForm