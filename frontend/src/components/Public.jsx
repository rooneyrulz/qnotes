const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">QNotes!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          QNotes: Collaborative note app. Create, assign, and track tasks with
          titles, descriptions, and completion status. Managers manage users,
          ensuring secure access. Streamline your team's productivity
          effortlessly
        </p>
        <address className="public__addr">
          QNotes HQ
          <br />
          123 Collaboration Lane
          <br />
          TeamCity, TX 54321
          <br />
          <a href="mailto:support@qnotes.com">support@qnotes.com</a>
          <br />
          <a href="tel:+18888888888">(888) 888-8888</a>
        </address>
        <br />
        <p>Owner: John Doe</p>
      </main>
    </section>
  );
  return content;
};
export default Public;
