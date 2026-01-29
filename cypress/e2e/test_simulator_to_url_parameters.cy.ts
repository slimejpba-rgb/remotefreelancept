describe("simulator loads", () => {
  it("successfully loads the home page", () => {
    cy.visit("/#/");
    cy.contains("h4", " Remote freelancer from Portugal 🇵🇹");
  });
});

describe("pass income to url parameters", () => {
  it("successfully uses income from simulator", () => {
    cy.visit("/#/");
    cy.get('[data-cy="income"]').type("50000");
    cy.url().should("include", "?income=50000");
  });
  it("doesn't update the url if wrong format passed", () => {
    cy.visit("/#/");
    cy.get('[data-cy="income"]').type("dummyval");
    cy.url().should("not.include", "dummyval");
  });
  it("doesn't update the url if income is 0", () => {
    cy.visit("/#/");
    cy.get('[data-cy="income"]').type("0");
    cy.url().should("not.include", "0");
  });
});

describe("pass incomeFrequency to url parameters", () => {
  it("successfully uses incomeFrequency from simulator", () => {
    cy.visit("/#/?income=50000");
    cy.get('[data-cy="frequency-dropdown"]>input').click();
    cy.contains("Day").click();
    cy.url().should("include", "incomeFrequency=day");
  });
});

describe("pass displayFrequency to url parameters", () => {
  it("successfully uses displayFrequency from simulator", () => {
    cy.visit("/#/?income=50000");
    cy.get('[data-cy="frequency-button"]').contains("Day").click();
    cy.url().should("include", "displayFrequency=day");
  });
});

describe("pass nrMonthsDisplay to url parameters", () => {
  it("successfully uses nrMonthsDisplay from simulator", () => {
    cy.visit("/#/?income=50000");
    cy.get('[data-cy="nr-months-display"] input:first-of-type')
      .invoke("val", "")
      .type("13");
    cy.url().should("include", "nrMonthsDisplay=13");
  });
  it("successfully uses nrMonthsDisplay from simulator when using decrease button", () => {
    cy.visit("/#/?income=50000");
    cy.get(
      '[data-cy="nr-months-display"] [data-cy="counter-decrease"]',
    ).click();
    cy.url().should("include", "nrMonthsDisplay=11");
  });
  it("successfully uses nrMonthsDisplay from simulator when using increase button", () => {
    cy.visit("/#/?income=50000");
    cy.get(
      '[data-cy="nr-months-display"] [data-cy="counter-increase"]',
    ).click();
    cy.url().should("include", "nrMonthsDisplay=13");
  });
});

describe("pass ssDiscount to url parameters", () => {
  it("successfully uses ssDiscount from simulator when using decrease button", () => {
    cy.visit("/#/?income=50000");
    cy.get('[data-cy="ss-discount"] [data-cy="counter-decrease"]').click();
    cy.url().should("include", "ssDiscount=-0.05");
  });
  it("successfully uses ssDiscount from simulator when using increase button", () => {
    cy.visit("/#/?income=50000");
    cy.get('[data-cy="ss-discount"] [data-cy="counter-increase"]').click();
    cy.url().should("include", "ssDiscount=0.05");
  });
});

describe("pass expenses to url parameters", () => {
  it("successfully uses expenses from simulator", () => {
    cy.visit("/#/?income=50000");
    cy.get('[data-cy="expenses"] input:first-of-type')
      .invoke("val", "")
      .type("3500");
    cy.url().should("include", "expenses=3500");
  });
});

describe("unset expenses from url parameters on expensesAuto", () => {
    it("successfully reset expenses", () => {
    cy.visit("/#/?income=50000");
    cy.get('[data-cy="expenses"] input:first-of-type')
      .invoke("val", "")
      .type("3500");
    cy.url().should("include", "expenses=3500");
    cy.get('#setExpensesAutoButton').click();
    cy.url().should("not.include", "expenses=");
  });
});

describe("pass currentTaxRankYear to url parameters", () => {
  it("successfully uses currentTaxRankYear from simulator", () => {
    cy.visit("/#/?income=50000");
    cy.get('[data-cy="tax-rank-years-dropdown"]>input').click();
    // ATUALIZADO: Agora clicamos em 2026
    cy.contains("2026").click();
    cy.url().should("include", "currentTaxRankYear=2026");
  });
});

describe("pass ssFirstYear to url parameters", () => {
  it("successfully uses true ssFirstYear from simulator", () => {
    cy.visit("/#/?income=50000");
    cy.get('[data-cy="ss-first-year"] input:first-of-type').click();
    cy.url().should("include", "ssFirstYear=true");
  });
});

describe("pass firstYear to url parameters", () => {
  it("successfully uses true firstYear from simulator", () => {
    cy.visit("/#/?income=50000");
    cy.get('[data-cy="first-year"] input:first-of-type').click();
    cy.url().should("include", "firstYear=true");
  });
});

describe("pass youth irs to url parameters", () => {
  it("successfully uses true youth irs from simulator", () => {
    cy.visit("/#/?income=50000"); 
    cy.get('[data-cy="youth-irs"] input[type="checkbox"]').click();
    cy.get('[data-cy="youth-irs-years-dropdown"]>input').click();
    // ATUALIZADO: Testamos o ano 10, que é o novo limite em 2026
    cy.contains("10").click();
    cy.url().should("include", "benefitsOfYouthIrs=true");
    cy.url().should("include", "yearOfYouthIrs=10");
  });

  it("successfully uses false youth irs from simulator", () => {
    cy.visit("/#/?income=50000");
    cy.get('[data-cy="youth-irs"] input[type="checkbox"]').click().click();
    cy.url().should("include", "benefitsOfYouthIrs=false");
  });
});
