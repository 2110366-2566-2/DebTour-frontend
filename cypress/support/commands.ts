/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("login", () => {
    cy.intercept("/api/auth/session", { fixture: "session.json" }).as("session");

// Set the cookie for cypress.
// It has to be a valid cookie so next-auth can decrypt it and confirm its validity.
// This step can probably/hopefully be improved.
// We are currently unsure about this part.
// We need to refresh this cookie once in a while.
// We are unsure if this is true and if true, when it needs to be refreshed.
    cy.setCookie("next-auth.session-token", "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..ZoV9lD1Ucw4IKb0d.-ZY5ArDN7T6MtAF13q6b6JfCOADqFHGcYmHaeOw3X3lPr7TEh_Rs3rzPGrzdl3E20RE-wyCxsvo_lvKRaUrCpfzZQCIhMdkfz-fMo3XYoMp_aTMFYyQQnt0K9cbR3j50PwTeKGfO6X-TOBO8GNRkugUSrY6Sqn147ky89iCTYPp1o9qVOjVolbtpOh4dpThBYHupaNfMefKwNgB886zDWiRhJndkcRH0X5r9eyuQzwOJHAYnNprQ6ztR28FrHjBHjPfzzYSkzX1O5tjGCqvYkq1sYNIkp2xzB7Oj8luWKjRgM3pH7X-QgfKKTqaPQ-TKQHB9JvdWOE0Th5hFoD6SiZ2QmPVfDNxfLTKeYi6WopKKIXE5m-37d8RkOsrJuZ0SybXL9ODxbBTbh2zj-YpxIQt1U6L8a68Y5cVPw3DvgKAEixOWo_sZE7Wyua_ck8H4abuqRiGjatt8kKKbnIUo7ueLe9-BM3kDPC3d1KqI10FUyy9HaEJxT8__QrBve85sr788MIzGCstXF16V0D4CmRgSkE0_wLKWpQ_bK2TA4j90Mx8o8sd1kRel5boBZ17zoobtg1LAK2v7r6WAco73qO9s_CsvWG022nFD1Rtz-XEBLE9Cmt_0wHRSq9Bno4AXKZpOLBNLdP_d_nzTf08BgOMs1Akdys5ouNNc_HMTWGcTmrMv96yt9l7fIiREZkPpxORRjb8WO4Ensb0GzhANZWVTIJ22otlWCWmWOixtEDaGJy8lX0kgnGVEDSltWgbZcovmkmcSy1Sho6OA9D2wIiiR1a4rpyIeFfUc_KCfb69jLFGoPlWbJW4llCivKlOf5wg7GRg-3Gd_hzpAU_tB316pxIijuYrPYGoh.ZpLvpfA5ZWDsPIfhDU8bYg");
    cy.setCookie(
        "__Secure-next-auth.session-token",
        "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..ZoV9lD1Ucw4IKb0d.-ZY5ArDN7T6MtAF13q6b6JfCOADqFHGcYmHaeOw3X3lPr7TEh_Rs3rzPGrzdl3E20RE-wyCxsvo_lvKRaUrCpfzZQCIhMdkfz-fMo3XYoMp_aTMFYyQQnt0K9cbR3j50PwTeKGfO6X-TOBO8GNRkugUSrY6Sqn147ky89iCTYPp1o9qVOjVolbtpOh4dpThBYHupaNfMefKwNgB886zDWiRhJndkcRH0X5r9eyuQzwOJHAYnNprQ6ztR28FrHjBHjPfzzYSkzX1O5tjGCqvYkq1sYNIkp2xzB7Oj8luWKjRgM3pH7X-QgfKKTqaPQ-TKQHB9JvdWOE0Th5hFoD6SiZ2QmPVfDNxfLTKeYi6WopKKIXE5m-37d8RkOsrJuZ0SybXL9ODxbBTbh2zj-YpxIQt1U6L8a68Y5cVPw3DvgKAEixOWo_sZE7Wyua_ck8H4abuqRiGjatt8kKKbnIUo7ueLe9-BM3kDPC3d1KqI10FUyy9HaEJxT8__QrBve85sr788MIzGCstXF16V0D4CmRgSkE0_wLKWpQ_bK2TA4j90Mx8o8sd1kRel5boBZ17zoobtg1LAK2v7r6WAco73qO9s_CsvWG022nFD1Rtz-XEBLE9Cmt_0wHRSq9Bno4AXKZpOLBNLdP_d_nzTf08BgOMs1Akdys5ouNNc_HMTWGcTmrMv96yt9l7fIiREZkPpxORRjb8WO4Ensb0GzhANZWVTIJ22otlWCWmWOixtEDaGJy8lX0kgnGVEDSltWgbZcovmkmcSy1Sho6OA9D2wIiiR1a4rpyIeFfUc_KCfb69jLFGoPlWbJW4llCivKlOf5wg7GRg-3Gd_hzpAU_tB316pxIijuYrPYGoh.ZpLvpfA5ZWDsPIfhDU8bYg",
        { secure: true }
    );
// Cypress.Cookies.preserveOnce("next-auth.session-token");
// Cypress.Cookies.preserveOnce("__Secure-next-auth.session-token");
});

declare global {
    namespace Cypress {
        interface Chainable {
            login(): Chainable<void>
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
        }
    }
}