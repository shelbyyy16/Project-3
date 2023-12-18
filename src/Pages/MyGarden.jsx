const { isLoading: loadingAuth, isAuthenticated } = useAuth0();

function MyGarden() {
  return (
    <section>
      {isAuthenticated && !loadingAuth ? (
        <>
          <h1>My Garden</h1>
        </>
      ) : null}
    </section>
  );
}

export default MyGarden;
