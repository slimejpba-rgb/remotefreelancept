import { beforeEach, describe, expect, it, test } from "vitest"; // ATUALIZADO: adicionado 'test'

import { createPinia } from "pinia";
import {
  SUPPORTED_TAX_RANK_YEARS,
  YEAR_BUSINESS_DAYS,
  useTaxesStore,
} from "@/store";
import { FrequencyChoices } from "@/typings";
import { asCurrency } from "@/utils";

const MONTHS_IN_YEAR = 12;

const taxesStore = useTaxesStore(createPinia());

describe("Taxes Store", () => {
  const DEFAULT_INCOME = 60_000;
  const DEFAULT_TAXABLE_INCOME = DEFAULT_INCOME * 0.75;

  beforeEach(() => {
    taxesStore.setIncome(DEFAULT_INCOME);
    taxesStore.setIncomeFrequency(FrequencyChoices.Year);
    taxesStore.setDisplayFrequency(FrequencyChoices.Month);
    // ATUALIZADO: O ano padrão de teste agora é 2026
    taxesStore.setCurrentTaxRankYear(2026);
    taxesStore.setSsDiscount(0);

    taxesStore.firstYear = false;
    taxesStore.secondYear = false;
    taxesStore.rnh = false;
  });

  it("should calculate the correct gross income by year", () => {
    expect(taxesStore.grossIncome.year).toBe(DEFAULT_INCOME);
    expect(taxesStore.grossIncome.month).toBe(DEFAULT_INCOME / MONTHS_IN_YEAR);
    expect(taxesStore.grossIncome.day).toBe(
      DEFAULT_INCOME / YEAR_BUSINESS_DAYS,
    );
  });

  it("should calculate the correct gross income by month", () => {
    const newGrossIncome = DEFAULT_INCOME / MONTHS_IN_YEAR;
    taxesStore.setIncome(newGrossIncome);
    taxesStore.setIncomeFrequency(FrequencyChoices.Month);

    expect(taxesStore.grossIncome.year).toBe(newGrossIncome * MONTHS_IN_YEAR);
    expect(taxesStore.grossIncome.month).toBe(newGrossIncome);
    expect(taxesStore.grossIncome.day).toBe(
      taxesStore.grossIncome.year / YEAR_BUSINESS_DAYS,
    );
  });

  it("should calculate the correct SS pay in the first year", () => {
    taxesStore.ssFirstYear = true;
    expect(taxesStore.ssPay.year).toBe(0);
  });

  describe("SS Calculations", () => {
    const SS_TAX = 0.214;

    it("when the income is below the SS max income", () => {
      const newGrossIncome = 24_000;
      taxesStore.setIncome(newGrossIncome);

      expect(taxesStore.ssPay.year).toBe(SS_TAX * (newGrossIncome * 0.7));
    });

    it("when the income is above the SS max income", () => {
      const newGrossIncome = 120_000;
      taxesStore.setIncome(newGrossIncome);

      // O teste agora valida contra o IAS de 2026 (537.13 * 12)
      expect(taxesStore.ssPay.year).toBe(
        SS_TAX * taxesStore.maxSsIncome * MONTHS_IN_YEAR,
      );
    });
  });

  it("should calculate correctly the taxable income", () => {
    expect(taxesStore.taxableIncome).toBe(DEFAULT_INCOME * 0.75);
  });

  it("should get the correct taxRank value", () => {
    expect(taxesStore.taxRank.max).greaterThanOrEqual(DEFAULT_TAXABLE_INCOME);
    expect(taxesStore.taxRank.min).lessThanOrEqual(DEFAULT_TAXABLE_INCOME);
  });

  // ATUALIZADO: Validação dinâmica para todos os anos suportados
  SUPPORTED_TAX_RANK_YEARS.forEach((year) => {
    it(`should get the correct taxRanks for ${year}`, () => {
      taxesStore.setCurrentTaxRankYear(year);
      expect(taxesStore.currentTaxRankYear).toEqual(year);
      expect(taxesStore.taxRanks[year]).toEqual(taxesStore.getTaxRanks);
    });
  });

  it("should get the correctly values when tax year changes to 2026", () => {
    // ATUALIZADO: Limites específicos de 2026
    taxesStore.setCurrentTaxRankYear(2026);
    expect(taxesStore.getTaxRanks[0].max).toEqual(8342);
    expect(taxesStore.getTaxRanks[1].max).toEqual(12587);
    expect(taxesStore.getTaxRanks[7].max).toEqual(86634);
  });

  it
