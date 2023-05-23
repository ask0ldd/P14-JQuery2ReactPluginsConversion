import './App.css'

function App() {

  return (
    <main>
      <form className='mainform'>
        <h2>Personnal</h2>
        <label>Firstname</label>
        <input type="text"></input>
        <label>Lastname</label>
        <input type="text"></input>
        <label>Birthdate</label>
        <input type="text"></input>
        <h2>Address</h2>
        <label>Street</label>
        <input id="street" type="text"></input>
        <label>City</label>
        <input id="city" type="text"></input>
        <label>State</label>
        <input id="state" type="text"></input>
        <label>ZIP Code</label>
        <input id="zip-code" type="text"></input>
        <h2>Professional</h2>
        <label>Integration Date</label>
        <input id="integration-date" type="text"></input>
        <label>Departement</label>
        <input type="text"></input>
        <input type="submit" value="Add this Employee"></input>
      </form>
    </main>
  )
}

export default App
