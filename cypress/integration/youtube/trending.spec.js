/// <reference types="cypress" />
import HomePage from '../../pages/homePage'
import TrendingPage from '../../pages/trendingPage'
import VideoPage from '../../pages/videoPage'


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
        trendingPage.getViewCount(0).then(($views) => {
            cy.wrap($views.text()).as('viewCountOfFirstTrendingVideo') ;
        });
        trendingPage.getTitle(0).then(($title) => {
            cy.wrap($title.text()).as('titleOfFirstTrendingVideo');
        });

        const videoPage = trendingPage.openVideo(0);
        videoPage.getViewCount().then(($views) => {
            cy.get('@viewCountOfFirstTrendingVideo').then((viewCountOfFirstTrendingVideo) => {
                const viewCount = $views.text();
                if(viewCount.includes(',')) {
                    expect(viewCount.split(',')[0]).to.eq(viewCountOfFirstTrendingVideo.split('K')[0]);
                } else {
                    expect(viewCount).to.eq(viewCountOfFirstTrendingVideo);
                }
            });
        });
        videoPage.getTitle().then(($title) => {
            cy.get('@titleOfFirstTrendingVideo').then((titleOfFirstTrendingVideo) => {
                expect($title.text()).to.eq(titleOfFirstTrendingVideo);
            });
        });
    })
})