/// <reference types="cypress" />

export default class VideoPage {
    constructor() {
        cy.url().should('include', '/watch?v=');
    }

    getTitle() {
        return cy.get('h1.title.ytd-video-primary-info-renderer');
    }

    getViewCount() {
        return cy.get('.view-count');
    }

}