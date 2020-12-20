/// <reference types="cypress" />
import HomePage from "../../pages/home_page";
import SearchResultPage from "../../pages/search_result_page";
import { getTime } from "../../utils/common-utils";

describe("Searching feature", () => {
  beforeEach("", () => {
    cy.fixture("test-data").as("data");
  });
  // Title: Searching result should match the keyword
  // Steps:
  //   1. Open the YouTube home page
  //   2. Search by keyword "cypress"
  //   3. Find the first video in the searching result page
  // Expected behaviour: The title of video should contain the keyword.
  it("Searching result should match the keyword", () => {
    cy.visit("/");
    const homePage = new HomePage();
    cy.get("@data").then((data) => {
      const searchResultPage = homePage.searchByKeyword(data.keyword);
      searchResultPage.getVideoTitle().should((title) => {
        expect(title.match(new RegExp(data.keyword, "i")).length).to.be.at.least(1);
      });
    });
  });

  // Title: Searching result should be filtered by Duration
  // Steps:
  //   1. Open the Youtube Search Page by keyword "cypress"
  //   2. Open filter
  //   3. Click Duration -> Short
  //   4. Find the first video in the filtered list
  // Expected behaviour: The filtered video should have short duration (<4 minutes)
  it("Searching result should be filtered by Duration", () => {
    cy.get("@data").then((data) => {
      cy.visit("/results?search_query=" + data.keyword);
      const searchResultPage = new SearchResultPage(data.keyword);

      searchResultPage
        .openFilter()
        .filterByDuration("Short")
        .getFirstVideoDuration()
        .should((duration) => {
          let videoDuration = getTime(duration);
          let maximumDuration = getTime("4:00");
          expect(videoDuration < maximumDuration).to.be.true;
        });
    });
  });
});
