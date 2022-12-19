import { PersonApi } from "../api/personApi"

const Persons = () => {
  
  console.log("base url: " + process.env.REACT_APP_API_BASE_URL)
  PersonApi.getAll().then(res => {
    console.log(res);
  })

  return (
    <div>Persons</div>
  )
}

export default Persons