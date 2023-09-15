import './index.css'

const Filter = props => {
  const renderTheEmploymentList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(category => {
      const {salaryRangesList, setTheEmploymentTypesList} = props
      const addTheEmploymentType = () => {
        setTheEmploymentTypesList(category.employmentTypeId)
      }
      return (
        <li key={category.employmentTypeId}>
          <input
            type="checkbox"
            id={category.employmentTypeId}
            onClick={addTheEmploymentType}
          />
          <label htmlFor={category.employmentTypeId}>{category.label}</label>
        </li>
      )
    })
  }

  const renderTheSalaryList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(category => {
      const {setTheSalaryRange} = props
      const changeTheSalaryRange = () => {
        setTheSalaryRange(category.salaryRangeId)
      }
      return (
        <li key={category.salaryRangeId}>
          <input
            type="radio"
            id={category.salaryRangeId}
            name="salary"
            value={category.salaryRangeId}
            onClick={changeTheSalaryRange}
          />
          <label htmlFor={category.salaryRangeId}>{category.label}</label>
        </li>
      )
    })
  }

  const renderTheEmploymentCategory = () => (
    <>
      <h1 className="category-headings">Type of Employment</h1>
      <ul className="category-list">{renderTheEmploymentList()}</ul>
    </>
  )

  const renderTheSalaryRangeCategory = () => (
    <>
      <h1 className="category-headings">Salary Range</h1>
      <ul className="category-list">{renderTheSalaryList()}</ul>
    </>
  )

  return (
    <div className="category-container">
      {renderTheEmploymentCategory()}
      <hr className="hr-line" />
      {renderTheSalaryRangeCategory()}
    </div>
  )
}

export default Filter
