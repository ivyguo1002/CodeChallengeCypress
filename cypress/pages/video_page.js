/// <reference types="cypress" />

export default class VideoPage {
    constructor() {
        cy.url().should('include', '/watch?v=');
    }

    getTitle() {
        return cy.get('h1.title.ytd-video-primary-info-renderer yt-formatted-string')
        .invoke('text')
        .should('not.be.empty');
    }

    getViewCount() {
        return cy.get('.view-count')
        .invoke('text')
        .should('not.be.empty');
    }
}