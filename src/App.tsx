import './App.css'

function App() {

  return (
    <main>
      <form className='mainform'>
        <h2>1. Personnal</h2>
        <label>Firstname</label>
        <input type="text"></input>
        <label className='defaultSpacing'>Lastname</label>
        <input type="text"></input>
        <label className='defaultSpacing'>Birthdate</label>
        <input type="text"></input>
        <h2>2. Address</h2>
        <label>Street</label>
        <input id="street" type="text"></input>
        <label className='defaultSpacing'>City</label>
        <input id="city" type="text"></input>
        <label className='defaultSpacing'>State</label>
        <input id="state" type="text"></input>
        <label className='defaultSpacing'>ZIP Code</label>
        <input id="zip-code" type="text"></input>
        <h2>3. Professional</h2>
        <label>Integration Date</label>
        <input id="integration-date" type="text"></input>
        <label className='defaultSpacing'>Departement</label>
        <input type="text"></input>
        <input type="submit" value="Add this Employee"></input>
      </form>
    </main>
  )
}

export default App
