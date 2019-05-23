context("Movie search", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad: win => {
        win.fetch = null;
      }
    });
  });

  it("Search movie form", () => {
    cy.server()
      .route(
        "GET",
        "https://www.omdbapi.com/?apikey=4d7c0bd5&s=the shining",
        "fixture:omdbapi-response.json"
      )
      .as("fetch-movie");

    // Fill and submit
    cy.getByTestId("input-search")
      .get("input")
      .type("the shining")
      .getByTestId("button-search")
      .click()
      .wait("@fetch-movie");

    // Check value
    cy.getByTestId("movie-title").contains("The Shining");
    cy.getByTestId("movie-year").contains("1980");
  });
});
