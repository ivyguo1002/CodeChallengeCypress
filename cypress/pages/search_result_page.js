/// <reference types="cypress" />

export default class SearchResultPage {
    path = '/results?search_query=';
    constructor(keyword) {
        this.keyword = keyword;
        cy.url().should('include', this.path);
        cy.title().should('include', keyword);
    }

    getVideoTitle() {
        return cy.get('ytd-video-renderer #video-title yt-formatted-string').first()
        .invoke('text')
        .should('not.be.empty');
    }

    getFilter() {
        return cy.get('#filter-menu paper-button');
    }

    openFilter() {
        this.getFilter().click().should('have.class', 'style-default-active');
        return this;
    }

    filterByDuration(durationOption) {
        cy.contains('ytd-search-filter-group-renderer a', durationOption).click();
        this.getFilter().should('have.class', 'style-text');
        cy.reload();
        return this;
    }

    getFirstVideoDuration() {
        return cy.get('#contents.ytd-section-list-renderer span.ytd-thumbnail-overlay-time-status-renderer', { timeout: 20000 })
        .first()
        .invoke('text')
        .should('not.be.empty');
    }
}