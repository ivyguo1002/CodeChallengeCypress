/// <reference types="cypress" />
import VideoPage from '../pages/videoPage'

export default class TrendingPage {
    constructor() {
        cy.url().should('include', this.path);
        cy.title().should('include', 'Trending');
    }
    path = '/feed/trending';

    getViewCount(index) {
        return cy.get('ytd-video-renderer').eq(index)
        .find('#metadata-line.ytd-video-meta-block span:first-of-type');
    }

    getTitle(index) {
       return cy.get('ytd-video-renderer').eq(index)
       .find('#video-title yt-formatted-string');
    }

    openVideo(index) {
        cy.get('ytd-video-renderer').eq(index)
        .find('a#thumbnail.ytd-thumbnail').click();
        return new VideoPage();
    }
}