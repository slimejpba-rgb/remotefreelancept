describe("simulator loads", () => {
  it("successfully loads the home page", () => {
    cy.visit("/#/"); // change URL to match your dev URL
    cy.contains("h4", " Remote freelancer from Portugal 🇵🇹");
  });
});

describe("pass income through url parameters", () => {
  it("successfully uses income from url", () => {
    cy.visit("/#/?income=50000"); 
    cy.get('[data-cy="income"]').should("have.value", "50 000");
  });

  it("doesn't update income if incorrect from url", () => {
    cy.visit("/#/?income=-50000"); 
    cy.get('[data-cy="income"]').should("have.value", "");
  });

  it("doesn't update income if 0 from url", () => {
    cy.visit("/#/?income=0"); 
    cy.get('[data-cy="income"]').should("have.value", "");
  });
});

describe("pass incomeFrequency through url parameters", () => {
  it("successfully uses incomeFrequency from url", () => {
    cy.visit("/#/?income=50000&incomeFrequency=day"); 
    cy.get('[data-cy="frequency-dropdown"]>input').should("have.value", "day");
  });
});

describe("pass displayFrequency through url parameters", () => {
  it("successfully uses displayFrequency from url", () => {
    cy.visit("/#/?income=50000&displayFrequency=day"); 
    cy.get('[data-cy="frequency-button"].bg-secondary').should(
      "have.text",
      "Day",
    );
  });
});

describe("pass nrMonthsDisplay through url parameters", () => {
  it("successfully uses nrMonthsDisplay from url", () => {
    cy.visit("/#/?income=50000&nrMonthsDisplay=13"); 
    cy.get('[data-cy="nr-months-display"] input:first-of-type').should(
      "have.value",
      "13",
    );
  });
});

describe("pass ssDiscount through url parameters", () => {
  it("successfully uses ssDiscount from url", () => {
    cy.visit("/#/?income=50000&ssDiscount=-0.15"); 
    cy.get('[data-cy="ss-discount"]').should("have.text", "-15%");
  });
});

describe("pass expenses through url parameters", () => {
  it("successfully uses positive expenses from url", () => {
    cy.visit("/#/?income=50000&expenses=1534"); 
    cy.get('[data-cy="expenses"] input:first-of-type').should(
      "have.value",
      "1 534",
    );
  });
});

describe("pass currentTaxRankYear through url parameters", () => {
  it("successfully uses currentTaxRankYear from url", () => {
    // ATUALIZADO: 2026 agora é um ano válido
    cy.visit("/#/?income=50000&currentTaxRankYear=2026"); 
    cy.get('[data-cy="tax-rank-years-dropdown"] input:first-of-type').should(
      "have.value",
      "2026",
    );
  });

  it("doesn't update currentTaxRankYear if invalid year from url", () => {
    // ATUALIZADO: Testamos 2030 como inválido, esperando que volte para 2026
    cy.visit("/#/?income=50000&currentTaxRankYear=2030"); 
    cy.get('[data-cy="tax-rank-years-dropdown"] input:first-of-type').should(
      "have.value",
      "2026",
    );
  });
});

describe("pass ssFirstYear through url parameters", () => {
  it("successfully uses true ssFirstYear from url", () => {
    cy.visit("/#/?income=50000&ssFirstYear=true"); 
    cy.get('[data-cy="ss-first-year"] input:first-of-type').should(
      "have.value",
      "true",
    );
  });
});

describe("pass firstYear through url parameters", () => {
  it("successfully uses true firstYear from url", () => {
    cy.visit("/#/?income=50000&firstYear=true"); 
    cy.get('[data-cy="first-year"] input:first-of-type').should(
      "have.value",
      "true",
    );
  });
});

describe("pass rnh through url parameters", () => {
  it("successfully uses true rnh from url", () => {
    cy.visit("/#/?income=50000&rnh=true"); 
    cy.get('[data-cy="rnh"] input:first-of-type').should("have.value", "true");
  });
});

describe("pass youth irs through url parameters", () => {
  it("successfully uses youth irs year from url 2026", () => {
    // ATUALIZADO: Agora suporta o ano 10 do IRS Jovem nas regras de 2026
    cy.visit("/#/?income=50000&benefitsOfYouthIrs=true&yearOfYouthIrs=10&currentTaxRankYear=2026"); 
    cy.get('[data-cy="youth-irs"] input[type="checkbox"]').should("have.value", "true");
    cy.get('[data-cy="youth-irs-years-dropdown"] input:first-of-type').should("have.value", "10");
  });

  it("doesn't update youth irs year if incorrect from url 2026", () => {
    // ATUALIZADO: Testamos o ano 15 (inválido), deve voltar para o ano 1
    cy.visit("/#/?income=50000&benefitsOfYouthIrs=true&yearOfYouthIrs=15&currentTaxRankYear=2026"); 
    cy.get('[data-cy="youth-irs"] input[type="checkbox"]').should("be.checked");
    cy.get('[data-cy="youth-irs-years-dropdown"] input:first-of-type').should("have.value", "1");
  });

  it("successfully uses youth irs year from url 2024", () => {
    cy.visit("/#/?income=50000&benefitsOfYouthIrs=true&yearOfYouthIrs=5&currentTaxRankYear=2024"); 
    cy.get('[data-cy="youth-irs"] input[type="checkbox"]').should("be.checked");
    cy.get('[data-cy="youth-irs-years-dropdown"] input:first-of-type').should("have.value", "5");
  });
});
