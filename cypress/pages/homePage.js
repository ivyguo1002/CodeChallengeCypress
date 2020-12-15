/// <reference types="cypress" />

import TrendingPage from "./trendingPage";

export default class HomePage {
    constructor() {
        cy.title().should('include', 'YouTube');
    }

    goToTrendingPage() {
        cy.get('#endpoint[href="/feed/trending"]').click();
        return new TrendingPage();
    }
}
