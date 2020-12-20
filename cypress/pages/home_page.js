/// <reference types="cypress" />

import TrendingPage from './trending_page';
import SearchResultPage from './search_result_page';

export default class HomePage {
    constructor() {
        cy.title().should('include', 'YouTube');
    }

    goToTrendingPage() {
        cy.get('#endpoint[href="/feed/trending"]').click();
        return new TrendingPage();
    }
    searchByKeyword(keyword) {
        cy.get('input#search').type(keyword);
        cy.get('button#search-icon-legacy').click();
        return new SearchResultPage(keyword);
    }
}
