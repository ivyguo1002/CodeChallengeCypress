/// <reference types="cypress" />
import VideoPage from './video_page'

export default class TrendingPage {
    path = '/feed/trending';
    constructor() {
        cy.url().should('include', this.path);
        cy.title().should('include', 'Trending');
    }

    getViewCount(index) {
        return cy.get('ytd-video-renderer').eq(index)
        .find('#metadata-line.ytd-video-meta-block span:first-of-type')
        .invoke('text')
        .should('not.be.empty');
    }

    getTitle(index) {
       return cy.get('ytd-video-renderer').eq(index)
       .find('#video-title yt-formatted-string')
       .invoke('text')
       .should('not.be.empty');
    }

    openVideo(index) {
        cy.get('ytd-video-renderer').eq(index)
        .find('a#thumbnail.ytd-thumbnail').click();
        return new VideoPage();
    }
}