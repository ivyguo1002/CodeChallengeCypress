/// <reference types="cypress" />
import HomePage from '../../pages/home_page';
import { getAbbreciatedViews } from '../../utils/common-utils';

// Title: Trending videos list item matches details displayed on the video player page
// Steps:
//   1. Open the YouTube home page
//   2. Navigate to the trending videos list
//   3. Find the #1 trending video
//   4. Open the #1 trending video
// Expected behaviour: The view count and title match what was displayed on the video list.

describe('', () => {
    beforeEach('Go to home page', () => {
        cy.visit('/');
    })
    it('Trending videos list item matches details displayed on the video player page', () => {
        const homePage = new HomePage();
        const trendingPage = homePage.goToTrendingPage();
        trendingPage.getViewCount(0).then((views) => {
            cy.wrap(views).as('viewCountOfFirstTrendingVideo') ;
        });
        trendingPage.getTitle(0).then((title) => {
            cy.wrap(title).as('titleOfFirstTrendingVideo');
        });

        const videoPage = trendingPage.openVideo(0);
        cy.get('@titleOfFirstTrendingVideo').then((titleOfFirstTrendingVideo) => {
            videoPage.getTitle().should('eq', titleOfFirstTrendingVideo);
        });
        cy.get('@viewCountOfFirstTrendingVideo').then((viewCountOfFirstTrendingVideo) => {
            videoPage.getViewCount().should((viewCount) => {
                expect(getAbbreciatedViews(viewCount)).to.eq(viewCountOfFirstTrendingVideo);
            });
        });
    })
})