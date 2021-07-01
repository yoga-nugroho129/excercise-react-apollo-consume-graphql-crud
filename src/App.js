import { Nav, BookList, AddBookForm, Footer } from './components'

function App() {
  return (
    <div className="App">
      <Nav />
      <section className="container">
        <BookList />
        <AddBookForm />
      </section>
      <Footer />
    </div>
  );
}

export default App;
